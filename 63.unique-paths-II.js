// 63. Unique Paths II
// A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
// The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).
// Now consider if some obstacles are added to the grids. How many unique paths would there be?
// An obstacle and space is marked as 1 and 0 respectively in the grid.


// Solution: Dynamic Programming

// Time Complexity: O(nm) 76ms
// Space Complexity: O(nm) 39.8MB
var uniquePathsWithObstacles = function(obstacleGrid) {
  let n = obstacleGrid.length, m = obstacleGrid[0].length;
  let dp = Array(n);
  for (var i = 0; i < n; i++) dp[i] = Array(m);
  // if first obstacleGrid row is [0,1,0,0], dp row will be -> [1,0,0,0]
  // if not obstacle, set to 1. otherwise once there is an obstacle, any cell after it on the row cannot be reached, so set all after an obstacle to 0.
  for (var j = 0; j < m; j++) dp[0][j] = obstacleGrid[0][j] === 1 || (j > 0 && dp[0][j - 1] === 0) ? 0 : 1;
  // same for the first column -> once obstacle is reached, any cell after it will be 0 (cannot be reached)
  for (i = 0; i < n; i++) dp[i][0] = obstacleGrid[i][0] === 1 || (i > 0 && dp[i - 1][0] === 0) ? 0 : 1;
  for (i = 1; i < n; i++) {
    for (j = 1; j < m; j++) {
      // if obstacle, set to 0
      if (obstacleGrid[i][j] === 1) dp[i][j] = 0;
      // otherwise take upper and left
      else dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[n - 1][m - 1];
};

// Two test cases to run function on
console.log(uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]])) // 2
console.log(uniquePathsWithObstacles([[0,1],[0,0]])) // 1