// 2373. Largest Local Values in a Matrix
// You are given an n x n integer matrix grid.
// Generate an integer matrix maxLocal of size (n - 2) x (n - 2) such that:
  // maxLocal[i][j] is equal to the largest value of the 3 x 3 matrix in grid centered around row i + 1 and column j + 1.
// In other words, we want to find the largest value in every contiguous 3 x 3 matrix in grid.
// Return the generated matrix.


// Solution: Brute Force

// For each cell (i, j), get the largest value for cells from (i, j) to (i + 2, j + 2)

// Time Complexity: O(n^2 * 3^2) 112ms
// Space Complexity: O(n^2) 47MB
var largestLocal = function(grid) {
  let n = grid.length, maxLocal = Array(n - 2).fill(0).map(() => Array(n - 2));
  for (let i = 0; i < n - 2; i++) {
    for (let j = 0; j < n - 2; j++) {
      maxLocal[i][j] = getMaxLocal(i, j);
    }
  }
  return maxLocal;
  
  function getMaxLocal(row, col) {
    let max = -Infinity;
    for (let i = row; i <= row + 2; i++) {
      for (let j = col; j <= col + 2; j++) {
        max = Math.max(max, grid[i][j]);
      }
    }
    return max;
  }
};

// Two test cases
console.log(largestLocal([[9,9,8,1],[5,6,2,6],[8,2,6,4],[6,2,2,2]])) // [[9,9],[8,6]]
console.log(largestLocal([[1,1,1,1,1],[1,1,1,1,1],[1,1,2,1,1],[1,1,1,1,1],[1,1,1,1,1]])) // [[2,2,2],[2,2,2],[2,2,2]]