// 104. Maximum Depth of Binary Tree
// Given the root of a binary tree, return its maximum depth.
// A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.


// Solution 1: DFS recursive

// Use recursion to go as deep as possible while keeping track of the depth of the node.
// Maintain a max depth, which we will check against for each node
// As we search a node's children, increment depth by 1

// Time Complexity: O(n) 84ms
// Space Complexity: O(n) 41.5MB
var maxDepth = function(root) {
  if (!root) return 0;
  let max = 0;
  dfs(root, 1);
  return max;

  function dfs(node, depth) {
    max = Math.max(max, depth);
    if (node.left) dfs(node.left, depth + 1);
    if (node.right) dfs(node.right, depth + 1);
  }  
};

// Solution 2: Optimized

// Instead of maintaining a max variable, we can just return the max depth for each recursive call.
// If a node is undefined (not a node), return 0.

// Time Complexity: O(n) 80ms
// Space Complexity: O(n) 41.6MB
var maxDepth = function(root) {
  return dfs(root);

  function dfs(node) {
    if (!node) return 0;
    // return the depth of the deeper node + 1
    return Math.max(dfs(node.left), dfs(node.right)) + 1;
  }  
};