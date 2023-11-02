// 404. Sum of Left Leaves
// Given the root of a binary tree, return the sum of all left leaves.


// Solution: Recursion

// Do a recursive pre-order dfs of the tree.
// Keep track whether node is a left child.
// For the root, it is not a left child, so we would call dfs(node, false).

// dfs: (node, is a left child)
  // if node is a leaf node and node is a left child,
    // add node.val to sum and return.
  // if node has a left child, call dfs(node.left, true (is a left child))
  // if node has a right child, call dfs(node.right, false (is not a left child))

// Time Complexity: O(n) 80ms
// Space Complexity: O(h) 40.6MB
var sumOfLeftLeaves = function(root) {
  let sum = 0;
  dfs(node, false);
  return sum;

  function dfs(node, left) {
    if (!node.left && !node.right && left) {
      sum += node.val;
      return;
    }
    if (node.left) dfs(node.left, true);
    if (node.right) dfs(node.right, false);
  }  
};