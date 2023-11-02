// 655. Print Binary Tree
// Given the root of a binary tree, construct a 0-indexed m x n string matrix res that represents a formatted layout of the tree. The formatted layout matrix should be constructed using the following rules:
  // The height of the tree is height and the number of rows m should be equal to height + 1.
  // The number of columns n should be equal to 2^height+1 - 1.
  // Place the root node in the middle of the top row (more formally, at location res[0][(n-1)/2]).
  // For each node that has been placed in the matrix at position res[r][c], place its left child at res[r+1][c-2^height-r-1] and its right child at res[r+1][c+2^height-r-1].
  // Continue this process until all the nodes in the tree have been placed.
  // Any empty cells should contain the empty string "".
// Return the constructed matrix res.


// Solution: Recursive DFS

// 1. Recursively DFS to find the maximum height of the tree.
// 2. Follow the instructions to generate the placeholder matrix.
// 3. Recursively DFS to populate the matrix.

// n = number of nodes, h = height of the tree
// Time Complexity: O(n) 137ms
// Space Complexity: O(h) 42.5MB
var printTree = function(root) {
  let height = getHeight(root) - 1;
  let columns = 2 ** (height + 1) - 1;
  let res = Array(height + 1).fill(0).map(() => Array(columns).fill(""));
  dfs(root, 0, Math.floor((columns - 1) / 2));
  return res;
  
  function dfs(node, row, col) {
    if (!node) return;
    res[row][col] = node.val.toString();
    let offset = 2 ** (height - row - 1);
    dfs(node.left, row + 1, col - offset);
    dfs(node.right, row + 1, col + offset);
  }
  
  function getHeight(node) {
    if (!node) return 0;
    return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  }
};