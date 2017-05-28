  /**
   * Created by SMalik on 2017-03-29.
   */

  const express = require('express');
  const router = express.Router();

  // declare axios for making http requests
  const axios = require('axios');
  const API = 'https://jsonplaceholder.typicode.com';
  const gitBlame = require('git-blame');
  const path = require('path');
  const GitHubApi = require("github");
  const Promise = require("bluebird");
  const Git = require("nodegit");
  const pg = require('pg');


  const pgConfig = {
    user: 'postgres', //env var: PGUSER
    database: 'SMalik', //env var: PGDATABASE
    password: 'postgres', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 300, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };

  const pool = new pg.Pool(pgConfig);


  let accessToken = "49d709f411dac0a35f7609963b7b81fbb0cb0336";
  const blameRequests = 200;


  /* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/createGitTree', function(req, res) {
  createGitTree(res);
});

router.get('/gitTreeSize', function(req, res) {
  getGitTreeSize(res);
});

router.post('/saveFileLOC', function(req, res) {
  saveFileLoc(req, res)
});

router.get('/getTreeJSON', function(req, res) {
  getTreeJson(res);
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

// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/posts`)
    .then(posts => {
      test();
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});


let count = 0;
router.post('/git', (req, res) => {
  // Git.Clone("https://github.com/nodegit/nodegit", "./tmp")
  //   .then(function(repository) {
  //   // Work with the repository object here.
  //     res.status(200).json(repository.data);
  // }).catch(error => {
  //   res.status(500).send(error)
  // });
  // parseGitLog("./tmp")
  //   .once('error', (err) => console.error('err:', err))
  //   .on('commit', (commit) => console.log('commit:', res.status(200).json(commit)))
  //   .once('finish', () => console.log('done'))
  // parseGitLog.promise('./tmp')
  //   .then((commits) => {
  //     console.log('list of commit objects:')
  //     commits.forEach((commit) => console.log('commit:', commit))
  //   })
  //   .catch(console.error)

  return; // REMOVE THIS IF WANT TO GET BLAME DATA, put this to not fetch blame accidentally and reply db
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }

    client.query('SELECT path from treeinfo WHERE fid BETWEEN $1 AND $2', [req.param("start"), req.param("end")], function(err, result) {
      done(err);

      if(err) {
        return console.error('error running query', err);
      }

      treeData=[];
      count = 0;
      Promise.each(result.rows, (node, index) => {
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
  });

});

function getGitTreeSize(res) {

  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }

    client.query('SELECT count(*) from treeinfo', function(err, result) {
      done(err);

      if(err) {
        return console.error('error running query', err);
      }

      let blockSize = blameRequests;
      let gtLength = result.rows[0].count;
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
  });


}

function getBlameData(node, res) {
  return new Promise((resolve, reject) => {

    let file = process.env.FILE || node.path;
    let dataList = [];

    let repoPath = path.resolve(process.env.REPO || ('./tmp/linux' + '/.git'));
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
      let statements = [];
      dataList.forEach(data => {
        if (data["type"] == "line") {
          lineBlock.push(data);
        } else {
          commitBlock.push(data);
        }
      });

      dataList = [];

      statements.push(buildLineStatement(lineBlock));
      statements.push(buildCommitStatement(commitBlock));

      pool.connect(function(err, client, done) {
        if(err) {
          return console.error('error fetching client from pool', err);
        }

        (function next() {
          let statement = statements.shift();
          if (statement) {
            client.query(statement, function(err, response) {
              if(err) {
                if(stream && stream.destroy) {
                  stream.destroy();
                }
                done();
                count++;
                if(count === blameRequests)
                {
                  res.status(200).json(count);

                }
                return console.error('error running query: in file: ' + node.path , err);
              }
              next();
            });
          }
          else {
            console.log("line and commit log pushed");
            done();
            resolve([node, stream, node]);
          }

        })();
      });
    }).on('close', function () {
      console.log("closed " + count + " " + node.path);
    });

  });
}

function createGitTree(res) {

  //////////////// don't wana ruin the data in PG, remove return if want to save data in DB
  return;
  //////////////


  let gitTree = [];

  let github = new GitHubApi({
    debug: true
  });
  github.authenticate({
    type: "oauth",
    token: accessToken
  });

  github.repos.getCommits({
    owner: "torvalds",
    repo: "linux",
    path: ""
  }).then((resp) => {
    return resp.data[0].sha;
  }).then((sha) => {
    github.gitdata.getTree({
      owner: "torvalds",
      repo: "linux",
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
        } else {
          o.parent = o.path.substr(0, indexSlash);
          o.filename = o.path.substr(indexSlash + 1);
          o.name = o.path;
        }
      });

      pool.connect(function(err, client, done) {
        if(err) {
          return console.error('error fetching client from pool', err);
        }


        let buildStatement = function(rows) {

          const params = [];
          const chunks = [];
          rows.forEach(row => {
            const valueClause = [];
            Object.keys(row).forEach(p => {
              if (p == "filename" || p == "path" || p == "parent" || p == "sha")
              {
                params.push(row[p]);
                valueClause.push('$' + params.length)
              }
            });
            chunks.push('(' + valueClause.join(', ') + ')')
          });
          return {
            text: "INSERT INTO treeinfo(path, sha, parent, filename) VALUES " + chunks.join(', '),
            values: params
          };
        };

        client.query(buildStatement(gitTree), (err, result) => {
          done(err);

          if(err) {
            return console.error('error running query', err);
          }
          console.log(result.rows);
        }).then((rest) => {
          gitTree = undefined;
          res.status(200).json(rest);
        });

      });


    });
  });
}

function buildLineStatement(rows) {

  const params = [];
  const chunks = [];
  for(let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let valueClause = [];
    params.push(row.filename);
    valueClause.push('$' + params.length);
    params.push(row.hash);
    valueClause.push('$' + params.length);
    params.push(row.originalLine);
    valueClause.push('$' + params.length);
    params.push(row.finalLine);
    valueClause.push('$' + params.length);

    chunks.push('(' + valueClause.join(', ') + ')');
  }
  return {
    text: "INSERT INTO lineblame(path, sha, originalline, finalline) VALUES " + chunks.join(', '),
    values: params
  };
}

function buildCommitStatement(rows) {
  const params = [];
  const chunks = [];
  for(let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let valueClause = [];
    params.push(row.filename);
    valueClause.push('$' + params.length);
    params.push(row.hash);
    valueClause.push('$' + params.length);

    params.push(row.author.mail);
    valueClause.push('$' + params.length);
    params.push(row.author.name);
    valueClause.push('$' + params.length);
    params.push(row.author.timestamp);
    valueClause.push('$' + params.length);

    params.push(row.committer.mail);
    valueClause.push('$' + params.length);
    params.push(row.committer.name);
    valueClause.push('$' + params.length);
    params.push(row.committer.timestamp);
    valueClause.push('$' + params.length);

    chunks.push('(' + valueClause.join(', ') + ')');
  }
  return {
    text: "INSERT INTO commitblame(path, sha, authormail, authorname, authortimestamp, committermail, committername, committertimestamp) VALUES " + chunks.join(', '),
    values: params
  };
}

function saveFileLoc(req, res) {
  return;
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }

    client.query('select COUNT(*), path from lineblame where path in (select path from treeinfo where fid between $1 and $2) group by path;', [req.param("start"), req.param("end")], function(err, result) {

      if(err) {
        console.error('error running query', err);
        res.status(500).json(err);
        return done(err);
      }
      done();

      let buildStatement = function(rows) {
        const params = [];
        const chunks = [];
        rows.forEach(row => {
          const valueClause = [];
          Object.keys(row).forEach(p => {

            params.push(row[p]);
            valueClause.push('$' + params.length)

          });
          chunks.push('(' + valueClause.join(', ') + ')')
        });
        return {
          text: "update treeinfo as t set loc = c.loc from (values" + chunks.join(", ") + ") as c(loc, path) where c.path = t.path",
          values: params
        };
      };

      client.query(buildStatement(result.rows), function(err, result) {
          if (err) {
            console.error('error running update query' + err);
            res.status(500).json(err);
            return done(err);
          }
          done();
          res.status(200).json(result);
          console.log(result);

        });
    });
  });
}

function getTreeJson(res) {
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    client.query("select * from treeinfo order by fid asc", function(err, result) {
      if (err) {
        console.error('error running update query' + err);
        res.status(500).json(err);
        return done(err);
      }
      done();
      let hierarchy = [];

      result.rows.unshift({
        "path": "root",
        "loc": 0,
        "parent": null,
        "filename": "root"
      });

      let dataMap = result.rows.reduce(function(map, node) {
        map[node.path] = node;
        return map;
      }, {});

      result.rows.forEach(function(node) {
        delete node.fid;
        let parent = dataMap[node.parent];
        if (parent) {
          (parent.children || (parent.children = [])).push(node);
        } else {
          hierarchy.push(node);
        }
      });
      dataMap = undefined;

      res.status(200).json(hierarchy);
    });
  });
}
module.exports = router;
