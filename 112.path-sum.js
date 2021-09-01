// 112. Path Sum
// Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.
// A leaf is a node with no children.


// Solution: Recursion

// Note: The key is that the path must end at a leaf (a node with no children)
// Recursively dfs through the tree, subtracting node.val off target as we traverse.

// Algorithm:
// Return recurse(root, targetSum)
// recurse : node, target
  // base case: if node is invalid (null) return false
  // Subtract node.val off target
  // If target is equal to 0 and node has no children, return true.
  // return recurse(node.left, target) OR recurse(node.right, target) (if either of these return true, we will return true)

// Time Complexity: O(n) 116ms
// Space Complexity: O(n) 42.5MB
var hasPathSum = function(root, targetSum) {
  return recurse(root, targetSum);
  function recurse(node, target) {
    if (!node) return false;
    target -= node.val;
    if (target === 0 && !node.left && !node.right) return true;
    return recurse(node.left, target) || recurse(node.right, target);
  } 
};