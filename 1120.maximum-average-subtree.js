// 1120. Maximum Average Subtree
// Given the root of a binary tree, return the maximum average value of a subtree of that tree. Answers within 10-5 of the actual answer will be accepted.
// A subtree of a tree is any node of that tree plus all its descendants.
// The average value of a tree is the sum of its values, divided by the number of nodes.


// Solution: Recursion

// Recursively dfs through the tree, keeping track of the sum and number of nodes
// recurse: node
  // If node is invalid (null) return [0, 0] (sum, divisor (or number of nodes))
  // let leftSum be recurse(node.left)[0], leftDiv be recurse(node.left)[1]
  // let rightSum be recurse(node.right)[0], rightDiv be recurse(node.right)[1]
  // let div be 1 + leftDiv + rightDiv (itself + nodes in left subtree + nodes in right subtree)
  // let sum be leftSum + rightSum + node.val (sum of left subtree + sum of right subtree + value of itself)
  // update maxAvg if (sum / div) is bigger than maxAvg
  // return [sum, div]

// Time Complexity: O(n) 98ms
// Space Complexity: O(n) 45.3MB
var maximumAverageSubtree = function(root) {
  let maxAvg = -Infinity;
  recurse(root, 0);
  return maxAvg;
  function recurse(node) {
    if (!node) return [0, 0];
    let [leftSum, leftDiv] = recurse(node.left);
    let [rightSum, rightDiv] = recurse(node.right);
    let div = 1 + leftDiv + rightDiv;
    let sum = leftSum + rightSum + node.val;
    maxAvg = Math.max(maxAvg, sum / div);
    return [sum, div];
  } 
};