// 1022. Sum of Root To Leaf Binary Numbers
// You are given the root of a binary tree where each node has a value 0 or 1. Each root-to-leaf path represents a binary number starting with the most significant bit.
// For example, if the path is 0 -> 1 -> 1 -> 0 -> 1, then this could represent 01101 in binary, which is 13.
// For all leaves in the tree, consider the numbers represented by the path from the root to that leaf. Return the sum of these numbers.
// The test cases are generated so that the answer fits in a 32-bits integer.


// Solution: Bit Manipulation w/ Recursive DFS

// Keep track of the nodes along the path in a number.
// Shift all the bits to the left by 1, 
// then use bitwise OR to change the first bit (from the right) to the value of the node.

// If we are at a leaf node, add the number to the total sum.

// n = number of nodes, h = height of tree
// Time Complexity: O(n) 140ms
// Space Complexity: O(h) 40.6MB
var sumRootToLeaf = function(root) {
  let sum = 0;
  dfs(root, 0);
  return sum;
  
  function dfs(node, num) {
    num <<= 1;
    num |= node.val;
    if (!node.left && !node.right) {
      sum += num;
      return;
    }
    if (node.left) dfs(node.left, num);
    if (node.right) dfs(node.right, num);
  }  
};