// 783. Minimum Distance Between BST Nodes
// Given the root of a Binary Search Tree (BST), return the minimum difference between the values of any two different nodes in the tree.


// Solution: Inorder Traversal

// Use inorder traversal to get a sorted array of node values.
// Compare each adjacent pair of node values and get the minimum difference.

// Time Complexity: O(n) 57ms
// Space Complexity: O(n) 43.2MB
var minDiffInBST = function(root) {
  let values = [];
  dfs(root);
  let minDiff = Infinity;
  for (let i = 1; i < values.length; i++) {
    minDiff = Math.min(minDiff, values[i] - values[i - 1]);
  }
  return minDiff;
  
  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    values.push(node.val);
    dfs(node.right);
  }
};


// Solution 2: Inorder Traversal - Keep Previous Node Val

// Since inorder traversal will process nodes in sorted order, we can keep track of the previous node of the sorted order and compare adjacent values.

// Time Complexity: O(n) 72ms
// Space Complexity: O(1) 41.8MB
var minDiffInBST = function(root) {
  let prevVal = -Infinity, minDiff = Infinity;
  dfs(root);
  return minDiff;
  
  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    minDiff = Math.min(minDiff, node.val - prevVal);
    prevVal = node.val;
    dfs(node.right);
  }
};