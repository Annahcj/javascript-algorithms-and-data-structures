// 1373. Maximum Sum BST in Binary Tree
// Given a binary tree root, return the maximum sum of all keys of any sub-tree which is also a Binary Search Tree (BST).
// Assume a BST is defined as follows:
  // The left subtree of a node contains only nodes with keys less than the node's key.
  // The right subtree of a node contains only nodes with keys greater than the node's key.
  // Both the left and right subtrees must also be binary search trees.


// Solution: Recursive DFS

// dfs(node) returns [sum of node values, minimum node value, maximum node value]
  // for the subtree with "node" as the root.

// If left subtree's max value > node.val, it is not a valid BST.
// If right subtree's min value < node.val, it is not a valid BST.
// If a tree is invalid, return [0, -Infinity, Infinity] so that it will always be an invalid BST based on the above checks.

// n = number of nodes, h = height of the tree
// Time Complexity: O(n) 311ms
// Space Complexity: O(h) 86.1MB
var maxSumBST = function(root) {
  let maxSum = 0;
  dfs(root);
  return maxSum;
  
  function dfs(node) { // returns [sum, min val, max val]
    if (!node) return [0, Infinity, -Infinity];
    
    let [leftSum, leftMin, leftMax] = dfs(node.left);
    let [rightSum, rightMin, rightMax] = dfs(node.right);
    if (leftMax >= node.val || rightMin <= node.val) return [0, -Infinity, Infinity];
    let totalSum = leftSum + rightSum + node.val;
    maxSum = Math.max(maxSum, totalSum);
    return [totalSum, Math.min(node.val, leftMin), Math.max(node.val, rightMax)];
  }
};