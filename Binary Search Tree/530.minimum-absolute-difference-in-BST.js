// 530. Minimum Absolute Difference in BST
// Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.


// Solution 1: Recursive Inorder Traversal

// Since it is a BST, an inorder traversal will get all the values in sorted order.
// Recursively perform an inorder traversal through the tree, while keeping track of the value of the previous node visited in the traversal.
// We only need to compare the difference witih the previous node value since adjacent values in a sorted list will always have the minimal difference.

// Time Complexity: O(n) 94ms
// Space Complexity: O(n) 47.9MB
var getMinimumDifference = function(root) {
  let prevVal = null, minDiff = Infinity;
  inorder(root);
  return minDiff;
  
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    if (prevVal !== null) minDiff = Math.min(minDiff, node.val - prevVal);
    prevVal = node.val;
    inorder(node.right);
  }
};


// Solution 2: Iterative Inorder Traversal

// Use a stack to iteratively traverse the tree using inorder traversal.
// Inorder traversal: Traverse as left as possible, then from the current left-most node traverse to the right child, then traverse as left as possible from there, and so on.

// Time Complexity: O(n) 90ms
// Space Complexity: O(n) 48.5MB
var getMinimumDifference = function(root) {
  let prevVal = null, minDiff = Infinity, stack = [];
  traverseLeft(root);
  while (stack.length) {
    let node = stack.pop();
    if (prevVal !== null) minDiff = Math.min(minDiff, node.val - prevVal);
    prevVal = node.val;
    if (node.right) traverseLeft(node.right);
  }
  return minDiff;
  
  function traverseLeft(node) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
  }
};