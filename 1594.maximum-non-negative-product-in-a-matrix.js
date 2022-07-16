// 1594. Maximum Non Negative Product in a Matrix
// You are given a m x n matrix grid. Initially, you are located at the top-left corner (0, 0), and in each step, you can only move right or down in the matrix.
// Among all possible paths starting from the top-left corner (0, 0) and ending in the bottom-right corner (m - 1, n - 1), find the path with the maximum non-negative product. The product of a path is the product of all integers in the grid cells visited along the path.
// Return the maximum non-negative product modulo 10^9 + 7. If the maximum product is negative, return -1.
// Notice that the modulo is performed after getting the maximum product.


// Solution: DP - Keep Min & Max Result

// For each grid[i][j], keep track of the minimum and maximum products of paths from grid[0][0] to grid[i][j].
// Why we need to keep track of minimum results: Since negative products can become positive when multiplying with another negative number, that means the minimum result can potentially become the maximum result once multiplied with a negative number.

// Base cases: For the first row and column of the grid, just take the running product along the first row and column, since we can only move right or down.
// After the first row/column, we can take the best results from the top and left cell.

// Time Complexity: O(mn) 131ms
// Space Complexity: O(mn) 45.8MB
var maxProductPath = function(grid) {
  let m = grid.length, n = grid[0].length, mod = 10 ** 9 + 7;
  let dp = Array(m).fill(0).map(() => Array(n).fill(0).map(() => new Cell()));
  dp[0][0].min = grid[0][0], dp[0][0].max = grid[0][0];
  for (let i = 1; i < m; i++) {
    dp[i][0].min = dp[i - 1][0].min * grid[i][0];
    dp[i][0].max = dp[i - 1][0].max * grid[i][0];
  }
  for (let j = 1; j < n; j++) {
    dp[0][j].min = dp[0][j - 1].min * grid[0][j];
    dp[0][j].max = dp[0][j - 1].max * grid[0][j];
  }
    
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j].max = Math.max(
        dp[i - 1][j].min * grid[i][j], 
        dp[i - 1][j].max * grid[i][j],
        dp[i][j - 1].min * grid[i][j],
        dp[i][j - 1].max * grid[i][j]
      );
      dp[i][j].min = Math.min(
        dp[i - 1][j].min * grid[i][j], 
        dp[i - 1][j].max * grid[i][j],
        dp[i][j - 1].min * grid[i][j],
        dp[i][j - 1].max * grid[i][j]
      );
    }
  }
  return dp[m - 1][n - 1].max < 0 ? -1 : dp[m - 1][n - 1].max % mod;
};

class Cell {
  constructor() {
    this.min = 0;
    this.max = 0;
  }
}

// Three test cases to run function on
console.log(maxProductPath([[-1,-2,-3],[-2,-3,-3],[-3,-3,-2]])) // -1
console.log(maxProductPath([[1,-2,1],[1,-2,1],[3,-4,1]])) // 8
console.log(maxProductPath([[1,3],[0,-4]])) // 0