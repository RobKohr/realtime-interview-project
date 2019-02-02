var PromiseTree = require("../lib/PromiseTree");
var expect = require("chai").expect;
var { basicTree, basicTreeFlattened } = require("../constants/exampleTrees");

describe.only("PromiseTree", function() {
  describe("constructor", function() {
    it("throws an error when the data is not an array", function() {
      expect(function() {
        new PromiseTree({});
      }).to.throw(Error);
    });

    it("accepts an array", function() {
      new PromiseTree([]);
    });
  });

  describe("#flatten", function() {
    it("returns a flattened in order traversal", function() {
      var tree = new PromiseTree(basicTree);
      tree.flatten().then(out => {
        expect(out).to.deep.equal(basicTreeFlattened);
      });
    });
  });

  describe("#getRoot", function() {
    it("returns the root element", function() {
      var tree = new PromiseTree([{ value: "root" }]);
      return tree.getRoot().then(function(root) {
        expect(root.value).to.equal("root");
      });
    });
  });

  describe("#getNode", function() {
    it("returns the requested element", function() {
      var tree = new PromiseTree([
        { value: "root", left: 1 },
        { value: "left" }
      ]);
      return tree.getNode(1).then(function(node) {
        expect(node.value).to.equal("left");
      });
    });
  });
});
