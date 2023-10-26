// 95. Unique Binary Search Trees II
// Given an integer n, return all the structurally unique BST's (binary search trees), which has exactly n nodes of unique values from 1 to n. Return the answer in any order.


// LeetCode provided TreeNode
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

// Solution: Recursion

// Commented
var generateTrees = function(n) {
  return generate(1, n);
  function generate(start, end) {
    let res = [];
    if (start > end) res.push(null);
    for (var i = start; i <= end; i++) {
      // left subtrees: anything to the left must be smaller than the parent, hence (start, i - 1)
      let left = generate(start, i - 1);

      // right subtrees: anything to the right must be bigger than the parent, hence (i + 1, end)
      let right = generate(i + 1, end);

      // next, loop through each combination of left and right subtrees.

      // loop through each left subtree
      for (var leftSubtree of left) {

        // loop through each right subtree
        for (var rightSubtree of right) {

          // make new root with value of i
          let root = new TreeNode(i);

          // set left child to left subtree
          root.left = leftSubtree;

          // set right child to right subtree
          root.right = rightSubtree;
          
          // push root into res
          res.push(root);
        }
      }
    }
    return res;
  }
};

// Without comments
var generateTrees = function(n) {
  return generate(1, n);
  function generate(start, end) {
    let res = [];
    if (start > end) res.push(null);
    for (var i = start; i <= end; i++) {
      let left = generate(start, i - 1);
      let right = generate(i + 1, end);
      for (var leftSubtree of left) {
        for (var rightSubtree of right) {
          let root = new TreeNode(i);
          root.left = leftSubtree;
          root.right = rightSubtree;
          res.push(root);
        }
      }
    }
    return res;
  }
};

// Two test cases to run function on
console.log(generateTrees(3)) // [[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
console.log(generateTrees(1)) // [[1]]