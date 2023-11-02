// 951. Flip Equivalent Binary Trees
// For a binary tree T, we can define a flip operation as follows: choose any node, and swap the left and right child subtrees.
// A binary tree X is flip equivalent to a binary tree Y if and only if we can make X equal to Y after some number of flip operations.
// Given the roots of two binary trees root1 and root2, return true if the two trees are flip equivalent or false otherwise.


// Solution: Recursion

// Use recursion to handle the case of every two nodes.
// If any of the two following cases are true, the trees are flip equivalent:
  // 1. Don't flip immediate left and right children (subtrees of the children may still be flipped)
  // 2. Flip the immediate left and right children

// The time complexity is linear because the node values are unique. 
// Even though we call flipEquiv four times for every pair of nodes, there can only be one correct way to flip.

// n = number of nodes in root1, m = number of nodes in root2, h = height of the trees
// Time Complexity: O(min(n, m)) 64ms
// Space Complexity: O(h) 43.1MB
var flipEquiv = function(root1, root2) {
  if (!root1 && !root2) return true;
  if (!root1 || !root2) return false;
  if (root1.val !== root2.val) return false;
  let flipLeftRight = flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left);
  let noFlip = flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right);
  return flipLeftRight || noFlip;
};