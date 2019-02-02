function CallbackTree(data) {
  if (!Array.isArray(data)) {
    throw new Error("The data must be an Array");
  }
  this.build;
  this.data = data;
}

CallbackTree.prototype.flatten = function(callback) {
  this.output = [];
  this.getRoot((err, rootNode) => {
    if (!rootNode) {
      return callback([]);
    }
    this.build(rootNode, () => {
      callback(this.output);
    });
  });
};

CallbackTree.prototype.build = function(node, callback) {
  const handleRight = () => {
    if (node.right) {
      this.getNode(node.right, (err, rightNode) => {
        this.build(rightNode, () => {
          callback();
        });
      });
    } else {
      callback();
    }
  };
  if (node.left) {
    this.getNode(node.left, (err, leftNode) => {
      this.build(leftNode, () => {
        this.output.push(node.value);
        handleRight();
      });
    });
  } else {
    this.output.push(node.value);
    handleRight();
  }
};

function inconsistentCallback(value, callback) {
  if (Math.random() > 0.5) {
    setImmediate(function() {
      callback(null, value);
    });
  } else {
    callback(null, value);
  }
}

CallbackTree.prototype.getRoot = function(callback) {
  inconsistentCallback(this.data[0], callback);
};

CallbackTree.prototype.getNode = function(index, callback) {
  inconsistentCallback(this.data[index], callback);
};

module.exports = CallbackTree;
