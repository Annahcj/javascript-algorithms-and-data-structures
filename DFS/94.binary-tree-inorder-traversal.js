// 94. Binary Tree Inorder Traversal
// Given the root of a binary tree, return the inorder traversal of its nodes' values.


// Solution: Recursive In-Order Traversal

// Go as left as possible, then take the value of the node, then go as right as possible.

// Time Complexity: O(n) 72ms
// Space Complexity: O(n) 39.1MB
var inorderTraversal = function(root) {
  let res = [];
  dfs(root);
  return res;

  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    res.push(node.val);
    dfs(node.right);
  }  
};