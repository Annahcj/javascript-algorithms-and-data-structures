// 91. Decode Ways
// Given a string s containing only digits, return the number of ways to decode it.


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(i), where dp(i) = the number of ways for the string from index i to n - 1.
// At each index i, combine the number of ways taking one digit and two digits (if the number <= 26).

// Time Complexity: O(n) 99ms
// Space Complexity: O(n) 42.4MB
var numDecodings = function(s) {
  let n = s.length, memo = Array(n).fill(-1);
  return dp(0);
  
  function dp(i) {
    if (i === n) return 1;
    if (s[i] === '0') return 0;
    if (memo[i] !== -1) return memo[i];
    
    let ways = dp(i + 1); // take one digit
    if (i < n - 1 && Number(s.slice(i, i + 2)) <= 26) { // take two digits
      ways += dp(i + 2);
    }
    return memo[i] = ways;
  }  
};

// Solution 2: DP - Tabulation

// Populate dp, where dp[i] = number of ways from index i to n - 1.
// Process s from end to start.
// The base case is when we reach the end index n, where we get 1 way.

// Time Complexity: O(n) 107ms
// Space Complexity: O(n) 42.8MB
var numDecodings = function(s) {
  let n = s.length, dp = Array(n + 1).fill(0);
  dp[n] = 1;
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] === '0') dp[i] = 0;
    else {
      dp[i] = dp[i + 1];
      if (i < n - 1 && Number(s.slice(i, i + 2)) <= 26) {
        dp[i] += dp[i + 2];
      }
    }
  }
  return dp[0];
};

// Solution 3: DP - Tabulation (Constant Space)

// Since we only ever need access to the next two dp states, we can store them in two variables.
// This brings the space complexity down to O(1).

// Time Complexity: O(n) 86ms
// Space Complexity: O(1) 42.1MB
var numDecodings = function(s) {
  let n = s.length, next = 1, nextNext = 0;
  for (let i = n - 1; i >= 0; i--) {
    let ways = 0;
    if (s[i] !== '0') {
      ways = next;
      if (i < n - 1 && Number(s.slice(i, i + 2)) <= 26) {
        ways += nextNext;
      }
    }
    nextNext = next;
    next = ways;
  }
  return next;
};
  
// Four test cases
console.log(numDecodings("1233")) // 3
console.log(numDecodings("226")) // 3
console.log(numDecodings("0")) // 0
console.log(numDecodings("06")) // 0