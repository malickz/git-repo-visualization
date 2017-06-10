/**
 * Created by SMalik on 2017-05-05.
 */

const express = require('express');
const router = express.Router();
const gitBlame = require('git-blame');
const path = require('path');
const GitHubApi = require("github");
const Promise = require("bluebird");
const Git = require("nodegit");
const pg = require('pg');
const sqlite3 = require('sqlite3').verbose();
const ctags = require("universal-ctags");

let accessToken = "49d709f411dac0a35f7609963b7b81fbb0cb0336";
const blameRequests = 500;
let db = new sqlite3.Database('./gitrepo.db');
let dbPersons = new sqlite3.Database('../persons.db');

const repo = "git";
const owner = "git";

let count = 0;

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/createGitTree', function(req, res) {
  return; // Remove this if you want to run the script for creating git tree
  createGitTree(res);
});

router.get('/gitTreeSize', function(req, res) {
  getGitTreeSize(res);
});

router.post('/blameData', function (req, res) {
  return; // Remove this if you want to run the script for getting blame data
  saveBlameData(req, res);
});

router.post('/saveFileLOC', function(req, res) {
  return; // Remove this
  saveFileLoc(req, res);
});

router.post('/getLineData', function(req, res) {
  fetchLineData(req, res, req.param("path"), (data) => {
    return res.status(200).json(data);
  });
});

router.post('/getFunctionData', function(req, res) {
  getFunctionData(req, res);
});
//
// router.post('/getDominantAuthor', function(req, res) {
//   db.all("select DISTINCT line_blame_info.finalline, line_blame_info.path, line_blame_info.contentlength, commits.authormail, commits.authorname from line_blame_info join commits on line_blame_info.sha = commits.sha where line_blame_info.path = '" + req.param("path") + "' and finalline between "+ req.param("start") + " and " + req.param("end"), (err, result) => {
//     if (err) {
//       console.log("select failed on line blame: " + "");
//       return res.status(500).json("failed");
//     }
//     let idx = result.length;
//     result.forEach((row, index) => {
//       let fullEmail = row.authorname + " <" + row.authormail + ">";
//       dbPersons.all("select * from emails Where fullemail like '%" + fullEmail +"%'", (err, rPersons) => {
//         if (err) {
//           console.log("select failed on line blame: " + "");
//         }
//         row["personid"] = rPersons[0].personid;
//
//         if (index+1 === idx) {
//
//           let authorLookup = new Map();
//           let authorCount = 0;
//           let authorLookupArray = [];
//           result.forEach(line => {
//             if (!authorLookup.get(line.personid)) {
//               result.forEach(line2 => {
//                 if(line.personid === line2.personid) {
//                   authorCount++;
//                 }
//               });
//               authorLookup.set(line.personid, authorCount);
//               authorLookupArray.push([line.personid, authorCount]);
//               authorCount = 0;
//             }
//           });
//
//           authorLookupArray.sort((a, b) => { // returns sorted list of authors according to their LOC in ascending order
//             return b[1] > a[1] ? 1 : -1;
//           });
//
//           return res.status(200).json(authorLookupArray[0]);
//         }
//       });
//     });
//   });
// });

router.post('/getFunctionMetric', function(req, res) {
  let path = req.param("path");
  getFunctionMetric(path, (funData) => {
    let cbCount = 0;
    let funDataLen = funData.length;
    funData.forEach((fData, fIndex) => {
      getDominantAuthor(fData, res, path, (authorData) => {
        cbCount++;
        fData.push(authorData);
        if (cbCount == funDataLen) {
          fetchLineData(req, res, path, (data) => {
            res.status(200).json([funData, data]);
          });
        }
      })
    });
  });
});


router.post('/singleFileHistory', function(req, res) {

  let file = process.env.FILE || req.param("path");
  let dataList = [];

  let repoPath = path.resolve(process.env.REPO || ('./tmp/linux' + '/.git'));
  let rev = process.env.REV || 'HEAD';

  let stream = gitBlame(repoPath, {
    file: file,
    rev: rev
  }).on('data', (type, data) => {
    // type can be 'line' or 'commit'

    data["type"] = type;
    dataList.push(data);

  }).on('error', function (err) {
    res.status(500).json(err);

  }).on('end', function () {
    res.status(200).json(dataList);

  }).on('close', function () {
    console.log("closed");
    if (stream && stream.destroy) stream.destroy()
  });
});

function getGitTreeSize(res) {

  db.all("SELECT count(*) from tree_structure", (err, rows) => {

    let blockSize = blameRequests;
    let gtLength = rows[0]["count(*)"];
    let gt500Blocks = gtLength/blockSize;

    let times = 0;

    if (gtLength > blockSize) {
      times = Math.ceil(gt500Blocks);
    } else {
      times = gt500Blocks;
    }

    let blocks = [];

    let tempSize = blockSize;

    for (let i =0; i < times; i++) {
      let blockItem = [];

      let newSize = 0;
      if(tempSize > gtLength) {
        newSize = +gtLength;
      } else {
        newSize = tempSize;
      }

      blockItem.push((tempSize - blockSize) + 1);
      blockItem.push(newSize);

      blocks.push(blockItem);
      tempSize = tempSize + blockSize;

    }

    res.status(200).json(blocks);
  });

}

function saveBlameData(req, res) {
  db.all('SELECT path from tree_structure WHERE fid BETWEEN ' + req.param("start") + ' AND ' + req.param("end"), (err, result) => {

    count = 0;
    Promise.each(result, (node, index) => {
      getBlameData(node, res).then((value) => {
        if(value[1] && value[1].destroy) {
          value[1].destroy();
          console.log("success: " + value[2].path);
        }
        count++;
        if(count === blameRequests)
        {
          res.status(200).json(count);

        }
      }).catch((value) => {
        console.log(value[0]);
        if(value[1] && value[1].destroy) {
          value[1].destroy();
          console.error("rejected: " + value[2].path);
        }
        count++;
        if(count === blameRequests)
        {
          res.status(200).json(count);

        }
      });
    }).catch((value) => {
      console.log(value[0]);
      if(value[1] && value[1].destroy) {
        value[1].destroy();
        console.error("failure: " + value[2].path);
      }
      count++;
      if(count === blameRequests)
      {
        res.status(200).json(count);

      }
    });
  });
}

function getBlameData(node, res) {
  return new Promise((resolve, reject) => {

    let file = process.env.FILE || node.path;
    let dataList = [];

    let repoPath = path.resolve(process.env.REPO || ('./tmp/git' + '/.git'));
    let rev = process.env.REV || 'HEAD';

    let stream = gitBlame(repoPath, {
      file: file,
      rev: rev
    }).on('data', (type, data) => {
      // type can be 'line' or 'commit'

      data["type"] = type;
      if (type === "line") {
        data["filename"] = node.path;
      }
      dataList.push(data);

    }).on('error', function (err) {

      reject([err.message, stream, node]);

    }).on('end', function () {

      let lineBlock = [];
      let commitBlock = [];

      dataList.forEach(data => {
        if (data["type"] == "line") {
          lineBlock.push(data);
        } else {
          commitBlock.push(data);
        }
      });

      dataList = [];

      lineBlock.forEach(row => {
        let st = "INSERT INTO line_blame_info(path, sha, originalline, finalline, fetchdate, contentlength) VALUES (" +
          "'" + row.filename + "', " +
          "'" + row.hash + "', " +
          "'" + row.originalLine + "', " +
          "'" + row.finalLine + "', " +
          "'" + new Date() + "', " +
          row.content.length +
          ")";
        db.run(st, (err) => {
          if (err) {
            reject([err, stream, node]);
          }
        });
      });

      commitBlock.forEach(row => {

        let st = "INSERT INTO commits(path, sha, authormail, authorname, authordate, committermail, committername, committerdate, summary) VALUES (" +
          "'" + row.filename + "', " +
          "'" + row.hash + "', " +
          "'" + row.author.mail + "', " +
          "'" + row.author.name + "', " +
          "'" + row.author.timestamp + "', " +
          "'" + row.committer.mail + "', " +
          "'" + row.committer.name + "', " +
          "'" + row.committer.timestamp + "', " +
          "'" + row.summary.replaceAll("'", "\"") + "'" +
          ")";
        db.run(st, (err) => {
          if (err) {
            reject([err, stream, node]);
          }
        });
      });

      resolve([node, stream, node]);

    }).on('close', function () {
      console.log("closed " + count + " " + node.path);
    });

  });
}

String.prototype.replaceAll = function(search, replacement) {
  let target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

function createGitTree(res) {
  let gitTree = [];

  let github = new GitHubApi({
    debug: true
  });
  github.authenticate({
    type: "oauth",
    token: accessToken
  });

  github.repos.getCommits({
    owner: owner,
    repo: repo,
    path: ""
  }).then((resp) => {
    return resp.data[0].sha;
  }).then((sha) => {
    github.gitdata.getTree({
      owner: owner,
      repo: repo,
      sha: sha,
      recursive: true
    }).then((json) => {
      gitTree = json.data.tree;
      json.data.tree = undefined;
      gitTree.forEach((o) => {
        let indexSlash = o.path.lastIndexOf('/');
        if (indexSlash < 0) {
          o.parent = 'root';
          o.filename = o.path;
          o.name = o.path;
          let e = o.filename.split(".");
          o.ext = e.length > 1 ? e[e.length-1] : ""; // setting folders and file with no ext to empty string
          o.fetchdate = new Date();
          o.loc = 0;
        } else {
          o.parent = o.path.substr(0, indexSlash);
          o.filename = o.path.substr(indexSlash + 1);
          o.name = o.path;
          let e = o.filename.split(".");
          o.ext = e.length > 1 ? e[e.length-1] : ""; // setting folders and file with no ext to empty string
          o.fetchdate = new Date();
          o.loc = 0;
        }
      });

      let count = 0;

      gitTree.forEach(row => {
        db.run("INSERT INTO tree_structure(path, sha, parent, filename, ext, loc, fetchdate) VALUES (" +
          "'" + row.path + "', " +
          "'" + row.sha + "', " +
          "'" + row.parent + "', " +
          "'" + row.filename + "', " +
          "'" + row.ext + "', " +
          row.loc + ", " +
          "'" + row.fetchdate + "'" +
          ")");
        count ++;
        if (count === gitTree.length) {
          res.status(200).json("hurrayyyyy");
        }
      });

    });
  });
}

function saveFileLoc(req, res) {
  count = 0;
  db.all('select COUNT(*) as loc, path from line_blame_info where path in (select path from tree_structure where fid between ' + req.param("start") +' AND '+ req.param("end") + ') group by path;', function(err, result) {

    if (err) {
      console.log("select failed on line blame: " + req.param("start") + "-" + req.param("end"));
      return res.status(500).json("failed");
    }

    let rows = result;
    rows.forEach(row => {
      db.run("update tree_structure set loc = " + row.loc + " where path = '" + row.path + "'", function(err, r) {
        if (err) {
          console.error('error running update query for' + row.path + " *** " + err);
          res.status(500).json(err);
          return;
        }
        count ++;
        if (count === result.length) {
          console.log("updated: " + req.param("start") + "-" + req.param("end"));
          res.status(200).json("hurrayyyyy");
        }
      });
    });

  });
}

function fetchLineData(req, res, path, cb) {
  db.all("select DISTINCT line_blame_info.finalline, line_blame_info.path, line_blame_info.contentlength, commits.authormail, commits.authorname from line_blame_info join commits on line_blame_info.sha = commits.sha where line_blame_info.path = '"+ path + "'", (err, result) => {
    if (err) {
      console.log("select failed on line blame: " + "");
      return res.status(500).json("failed");
    }
    let data = {};
    data["path"] = result[0].path;

    db.all("select loc from tree_structure where path='"+ path + "'", (err, r) => {
      if (err) {
        console.log("select failed on line blame: " + "");
      }
      data["lines-count"] = r[0].loc;

      data.lines = [];

      let idx = result.length;
      result.forEach((row, index) => {
        let fullEmail = row.authorname + " <" + row.authormail + ">";
        dbPersons.all("select * from emails Where fullemail like '%" + fullEmail +"%'", (err, rPersons) => {
          if (err) {
            console.log("select failed on line blame: " + "");
          }
          row["personid"] = rPersons[0].personid;
          data.lines.push(row);
          if (index+1 === idx) {
            cb(data);
          }
        });
      });
    });
  });
}

function getFunctionData(req, res) {
  // let data = ctags.ctagsCommand(["-x", "--c-types=f", "./tmp/git/" +req.param("path")]);
  let funData = callCTags(req.param("path"));

  if(req.param("lineData")) {
    fetchLineData(req, res, req.param("path"), (data) => {
      res.status(200).json([funData, data]);
    });
  } else {
    res.status(200).json(funData);
  }
}

function callCTags(path) {
  let tags = ctags.generateTags(["-x", "--c-types=f", "./tmp/git/" + path]);
  let re = /(\w+\s+)(function\s+)(\d+\s+)([.?\/?a-z]*\s+)(.*)/im;
  let funData = [];
  tags.forEach((tag) => {
    let parts = tag[0].match(re);
    let tempParts = [];
    if (parts) {
      for (let i = 1; i < parts.length; i++) {
        tempParts.push(parts[i].trim());
      }
      funData.push(tempParts);
    }
  });
  return funData;
}

function getFunctionMetric(path, cb) {
  let sortedFunData = callCTags(path).sort((a, b) => { // returns sorted list
    return Number(a[2]) > Number(b[2]) ? 1 : -1;
  });
  let len = sortedFunData.length;
  for (let i = 0; i < len; i++) {
    if (i+1 >= len) {
      db.all("select * from line_blame_info where path = '"+ path + "' ORDER BY lid DESC limit 1", (err, r) => {
        if (err) {
          console.log("select failed on line blame: " + "");
        }
        sortedFunData[i].push(r[0].finalline);
        cb(sortedFunData);
      });
    } else {
      sortedFunData[i].push((sortedFunData[i + 1][2])-1);
    }
  }
}

function getDominantAuthor(req, res, path, cb) {
  db.all("select DISTINCT line_blame_info.finalline, line_blame_info.path, line_blame_info.contentlength, commits.authormail, commits.authorname from line_blame_info join commits on line_blame_info.sha = commits.sha where line_blame_info.path = '" + path + "' and finalline between "+ req[2] + " and " + req[5], (err, result) => {
    if (err) {
      console.log("select failed on line blame: " + "");
      return res.status(500).json("failed");
    }
    let idx = result.length;
    result.forEach((row, index) => {
      let fullEmail = row.authorname + " <" + row.authormail + ">";
      dbPersons.all("select * from emails Where fullemail like '%" + fullEmail +"%'", (err, rPersons) => {
        if (err) {
          console.log("select failed on line blame: " + "");
        }
        row["personid"] = rPersons[0].personid;

        if (index+1 === idx) {

          let authorLookup = new Map();
          let authorCount = 0;
          let authorLookupArray = [];
          result.forEach(line => {
            if (!authorLookup.get(line.personid)) {
              result.forEach(line2 => {
                if(line.personid === line2.personid) {
                  authorCount++;
                }
              });
              authorLookup.set(line.personid, authorCount);
              authorLookupArray.push([line.personid, authorCount]);
              authorCount = 0;
            }
          });

          authorLookupArray.sort((a, b) => { // returns sorted list of authors according to their LOC in ascending order
            return b[1] > a[1] ? 1 : -1;
          });

          //return res.status(200).json(authorLookupArray[0]);
          cb(authorLookupArray[0]);
        }
      });
    });
  });
}

module.exports = router;
