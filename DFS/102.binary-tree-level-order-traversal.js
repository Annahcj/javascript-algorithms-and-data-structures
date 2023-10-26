// 102. Binary Tree Level Order Traversal
// Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).


// Solution: Recursive DFS

// For every node, define its depth.
// Starting from the root, set its depth as 0.
// As children nodes are explored, increment depth by 1.
// The depth can be used as the index in the result array.

// Time Complexity: O(n) 68ms
// Space Complexity: O(n) (call stack) 40.6MB
var levelOrder = function(root) {
  let res = [];
  dfs(node, 0);
  return res;

  function dfs(node, depth) {
    if (!res[depth]) res[depth] = [];
    // push node value into res[depth]
    res[depth].push(node.val);
    if (node.left) dfs(node.left, depth + 1);
    if (node.right) dfs(node.left, depth + 1);
  }  
};