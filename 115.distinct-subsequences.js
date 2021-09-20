// 115. Distinct Subsequences
// Given two strings s and t, return the number of distinct subsequences of s which equals t.
// A string's subsequence is a new string formed from the original string by deleting some (can be none) of the characters without disturbing the remaining characters' relative positions. (i.e., "ACE" is a subsequence of "ABCDE" while "AEC" is not).
// It is guaranteed the answer fits on a 32-bit signed integer.


// Solution 1: Recursion w/ Memoization

// let i = index in s, j = index in t
// for any (i, j), we have two options
  // 1. Move i forward one step
  // 2. If character matches, move both i and j forward one step

// m = s.length, n = t.length
// recursion base case: i is equal to m, or j is equal to n, or m - i is smaller than n - j (impossible because remaining letters in s is less than remaining letters in t)
  // if j is equal to n (meaning all letters in t exist in s), return 1, otherwise return 0.


// Time Complexity: O(mn) 210ms
// Space Complexity: O(mn) (call stack) 48.5MB
var numDistinct = function(s, t) {
  let m = s.length, n = t.length;
  let memo = {};
  return recurse(0, 0);
  function recurse(i, j) {
    if (i === m || j === n || m - i < n - j) {
      return j === n ? 1 : 0;
    }
    if (memo[[i, j]] !== undefined) return memo[[i, j]];
    let ans = recurse(i + 1, j);
    if (s[i] === t[j]) {
      ans += recurse(i + 1, j + 1);
    }
    memo[[i, j]] = ans;
    return ans;
  }
};

// Solution 2: Iterative w/ DP

// Use a matrix to instead of recursion.
// num of rows: s.length + 1
// num of columns: t.length + 1
// fill the furthest right column with 1's
// fill the bottom row with 0's

// again, we have two situations:
  // 1. Set dp[i] to dp[i + 1][j]
  // 2. (Only if s[i] is equal to t[j]) increment dp[i] by dp[i + 1][j + 1]

// loop through from m - 1 to 0 (pointer = i)
  // loop through from n - 1 to 0 (pointer = j)
    // set dp[i] to dp[i + 1][j]
    // if s[i] is equal to t[j], increment dp[i] by dp[i + 1][j + 1]

// return dp[0][0]


// Time Complexity: O(mn) 158ms
// Space Complexity: O(mn) 61.9MB
var numDistinct = function(s, t) {
  let m = s.length, n = t.length;
  let dp = new Array(m + 1);
  for (var i = 0; i <= m; i++) {
    dp[i] = new Array(n + 1);
  }
  for (var j = 0; j <= n; j++) {
    dp[m][j] = 0;
  }
  for (i = 0; i <= m; i++) {
    dp[i][n] = 1;
  }
  for (i = m - 1; i >= 0; i--) {
    for (j = n - 1; j >= 0; j--) {
      dp[i][j] = dp[i + 1][j];
      if (s[i] === t[j]) {
        dp[i][j] += dp[i + 1][j + 1];
      }
    }
  }
  return dp[0][0];
};

// Two test cases to run function on
console.log(numDistinct("rabbbit", "rabbit")) // 3
console.log(numDistinct("babgbag", "bag")) // 5