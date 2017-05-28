/**
 * Created by SMalik on 2017-03-29.
 */
//
//
// let Git = require("nodegit");
//
// let getMostRecentCommit = (repository) => {
//   return repository.getBranchCommit("master");
// };
//
// let getCommitMessage = (commit) => {
//   return commit.message();
// };
//
// Git.Repository.open("nodegit")
//   .then(getMostRecentCommit)
//   .then(getCommitMessage)
//   .then((message) => {
//     console.log(message);
//   });

const fs    = require('fs-extra');
const nodegit   = require("nodegit");
const path  = require("path");

class GitController {
  load() {
    return nodegit.Repository.open(this.localRepositoryPath)
      .then((repo) => {
        this._repository = repo;

        return this.resetHard();
      })
      .then(() => {
        return this.repository;
      })
      .catch((err) => {
        if (err.errno === -3) {
          return new Promise((resolve, reject) => {
            fs.emptyDir(this.localRepositoryPath, (err) => {
              if (err)
                reject(err);

              resolve();
            });
          })
            .then(() => {
              return nodegit.Clone.clone(this.repositoryUrl, this.localRepositoryPath, { checkoutBranch: this.checkedOutBranch, fetchOpts: { callbacks: getRemoteCallbacks() } });
            })
            .then((repo) => {
              if (repo)
                console.log("Repository " + this.checkedOutBranch + " is initialized");

              this._repository = repo;

              return this.repository;
            });
        }
        else {
          console.log("Error while repositories setup: " + err);
        }
      });
  }
}

function getRemoteCallbacks() {
  let callbacks = {
    credentials: function(url, userName) {
      // @TODO: Find a way to configure the ssh keys correctly (Maybe encrypt it)
      return nodegit.Cred.sshKeyNew(userName, path.join(__dirname, "..", "id_rsa.pub"), path.join(__dirname, "..", "id_rsa"), '');
    }
  };

  // Mac OSX glitch
  if (process.platform === "darwin") {
    callbacks.certificateCheck = function () { return 1; };
  }

  return callbacks;
}
