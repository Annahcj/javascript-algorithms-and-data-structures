// 2319. Check if Matrix Is X-Matrix
// A square matrix is said to be an X-Matrix if both of the following conditions hold:
  // 1. All the elements in the diagonals of the matrix are non-zero.
  // 2. All other elements are 0.
// Given a 2D integer array grid of size n x n representing a square matrix, return true if grid is an X-Matrix. Otherwise, return false.


// Solution: Properties of Diagonals

// Diagonal and anti-diagonal elements have special properties:
  // diagonal (top left to bottom right): row - column === 0
  // anti-diagonal (top right to bottom left): row + column === n - 1
// Use these properties to check that all diagonals are non-zero and the rest are 0.

// Time Complexity: O(n^2) 86ms
// Space Complexity: O(1) 45MB
var checkXMatrix = function(grid) {
  let n = grid.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i - j === 0 || i + j === n - 1) {
        if (grid[i][j] === 0) return false;
      } else {
        if (grid[i][j] !== 0) return false;
      }
    }
  }
  return true;
};

// Three test cases to run function on
console.log(checkXMatrix([[2,0,0,1],[0,3,1,0],[0,5,2,0],[4,0,0,2]])) // true
console.log(checkXMatrix([[5,7,0],[0,3,1],[0,5,0]])) // false
console.log(checkXMatrix([[2,0,0,0,1],[0,4,0,1,5],[0,0,5,0,0],[0,5,0,2,0],[4,0,0,0,2]])) // false