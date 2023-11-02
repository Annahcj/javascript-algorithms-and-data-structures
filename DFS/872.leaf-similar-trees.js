// 872. Leaf-Similar Trees
// Consider all the leaves of a binary tree, from left to right order, the values of those leaves form a leaf value sequence.
// For example, in the given tree above, the leaf value sequence is (6, 7, 4, 9, 8).
// Two binary trees are considered leaf-similar if their leaf value sequence is the same.
// Return true if and only if the two given trees with head nodes root1 and root2 are leaf-similar.


// Solution: Preorder Traversal

// Do a preorder traversal for root1 and root2 separately.
// Collect the leaf node values in an array.
// Compare the values from both trees and return true if they are equal.

// n = number of nodes in root1, m = number of nodes in root2
// Time Complexity: O(n + m) 119ms
// Space Complexity: O(n + m) 44.1MB
var leafSimilar = function(root1, root2) {
  let values1 = [], values2 = [];
  getLeafValues(root2, values2);
  getLeafValues(root1, values1);
  if (values1.length !== values2.length) return false;
  for (let i = 0; i < values1.length; i++) {
    if (values1[i] !== values2[i]) return false;
  }
  return true;
};

function getLeafValues(node, values) {
  if (!node) return;
  if (!node.left && !node.right) {
    values.push(node.val);
  }
  getLeafValues(node.left, values);
  getLeafValues(node.right, values);
}  