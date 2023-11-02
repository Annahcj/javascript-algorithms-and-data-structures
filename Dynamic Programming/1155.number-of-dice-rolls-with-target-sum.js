// 1155. Number of Dice Rolls With Target Sum
// You have n dice and each die has k faces numbered from 1 to k.
// Given three integers n, k, and target, return the number of possible ways (out of the kn total ways) to roll the dice so the sum of the face-up numbers equals target. Since the answer may be too large, return it modulo 109 + 7.


// Solution 1: Bottom-up Dynamic Programming

// dp[i][sum] = number of ways to have sum of face-up numbers equal to 'sum' using exactly 'i' dice.

// Time Complexity: O(n * k * target) 171ms
// Space Complexity: O(n * target) 44.9MB
var numRollsToTarget = function(n, k, target) {
  let dp = Array(n + 1).fill(0).map(() => Array(target + 1).fill(0));
  let mod = 10**9 + 7;
  dp[0][0] = 1; // base case
  
  for (let i = 1; i <= n; i++) {
    for (let sum = 1; sum <= target; sum++) {
      for (let num = 1; num <= k; num++) {
        if (sum - num >= 0) dp[i][sum] = (dp[i][sum] + dp[i - 1][sum - num]) % mod;
      }
    }
  }
  return dp[n][target];
};

// Solution 2: Optimized Space

// Since we only need to keep track of the previous row, we can reduce the space to O(target)

// Time Complexity: O(n * k * target) 108ms
// Space Complexity: O(target) 44.1MB
var numRollsToTarget = function(n, k, target) {
  let prev = Array(target + 1).fill(0), mod = 10**9 + 7;
  prev[0] = 1;
  
  for (let i = 1; i <= n; i++) {
    let curr = Array(target + 1).fill(0);
    for (let sum = 1; sum <= target; sum++) {
      for (let num = 1; num <= k; num++) {
        if (sum - num >= 0) curr[sum] = (curr[sum] + prev[sum - num]) % mod;
      }
    }
    prev = curr;
  }
  return prev[target];
};

// Three test cases
console.log(numRollsToTarget(1, 6, 3)) // 1
console.log(numRollsToTarget(2, 6, 7)) // 6
console.log(numRollsToTarget(30, 30, 500)) // 222616187