// 343. Integer Break
// Given an integer n, break it into the sum of k positive integers, where k >= 2, and maximize the product of those integers.
// Return the maximum product you can get.


// Solution: DP

// Populate dp, where dp[i] = maximum product for all combinations of numbers summing up to i.
// For each sum i, go through each possible number to add to the sequence to sum up to i: dp[j] * (i - j).
// Record the maximum dp[i].

// Time Complexity: O(n^2) 51ms
// Space Complexity: O(n) 41.8MB
var integerBreak = function(n) {
  let dp = Array(n + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= n; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (i === n && j === 0) continue; // k must be >= 2
      let currNum = i - j;
      dp[i] = Math.max(dp[i], dp[j] * currNum);
    }
  }
  return dp[n];
};

// Two test cases 
console.log(integerBreak(2)) // 1
console.log(integerBreak(10)) // 36