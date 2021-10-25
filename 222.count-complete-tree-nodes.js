// 222.count-complete-tree-nodes.js
// 222. Count Complete Tree Nodes
// Given the root of a complete binary tree, return the number of the nodes in the tree.


// Solution: Brute Force

// base case: if root is null, return 0 (not a node)
// return node count of left subtree + node count of right subtree + 1 (for current node)

// n = number of nodes in tree, d = depth of tree
// Time Complexity: O(n) 138ms
// Space Complexity: O(d) 66.1MB
var countNodes = function(root) {
  if (!root) return 0;
  return countNodes(root.left) + countNodes(root.right) + 1;  
};