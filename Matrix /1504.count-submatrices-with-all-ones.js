// 1504. Count Submatrices With All Ones
// Given an m x n binary matrix mat, return the number of submatrices that have all ones.


// Solution: Flatten Columns

// Populate height, where height[i][j] = number of continuous 1's in the column starting from mat[i][j].
// We are basically flattening the matrix into an array, where each cell represents a column in the matrix starting from row i.
// For every row, loop through all possibilities of left and right columns (i, j).
  // Get the minimum height for columns (i, j).
  // Count the number of submatrices with top left corner = mat[row][i] and top right corner = mat[row][j]

// Time Complexity: O(m^2 * n) 124ms
// Space Complexity: O(mn) 44.6MB
var numSubmat = function(mat) {
  let m = mat.length, n = mat[0].length;
  let height = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  for (let j = 0; j < n; j++) {
    for (let i = m - 1; i >= 0; i--) {
      height[i][j] = mat[i][j] === 1 ? height[i + 1][j] + 1 : 0;
    }
  }
  
  let count = 0;
  for (let row = 0; row < m; row++) {
    for (let i = 0; i < n; i++) {
      let minHeight = Infinity;
      for (let j = i; j < n; j++) {
        minHeight = Math.min(minHeight, height[row][j]);
        count += minHeight; // count all submatrices with top left = mat[row][i] and top right = mat[row][j]
      }
    }
  }
  return count;
};

// Two test cases
console.log(numSubmat([[1,0,1],[1,1,0],[1,1,0]])) // 13
console.log(numSubmat([[0,1,1,0],[0,1,1,1],[1,1,1,0]])) // 24