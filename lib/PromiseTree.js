var Promise = require("bluebird");

function PromiseTree(data) {
  if (!Array.isArray(data)) {
    reject(new Error("The data must be an Array"));
  }
  this.data = data;
}

PromiseTree.prototype.flatten = function() {
  return new Promise((resolve, reject) => {
    output = [];
    const buildPromise = nodeId => {
      return new Promise((resolve, reject) => {
        if (nodeId === undefined) {
          return resolve();
        }
        this.getNode(nodeId).then(node => {
          if (node.left) {
            buildPromise(node.left).then(() => {
              output.push(node.value);
              buildPromise(node.right).then(() => resolve());
            });
          } else {
            output.push(node.value);
            buildPromise(node.right).then(() => resolve());
          }
        });
      });
    };
    buildPromise(0).then(() => resolve(output));
  });
};

PromiseTree.prototype.getRoot = function(callback) {
  return Promise.resolve(this.data[0]);
};

PromiseTree.prototype.getNode = function(index, callback) {
  return Promise.resolve(this.data[index]);
};

module.exports = PromiseTree;
