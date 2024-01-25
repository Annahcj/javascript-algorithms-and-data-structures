// 1143. Longest Common Subsequence


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(i, j), where
  // i = index in text1
  // j = index in text2

// For each dp(i, j),
  // If text1[i] is equal to text2[j], it's optimal to take the match and move both pointers up: 1 + dp(i + 1, j + 1).
  // Otherwise, take the best result out of skipping either text1[i] or text2[j].

// n = length of text1, m = length of text2
// Time Complexity: O(nm) 125ms
// Space Complexity: O(nm) 75.8MB
var longestCommonSubsequence = function(text1, text2) {
  let n = text1.length, m = text2.length;
  let memo = Array(n).fill(0).map(() => Array(m).fill(-1));
  return dp(0, 0);
  
  function dp(i, j) {
    if (i === n || j === m) return 0;
    if (memo[i][j] !== -1) return memo[i][j];
    
    let ans = 0;
    if (text1[i] === text2[j]) {
      ans = Math.max(ans, 1 + dp(i + 1, j + 1));
    } else {
      ans = Math.max(dp(i + 1, j), dp(i, j + 1));
    }
    return memo[i][j] = ans;
  }
};


// Solution 2: Bottom-Up Iterative DP

// The same approach as solution 1, but the iterative version.

// Time Complexity: O(nm) 125ms
// Space Complexity: O(nm) 77.6MB
var longestCommonSubsequence = function(text1, text2) {
  let n = text1.length, m = text2.length;
  let dp = Array(n + 1).fill(0).map(() => Array(m + 1).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (text1[i] === text2[j]) {
        dp[i + 1][j + 1] = 1 + dp[i][j];
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
      }
    }
  }
  return dp[n][m];
};

// Three test cases
console.log(longestCommonSubsequence("abcde", "ace")) // 3
console.log(longestCommonSubsequence("abc", "abc")) // 3
console.log(longestCommonSubsequence("abc", "def")) // 0