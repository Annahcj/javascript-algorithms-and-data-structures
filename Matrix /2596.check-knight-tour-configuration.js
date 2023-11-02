// 2596. Check Knight Tour Configuration
// There is a knight on an n x n chessboard. In a valid configuration, the knight starts at the top-left cell of the board and visits every cell on the board exactly once.
// You are given an n x n integer matrix grid consisting of distinct integers from the range [0, n * n - 1] where grid[row][col] indicates that the cell (row, col) is the grid[row][col]th cell that the knight visited. The moves are 0-indexed.
// Return true if grid represents a valid configuration of the knight's movements or false otherwise.
// Note that a valid knight move consists of moving two squares vertically and one square horizontally, or two squares horizontally and one square vertically. The figure below illustrates all the possible eight moves of a knight from some cell.


// Solution: Compare Adjacent Coordinates

// 1. Map each the coordinates to each value.
// 2. Compare the coordinates of every pair of adjacent values in the grid.
  // For the move to be valid, the absolute values of the differences of the row and column must be (1, 2) or (2, 1).

// n = length and width of grid
// Time Complexity: O(n^2) 63ms
// Space Complexity: O(n^2) 43.5MB
var checkValidGrid = function(grid) {
  if (grid[0][0] !== 0) return false;
  let n = grid.length, positions = Array(n * n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      positions[grid[i][j]] = [i, j];
    }
  }
  for (let i = 1; i < n * n; i++) {
    let diffRow = Math.abs(positions[i][0] - positions[i - 1][0]);
    let diffCol = Math.abs(positions[i][1] - positions[i - 1][1]);
    let isValidMove = (diffRow === 1 && diffCol === 2) || (diffRow === 2 && diffCol === 1);
    if (!isValidMove) return false;
  }
  return true;
};

// Two test cases
console.log(checkValidGrid([[0,11,16,5,20],[17,4,19,10,15],[12,1,8,21,6],[3,18,23,14,9],[24,13,2,7,22]])) // true
console.log(checkValidGrid([[0,3,6],[5,8,1],[2,7,4]])) // false