// 2767. Partition String Into Minimum Beautiful Substrings
// Given a binary string s, partition the string into one or more substrings such that each substring is beautiful.
// A string is beautiful if:
  // It doesn't contain leading zeros.
  // It's the binary representation of a number that is a power of 5.
// Return the minimum number of substrings in such partition. If it is impossible to partition the string s into beautiful substrings, return -1.
// A substring is a contiguous sequence of characters in a string.


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(i), where dp(i) = minimum number of beautiful substrings for the s(i + 1, n - 1).
// For each dp(i), go through each index j where j >= i, and try to take each substring s(i, j) which is a power of 5.

// Time Complexity: O(n^2) 71ms
// Space Complexity: O(n) 44.6MB
var minimumBeautifulSubstrings = function(s) {
  let n = s.length, memo = Array(n).fill(-1);
  let powFives = new Set();
  for (let i = 0; i < n; i++) {
    let powFive = 5 ** i;
    if (powFive > (1 << n)) break;
    powFives.add(powFive);
  }
  let res = dp(0);
  return res === Infinity ? -1 : res;
  
  function dp(i) {
    if (i === n) return 0;
    if (memo[i] !== -1) return memo[i];
    if (s[i] === '0') return Infinity;
    
    let ans = Infinity, num = 0;
    for (let j = i; j < n; j++) {
      num = (num << 1) | Number(s[j]);
      if (powFives.has(num)) {
        ans = Math.min(ans, 1 + dp(j + 1));
      }
    }
    return memo[i] = ans;
  }
};


// Solution 2: Iterative DP

// Populate dp, where dp[i] = minimum number of beautiful substrings for the s(i + 1, n - 1).
// For each dp[i], go through each index j where j >= i, and try to take each substring s(i, j) which is a power of 5.

// Time Complexity: O(n^2) 81ms
// Space Complexity: O(n) 44.8MB
var minimumBeautifulSubstrings = function(s) {
  let n = s.length, powFives = new Set();
  for (let i = 0; i < n; i++) {
    let powFive = 5 ** i;
    if (powFive > (1 << n)) break;
    powFives.add(powFive);
  }
  
  let dp = Array(n + 1).fill(Infinity);
  dp[n] = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] === '0') continue;
    let num = 0;
    for (let j = i; j < n; j++) {
      num = (num << 1) | Number(s[j]);
      if (powFives.has(num)) {
        dp[i] = Math.min(dp[i], 1 + dp[j + 1]);
      }
    }
  }
  return dp[0] === Infinity ? -1 : dp[0];
};

// Three test cases
console.log(minimumBeautifulSubstrings("1011")) // 2
console.log(minimumBeautifulSubstrings("111")) // 3
console.log(minimumBeautifulSubstrings("0")) // -1