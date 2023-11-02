// 363. Max Sum of Rectangle No Larger Than K
// Given an m x n matrix matrix and an integer k, return the max sum of a rectangle in the matrix such that its sum is no larger than k.
// It is guaranteed that there will be a rectangle with a sum no larger than k.


// Solution: Prefix Sum

// Prefix sum for each rectangle with top left corner (0, 0) and bottom right corner (i, j). Offset by +1 to deal with the edge cases.

// For every cell (r1, c1) as the bottom right corner of the rectangle,
  // Go through every cell (r2, c2) as the top left corner
    // Calculate the sum by the formula: sum[row2][col2] - sum[row2][col1 - 1] - sum[row1 - 1][col2] + sum[row1 - 1][col1 - 1]
    // This is the bottom right cell - bottom left cell - top right cell + top left cell (we add the top left cell because it was removed twice in the bottom left cell and top right cell)

// Time Complexity: O((mn)^2) 1740ms
// Space Complexity: O(mn) 45.1MB
var maxSumSubmatrix = function(matrix, k) {
  let m = matrix.length, n = matrix[0].length;
  let sum = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      sum[i + 1][j + 1] = sum[i][j + 1] + sum[i + 1][j] - sum[i][j] + matrix[i][j];
    }
  }
  
  let maxSum = -Infinity;
  for (let r1 = 0; r1 < m; r1++) {
    for (let c1 = 0; c1 < n; c1++) { // (r1, c1) = bottom right corner
      sum[r1 + 1][c1 + 1] = sum[r1][c1 + 1] + sum[r1 + 1][c1] - sum[r1][c1] + matrix[r1][c1];
      
      for (let r2 = 0; r2 <= r1; r2++) {
        for (let c2 = 0; c2 <= c1; c2++) { // (r2, c2) = top left corner
          let subSum = getSubSum(r2 + 1, c2 + 1, r1 + 1, c1 + 1);
          if (subSum <= k) maxSum = Math.max(maxSum, subSum);
        }
      }
    }
  }
  return maxSum;
  
  function getSubSum(row1, col1, row2, col2) {
    return sum[row2][col2] - sum[row2][col1 - 1] - sum[row1 - 1][col2] + sum[row1 - 1][col1 - 1];
  }
};

// Two test cases to run function on
console.log(maxSumSubmatrix([[1,0,1],[0,-2,3]], 2)) // 2
console.log(maxSumSubmatrix([[2,2,-1]], 3)) // 3