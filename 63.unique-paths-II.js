// 63. Unique Paths II
// A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
// The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).
// Now consider if some obstacles are added to the grids. How many unique paths would there be?
// An obstacle and space is marked as 1 and 0 respectively in the grid.


// Solution: Dynamic Programming

// Time Complexity: O(mn) 80ms
// Space Complexity: O(mn) 39.4MB
var uniquePathsWithObstacles = function(obstacleGrid) {
  let width = obstacleGrid[0].length, length = obstacleGrid.length;
  if (obstacleGrid[0][0] === 1) return 0;
  let dp = Array(length);
  for (var i = 0; i < length; i++) {
    dp[i] = Array(width);
  }
  // initialize dp[0][0] to 1
  dp[0][0] = 1;
  for (var i = 0; i < length; i++) {
    for (var j = 0; j < width; j++) {
      if (!i && !j) continue;
      if (!obstacleGrid[i][j]) {
        // if i > 0 AND above is not obstacle
        let above = i && obstacleGrid[i - 1][j] === 0 ? dp[i - 1][j] : 0;
        // if j > 0 AND left is not obstacle
        let left = j && obstacleGrid[i][j - 1] === 0 ? dp[i][j - 1] : 0;
        dp[i][j] = above + left;
      } 
    }
  } 
  return dp[length - 1][width - 1] ? dp[length - 1][width - 1] : 0;
};


// Two test cases to run function on
console.log(uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]])) // 2
console.log(uniquePathsWithObstacles([[0,1],[0,0]])) // 1