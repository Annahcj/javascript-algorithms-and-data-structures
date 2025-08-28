// 3446. Sort Matrix by Diagonals
// You are given an n x n square matrix of integers grid. Return the matrix such that:
  // The diagonals in the bottom-left triangle (including the middle diagonal) are sorted in non-increasing order.
  // The diagonals in the top-right triangle are sorted in non-decreasing order.


// Solution: Simulation

// Simulation - handle the top-right and bottom-left diagonals separately.
// For each diagonal, collect and sort the values, then replace them on the grid.

// Time Complexity: O(n^2 log(n)) 9ms
// Space Complexity: O(n) 64MB
function sortMatrix(grid) {
  const n = grid.length;
  for (let i = 1; i < n; i++) {
    // grid[0][i] = start for a top-right triangle
    const diagonalValues = [];
    for (let j = 0; j < n - i; j++) {
      diagonalValues.push(grid[j][i + j]);
    }
    diagonalValues.sort((a, b) => a - b);
    for (let j = 0; j < n - i; j++) {
      grid[j][i + j] = diagonalValues[j];
    }
  } 
  for (let i = 0; i < n; i++) {
    // grid[i][0] = start for a bottom-left triangle
    const diagonalValues = [];
    for (let j = 0; j < n - i; j++) {
      diagonalValues.push(grid[i + j][j]);
    }
    diagonalValues.sort((a, b) => b - a);
    for (let j = 0; j < n - i; j++) {
      grid[i + j][j] = diagonalValues[j];
    }
  }
  return grid;
};

// Two test cases
console.log(sortMatrix([[1,7,3],[9,8,2],[4,5,6]])) // [[8,2,3],[9,6,7],[4,5,1]]
console.log(sortMatrix([[0,1],[1,2]])) // [[2,1],[1,0]]