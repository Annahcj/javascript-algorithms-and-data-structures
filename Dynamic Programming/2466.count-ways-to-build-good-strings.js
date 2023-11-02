// 2466. Count Ways To Build Good Strings
// Given the integers zero, one, low, and high, we can construct a string by starting with an empty string, and then at each step perform either of the following:
  // Append the character '0' zero times.
  // Append the character '1' one times.
// This can be performed any number of times.
// A good string is a string constructed by the above process having a length between low and high (inclusive).
// Return the number of different good strings that can be constructed satisfying these properties. Since the answer can be large, return it modulo 10^9 + 7.


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(len), where dp(len) = the number of good strings with length (high - len).
// For each dp(len), get the sum of the number of ways for:
  // 1. Appending '0' zero times
  // 2. Appending '1' one times. 

// If the current len >= low, we have found a good string.
// Base case: When len > high, return 0.

// Time Complexity: O(high) 132ms
// Space Complexity: O(high) 56.9MB
var countGoodStrings = function(low, high, zero, one) {
  let memo = Array(high + 1).fill(-1), MOD = 10 ** 9 + 7;
  return dp(0);
  
  function dp(len) {
    if (len > high) return 0;
    if (memo[len] !== -1) return memo[len];
    
    let ways = len >= low ? 1 : 0;
    ways = (ways + dp(len + zero)) % MOD;
    ways = (ways + dp(len + one)) % MOD;
    return memo[len] = ways;
  }  
};


// Solution 2: Bottom-up DP

// Iterative bottom-up version.

// Time Complexity: O(high) 115ms
// Space Complexity: O(high) 45.9MB
var countGoodStrings = function(low, high, zero, one) {
  let dp = Array(high + 1).fill(0), MOD = 10 ** 9 + 7, ways = 0;
  dp[0] = 1;
  for (let i = 1; i <= high; i++) {
    if (i >= zero) {
      dp[i] = (dp[i] + dp[i - zero]) % MOD;
    }
    if (i >= one) {
      dp[i] = (dp[i] + dp[i - one]) % MOD;
    }
    if (i >= low) ways = (ways + dp[i]) % MOD;
  }
  return ways;
};

// Two test cases
console.log(countGoodStrings(3, 3, 1, 1)) // 8
console.log(countGoodStrings(2, 3, 1, 2)) // 5