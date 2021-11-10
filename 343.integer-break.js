// 343. Integer Break
// Given an integer n, break it into the sum of k positive integers, where k >= 2, and maximize the product of those integers.
// Return the maximum product you can get.


// Solution 1: Recursion w/ Memoization

// Time Complexity: O(n^2) 72ms
// Space Complexity: O(n) 39.1MB
var integerBreak = function(n) {
  let memo = Array(n);
  return maxProduct(n, 0);

  function maxProduct(n, k) {
    // if memo already contains n, return memo[n]
    if (memo[n] !== undefined) return memo[n];
    // if we have the correct sum,
    if (n === 0) {
      // if k is smaller than 2, return 0 (not valid - anything multiplied by it will also be 0), otherwise return 1 (valid)
      return k >= 2 ? 1 : 0;
    }
    let ans = 0;
    // try adding all possibilities from 1 to n, taking the maximum product
    for (var i = 1; i <= n; i++) {
      ans = Math.max(ans, maxProduct(n - i, k + 1) * i);
    }
    // save in memo, and return for earlier calls
    memo[n] = ans;
    return ans;
  }
};

// Solution 2: Dynamic Programming

// Time Complexity: O(n^2) 76ms
// Space Complexity: O(n) 38.7MB
var integerBreak = function(n) {
  let dp = Array(n + 1).fill(0);
  // set dp[2] to 1 (the best choice is 1 + 1 -> 1 * 1 = 1)
  dp[2] = 1;
  for (var i = 3; i <= n; i++) {
    for (var j = 1; j < i; j++) {
      // keep it the same, or max(j, dp[j]) * max(i - j, dp[i - j]) because now we have two items
      dp[i] = Math.max(dp[i], Math.max(j, dp[j]) * Math.max(i - j, dp[i - j]));
    }
  }
  return dp[n];
};

// Two test cases to run function on
console.log(integerBreak(2)) // 1
console.log(integerBreak(10)) // 36