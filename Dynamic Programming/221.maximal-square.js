// 221. Maximal Square
// Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.


// Solution: Dynamic Programming

// For each cell (except the first row and column), set it to be min(dp[i][j - 1], dp[i - 1][j - 1], dp[i - 1][j]) + 1.
// For e.g: 
// 1 1 1
// 1 1 1

// Note: the order of the minimum calc is left, diagonal, right.

// For cell [1][1], the minimum of dp[1][0], dp[0][0], dp[0][1] is 1, so we set it to 1 + 1 -> 2.
// 1 1 1
// 1 2 1
// For cell [1][2], the minimum of dp[1][1], dp[0][1], dp[0][2] is 1, so we set it to 1 + 1 -> 2.
// 1 1 1
// 1 2 2

// The maximum square is 2 * 2 = 4

// Time Complexity: O(nm) 88ms
// Space Complexity: O(nm) 42.5MB
var maximalSquare = function(matrix) {
  let n = matrix.length, m = matrix[0].length;
  let dp = Array(n);
  for (var i = 0; i < n; i++) dp[i] = Array(m);
  for (i = 0; i < n; i++) {
    dp[i][0] = +matrix[i][0];
    if (dp[i][0] === 1) max = 1;
  }
  for (var j = 0; j < m; j++) {
    dp[0][j] = +matrix[0][j];
    if (dp[0][j] === 1) max = 1;
  }
  let max = 0;
  for (i = 1; i < n; i++) {
    for (j = 1; j < m; j++) {
      if (matrix[i][j] !== '0') {
        dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j - 1], dp[i - 1][j]) + 1;
        max = Math.max(max, dp[i][j]);
      } else {
        dp[i][j] = 0;
      }
    }
  }
  return max * max;
};

// A test case to run function on
console.log(maximalSquare([["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]])) // 4