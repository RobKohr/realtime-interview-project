const basicTree = [
  { value: "root", left: 1, right: 2 },
  { value: "L1", right: 3 },
  { value: "R1" },
  { value: "R2" }
];
basicTreeFlattened = ["L1", "R2", "root", "R1"];
module.exports = {
  basicTree,
  basicTreeFlattened
};
