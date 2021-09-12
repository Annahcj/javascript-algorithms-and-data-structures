// 62. Unique Paths
// Solution 1: Dynamic Programming

// Thoughts:
// Keep in mind we can only move in two directions -> down or right
// We can use dynamic programming to store the amount of unique paths up to each point in the grid (points inside m x n).
// The entire first row of the matrix will all be 1's, since once you go down, you can't come back up.
// The same goes for the first column, once you go right, you can't go left again.
// After that, we can loop through from 1 to m - 1 (row)
  // and loop through from 1 to n - 1 (column)
    // set dp[i][j] to the amount above (up) + the amount on the left (left)
// Return dp[m - 1][n - 1]

// Time Complexity: O(mn) 76ms
// Space Complexity: O(mn) 38.7MB
var uniquePaths = function(m, n) {
  let dp = Array(m);
  for (var i = 0; i < m; i++) {
    dp[i] = Array(n).fill(1);
  }
  for (var i = 1; i < m; i++) {
    for (var j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
};

// Solution 2: Optimized Space

// It turns out that just keeping one row is enough to yield the correct results.

// Time Complexity: O(mn) 70ms
// Space Complexity: O(n) 38.5MB
var uniquePaths = function(m, n) {
  let dp = Array(n).fill(1);
  for (var i = 1; i < m; i++) {
    for (var j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }
  return dp[n - 1];
};

// Four test cases to run function on
console.log(uniquePaths(3, 7)) // 28
console.log(uniquePaths(3, 2)) // 3
console.log(uniquePaths(7, 3)) // 28
console.log(uniquePaths(3, 3)) // 6