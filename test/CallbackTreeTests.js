var CallbackTree = require("../lib/CallbackTree");
var expect = require("chai").expect;
var { basicTree, basicTreeFlattened } = require("../constants/exampleTrees");

describe("CallbackTree", function() {
  describe("constructor", function() {
    it("throws an error when the data is not an array", function() {
      expect(function() {
        new CallbackTree({});
      }).to.throw(Error);
    });

    it("accepts an array", function() {
      new CallbackTree([]);
    });
  });

  describe("#flatten", function() {
    it("returns a flattened in order traversal", function() {
      var tree = new CallbackTree(basicTree);
      tree.flatten(out => {
        expect(out).to.deep.equal(basicTreeFlattened);
      });
    });
  });

  describe("#getRoot", function() {
    it("returns the root element", function(done) {
      var tree = new CallbackTree([{ value: "root" }]);
      tree.getRoot(function(error, root) {
        expect(error).to.not.exist;
        expect(root.value).to.equal("root");
        done();
      });
    });
  });

  describe("#getNode", function() {
    it("returns the requested element", function(done) {
      var tree = new CallbackTree([
        { value: "root", left: 1 },
        { value: "left" }
      ]);
      tree.getNode(1, function(error, node) {
        expect(error).to.not.exist;
        expect(node.value).to.equal("left");
        done();
      });
    });
  });
});
