// 1372. Longest ZigZag Path in a Binary Tree
// You are given the root of a binary tree.
// A ZigZag path for a binary tree is defined as follow:
  // Choose any node in the binary tree and a direction (right or left).
  // If the current direction is right, move to the right child of the current node; otherwise, move to the left child.
  // Change the direction from right to left or from left to right.
  // Repeat the second and third steps until you can't move in the tree.
// Zigzag length is defined as the number of nodes visited - 1. (A single node has a length of 0).
// Return the longest ZigZag path contained in that tree.


// Solution: DFS 

// Recursively DFS through the tree, keeping track of the current node and direction. 
// We only go through each node once, with two choices:
  // 1. We keep going with the current zigzag path.
  // 2. We go in the opposite direction and start a new zigzag path.
// Record the maximum path length out of all choices.

// Time Complexity: O(n) 322ms
// Space Complexity: O(n) 92.8MB
var longestZigZag = function(root) {
  let maxLength = 0;
  dfs(root, 'left');
  return maxLength - 1;
  
  function dfs(node, dir) {
    if (!node) return 0;
    if (dir === 'left') {
      let keepGoing = 1 + dfs(node.left, 'right');
      let rightLeft = 1 + dfs(node.right, 'left');
      maxLength = Math.max(maxLength, keepGoing, rightLeft);
      return keepGoing;
    } else { 
      let keepGoing = 1 + dfs(node.right, 'left');
      let leftRight = 1 + dfs(node.left, 'right');
      maxLength = Math.max(maxLength, keepGoing, leftRight);
      return keepGoing;
    }
  }
};