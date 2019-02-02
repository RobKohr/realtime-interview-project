var SyncTree = require("../lib/SyncTree");
var expect = require("chai").expect;
var { basicTree, basicTreeFlattened } = require("../constants/exampleTrees");
describe("SyncTree", function() {
  describe("constructor", function() {
    it("throws an error when the data is not an array", function() {
      expect(function() {
        new SyncTree({});
      }).to.throw(Error);
    });

    it("accepts an array", function() {
      new SyncTree([]);
    });
  });

  describe("#flatten", function() {
    it("returns a flattened in order traversal", function() {
      var tree = new SyncTree(basicTree);
      expect(tree.flatten()).to.deep.equal(basicTreeFlattened);
    });
  });

  describe("#getRoot", function() {
    it("returns the root element", function() {
      var tree = new SyncTree([{ value: "root" }]);
      expect(tree.getRoot().value).to.equal("root");
    });
  });

  describe("#getNode", function() {
    it("returns the requested element", function() {
      var tree = new SyncTree([{ value: "root", left: 1 }, { value: "left" }]);
      expect(tree.getNode(1).value).to.equal("left");
    });
  });
});
