// 669. Trim a Binary Search Tree
// Given the root of a binary search tree and the lowest and highest boundaries as low and high, trim the tree so that all its elements lies in [low, high]. Trimming the tree should not change the relative structure of the elements that will remain in the tree (i.e., any node's descendant should remain a descendant). It can be proven that there is a unique answer.
// Return the root of the trimmed binary search tree. Note that the root may change depending on the given bounds.


// Solution: Recursion

// Two cases:
  // 1. Node value < low: node and left subtree values are all < low, go to right subtree.
  // 2. Node value > high: node and right subtree values are all > high, go to left subtree.

// Time Complexity: O(n) 72ms
// Space Complexity: O(n) 48MB
var trimBST = function(root, low, high) {
  if (!root) return null;
  if (root.val < low) return trimBST(root.right, low, high);
  if (root.val > high) return trimBST(root.left, low, high);
  
  root.right = trimBST(root.right, low, high);
  root.left = trimBST(root.left, low, high);
  return root;
};