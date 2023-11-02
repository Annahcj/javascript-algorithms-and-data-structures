// 700. Search in a Binary Search Tree
// You are given the root of a binary search tree (BST) and an integer val.
// Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.


// Solution: Iteration

// Make use of the special properties of a BST.
// If the node value is smaller than val, go to the right child.
// Otherwise, go to the left child.

// h = height of the tree
// Time Complexity: O(h) 85ms
// Space Complexity: O(1) 49.8MB
var searchBST = function(root, val) {
  let node = root;
  while (node) {
    if (node.val === val) return node;
    if (node.val < val) node = node.right;
    else node = node.left;
  }
  return null;
};