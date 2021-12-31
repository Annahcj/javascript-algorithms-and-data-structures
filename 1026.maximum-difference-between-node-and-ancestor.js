// 1026. Maximum Difference Between Node and Ancestor
// Given the root of a binary tree, find the maximum value v for which there exist different nodes a and b where v = |a.val - b.val| and a is an ancestor of b.


// Solution: Recursive DFS

// Recursively dfs through the tree.
// Keep track of the minimum value and maximum value of ancestor nodes.
// Get the maximum absolute difference between:
 // minimum ancestor value and current node's value
 // maximum ancestor value and current node's value

// Time Complexity: O(n) 84ms
// Space Complexity: O(n) 41.6MB
var maxAncestorDiff = function(root) {
  let maxDiff = 0;
  dfs(root, root.val, root.val);
  return maxDiff;
  
  function dfs(node, min, max) {
    if (!node) return;
    maxDiff = Math.max(maxDiff, Math.abs(node.val - min), Math.abs(node.val - max));
    min = Math.min(min, node.val), max = Math.max(max, node.val);
    dfs(node.left, min, max);
    dfs(node.right, min, max);
  }
};