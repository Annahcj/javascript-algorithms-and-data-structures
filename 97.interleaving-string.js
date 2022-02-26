// 97. Interleaving String
// Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.
// An interleaving of two strings s and t is a configuration where they are divided into non-empty substrings such that:
  // s = s1 + s2 + ... + sn
  // t = t1 + t2 + ... + tm
  // |n - m| <= 1
  // The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...
// Note: a + b is the concatenation of strings a and b.


// Solution 1: Recursion w/ Memoization

// Try all possibilities of matching substrings.
// Memoize the results in a 2D array.

// Time Complexity: O(nm) 52ms
// Space Complexity: O(nm) 44.8MB
var isInterleave = function(s1, s2, s3) {
  let n = s1.length, m = s2.length, h = s3.length;
  if (n + m !== h) return false;
  let memo = Array(n).fill(0).map(() => Array(m).fill(-1));
  return dp(0, 0);
  
  function dp(i, j) {
    if (i === n && j === m) return true;
    if (i < n && j < m && memo[i][j] !== -1) return memo[i][j];
    
    // index in s3 = i + j
    let ans = false;
    if (s1[i] === s3[i + j]) ans ||= dp(i + 1, j);
    if (s2[j] === s3[i + j]) ans ||= dp(i, j + 1);
    return i < n && j < m ? memo[i][j] = ans : ans;
  }
};

// Solution 2: Dynamic Programming w/ Tabulation

// Set dp[0][0] to true -> offset the indices by 1.
// at i = 0 and j = 1, check s3[i + j - 1] = s3[0].

// Time Complexity: O(nm) 109ms
// Space Complexity: O(nm) 46.2MB
var isInterleave = function(s1, s2, s3) {
  let n = s1.length, m = s2.length, h = s3.length;
  if (n + m !== h) return false;
  let dp = Array(n + 1).fill(0).map(() => Array(m + 1).fill(false));
  
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      // index in s3 = i + j - 1
      if (i === 0 && j === 0) dp[i][j] = true;
      else if (i === 0) {
        // the first substring of s2, not preceded by any substring.
        if (dp[i][j - 1] && s3[i + j - 1] === s2[j - 1]) dp[i][j] = true;
      } else if (j === 0) {
        // the first substring of s1, not preceded by any substring.
        if (dp[i - 1][j] && s3[i + j - 1] === s1[i - 1]) dp[i][j] = true;
      } else {
        // both possibilities are considered
        dp[i][j] = (s1[i - 1] === s3[i + j - 1] && dp[i - 1][j]) || (s2[j - 1] === s3[i + j - 1] && dp[i][j - 1]);
      }
    }
  }
  return dp[n][m];
};

// Three test cases to run function on
console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac")) // true
console.log(isInterleave("aabcc", "dbbca", "aadbbbaccc")) // false
console.log(isInterleave("", "", "")) // true