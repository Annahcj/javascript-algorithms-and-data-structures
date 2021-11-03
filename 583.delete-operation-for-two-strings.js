// 583. Delete Operation for Two Strings
// Given two strings word1 and word2, return the minimum number of steps required to make word1 and word2 the same.
// In one step, you can delete exactly one character in either string.


// Solution: Find LCS

// Find the longest common subsequence in the two words.
// The answer is the length of word1 - the lcs + word2 - the lcs.

// LCS:
// dp[i][j] denotes the length of the longest comon subsequence until index i of word1 and index j of word2
// Loop through word1 (pointer = i)
  // loop through word2 (pointer = j)
    // if word1[i] is equal to word2[j],
      // set dp[i][j] to be dp[i - 1][j - 1] + 1 (or 0 + 1 if [i - 1][j - 1] is out of bounds)
    // otherwise if they are not equal,
      // set dp[i][j] to max of dp[i - 1][j] and dp[i][j - 1]

// Time Complexity: O(nm) 120ms
// Space Complexity: O(nm) 45.1MB
var minDistance = function(word1, word2) {
  let n = word1.length, m = word2.length;
  let dp = Array(n);
  for (var i = 0; i < n; i++) dp[i] = Array(m);
  for (i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      let prev = i > 0 && j > 0 ? dp[i - 1][j - 1] : 0;
      let up = i > 0 ? dp[i - 1][j] : 0;
      let left = j > 0 ? dp[i][j - 1] : 0;
      if (word1[i] === word2[j]) dp[i][j] = prev + 1;
      else dp[i][j] = Math.max(up, left);
    }
  }
  let lcs = dp[n - 1][m - 1];
  return n - lcs + m - lcs;
};

// Two test cases to run function on
console.log(minDistance("sea", "eat")) // 2
console.log(minDistance("leetcode", "etco")) // 4