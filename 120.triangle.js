// 120. Triangle
// Given a triangle array, return the minimum path sum from top to bottom.
// For each step, you may move to an adjacent number of the row below. More formally, if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.


// Solution 1: Dynamic Programming

// Top down dynamic programming.
// Fill the last row of dp with triangle[n - 1] to make it easier for handling out of bounds indices.
// Start looping from the second to last row and take triangle[i][j] + Math.min(dp[i + 1][j], dp[i + 1][j + 1]) for each dp[i][j].

// Time Complexity: O(n^2) 79ms
// Space Complexity: O(n^2) 43.8MB
var minimumTotal = function(triangle) {
  let n = triangle.length, dp = Array(n).fill(0).map(() => Array(n));
  for (let j = 0; j < n; j++) dp[n - 1][j] = triangle[n - 1][j];
  
  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      dp[i][j] = triangle[i][j] + Math.min(dp[i + 1][j], dp[i + 1][j + 1]);
    }
  }
  return dp[0][0];
};


// Solution 2: Optimal Space

// We can actually just use two rows 'prev' and 'curr' since we only need the values from the previous row.

// Time Complexity: O(n^2) 73ms
// Space Complexity: O(n) 42MB
var minimumTotal = function(triangle) {
  let n = triangle.length, prev = triangle[n - 1], curr = Array(n);
  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      curr[j] = triangle[i][j] + Math.min(prev[j], prev[j + 1]);
    }
    prev = curr;
  }
  return prev[0];
};

// Two test cases to run function on
console.log(minimumTotal([[2],[3,4],[6,5,7],[4,1,8,3]])) // 11
console.log(minimumTotal([[-10]])) // -10