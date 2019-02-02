function SyncTree(data) {
  if (!Array.isArray(data)) {
    throw new Error("The data must be an Array");
  }
  this.data = data;
}

SyncTree.prototype.flatten = function() {
  this.output = [];
  this.flattenNode(this.getRoot());
  return this.output;
};

SyncTree.prototype.flattenNode = function(node) {
  if (node.left) {
    this.flattenNode(this.getNode(node.left));
  }
  this.output.push(node.value);
  if (node.right) {
    this.flattenNode(this.getNode(node.right));
  }
};

SyncTree.prototype.getRoot = function() {
  return this.data[0];
};

SyncTree.prototype.getNode = function(index) {
  return this.data[index];
};

module.exports = SyncTree;
