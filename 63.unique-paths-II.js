// 63. Unique Paths II
// A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
// The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).
// Now consider if some obstacles are added to the grids. How many unique paths would there be?
// An obstacle and space is marked as 1 and 0 respectively in the grid.


// Solution: DP

// Populate a matrix dp, where dp[i][j] = number of unique paths to each cell (i, j) from (0, 0).
// For each dp[i][j],
  // If obstacleGrid[i][j] is an obstacle, there are no ways to reach this cell (dp[i][j] = 0).
  // Otherwise, dp[i][j] = dp[i - 1][j] + dp[i][j - 1] (ways from the left and top cell).

// At the end, return dp[m - 1][n - 1].

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 65ms
// Space Complexity: O(mn) 42.7MB
var uniquePathsWithObstacles = function(obstacleGrid) {
  let m = obstacleGrid.length, n = obstacleGrid[0].length;
  if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1]) return 0;
  let dp = Array(m).fill(0).map(() => Array(n).fill(0));
  dp[0][0] = 1;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) continue;
      if (obstacleGrid[i][j] === 1) continue;
      if (i > 0) dp[i][j] += dp[i - 1][j];
      if (j > 0) dp[i][j] += dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
};

// Two test cases to run function on
console.log(uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]])) // 2
console.log(uniquePathsWithObstacles([[0,1],[0,0]])) // 1