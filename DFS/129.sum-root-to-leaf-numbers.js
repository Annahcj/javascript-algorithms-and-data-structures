// 129. Sum Root to Leaf Numbers
// You are given the root of a binary tree containing digits from 0 to 9 only.
// Each root-to-leaf path in the tree represents a number.
// For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.
// Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a 32-bit integer.
// A leaf node is a node with no children.


// Solution: DFS

// Dfs to all leaf nodes in root.
// Calculate the number of the path as we are going to the leaf nodes.
// When a leaf node is reached, add the number to the total sum and return.

// n = number of nodes in the tree, h = height of tree
// Time Complexity: O(n) 72ms
// Space Complexity: O(h) 40MB
var sumNumbers = function(root) {
  let sum = 0;
  dfs(root);
  return sum;

  function dfs(node, num) {
    num = num * 10 + node.val;
    if (!node.left && !node.right) {
      sum += num;
      return;
    }
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);
  } 
};