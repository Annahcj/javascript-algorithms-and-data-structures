// 1277.count-square-submatrices-with-all-ones.js
// 1277. Count Square Submatrices with All Ones
// Given a m * n matrix of ones and zeros, return how many square submatrices have all ones.


// Solution: 2D Prefix Sum

// Calculate the 2D prefix sum for the matrix.
// pSum[i + 1][j + 1] = the prefix sum of all cells from the top left corner (0,0) to bottom right corner (i, j).

// For every cell, go through every square size and use the precomputed prefix sum to get the count of ones in the square.
// To get the count of ones in the square with bottom right corner (i, j): prefix sum at (i, j) - left sum (i, j - size) - top sum (i - size, j) + top left (i - size, j - size).
// Note: Top left sum is added back as it was subtracted twice (left sum and top sum).

// m = number of rows, n = number of columns
// Time Complexity: O(mn * min(m, n)) 223ms
// Space Complexity: O(mn) 58.8MB
function countSquares(matrix) {
  let m = matrix.length, n = matrix[0].length;
  let pSum = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      pSum[i + 1][j + 1] = matrix[i][j] + pSum[i + 1][j] + pSum[i][j + 1] - pSum[i][j];
    }
  }
  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      for (let size = 1; size <= Math.min(i + 1, j + 1); size++) {
        let ones = pSum[i + 1][j + 1] - pSum[i + 1][j + 1 - size] - pSum[i + 1 - size][j + 1] + pSum[i + 1 - size][j + 1 - size];
        if (ones === size * size) count++;
      }
    }
  }
  return count;
};

// Two test cases
console.log(countSquares([[0,1,1,1],[1,1,1,1],[0,1,1,1]])) // 15
console.log(countSquares([[1,0,1],[1,1,0],[1,1,0]])) // 7