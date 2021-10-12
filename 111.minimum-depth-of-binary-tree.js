// 111. Minimum Depth of Binary Tree
// Given a binary tree, find its minimum depth.
// The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.
// Note: A leaf is a node with no children.


// Solution 1: Recursive DFS

// Recursively visit each node
// Keep track of each node's depth
// If node is a leaf node (no children), check its depth with the global min depth.

// Time Complexity: O(n) 294ms
// Space Complexity: O(n) 103.5MB
var minDepth = function(root) {
  if (!root) return 0;
  let min = Infinity;
  dfs(root, 1);
  return min;

  function dfs(node, depth) {
    if (!node.left && !node.right) min = Math.min(min, depth);
    if (node.left) dfs(node.left, depth + 1);
    if (node.right) dfs(node.right, depth + 1);
  }
};

// Solution 2: Optimized Recursive DFS

// Recursively visit each node
// If node is a leaf node, return 1
// Return the smaller depth out of dfs(node.left) and dfs(node.right)  + 1

// Time Complexity: O(n) 333ms
// Space Complexity: O(n) 103MB
var minDepth = function(root) {
  if (!root) return 0;
  return dfs(root);

  function dfs(node) {
    if (!node.left && !node.right) return 1;
    let min = Infinity;
    if (node.left) min = Math.min(min, dfs(node.left));
    if (node.right) min = Math.min(min, dfs(node.right));
    return min + 1;
  }
};