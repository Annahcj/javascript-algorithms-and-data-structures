// 1469. Find All The Lonely Nodes
// In a binary tree, a lonely node is a node that is the only child of its parent node. The root of the tree is not lonely because it does not have a parent node.
// Given the root of a binary tree, return an array containing the values of all lonely nodes in the tree. Return the list in any order.


// Solution: Recursive DFS

// Recursively dfs through the tree.
// If a node has a left child but not a right child, push the left child's value to the result.
// If a node has a right child but not a left child, push the right child's value to the result.
// If node has a left child, dfs the left child.
// If node has a right child, dfs the right child.

// n = nodes in root, h = height of tree
// Time Complexity: O(n) 95ms
// Space Complexity: O(h) 43.2MB
var getLonelyNodes = function(root) {
  let res = [];
  dfs(root);
  return res;

  function dfs(node) {
    if (node.left && !node.right) res.push(node.left.val);
    if (node.right && !node.left) res.push(node.right.val);
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);
  }  
};