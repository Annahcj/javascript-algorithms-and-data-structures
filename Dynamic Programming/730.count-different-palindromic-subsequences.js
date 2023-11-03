// 730. Count Different Palindromic Subsequences
// Given a string s, return the number of different non-empty palindromic subsequences in s. Since the answer may be very large, return it modulo 10^9 + 7.
// A subsequence of a string is obtained by deleting zero or more characters from the string.
// A sequence is palindromic if it is equal to the sequence reversed.
// Two sequences a1, a2, ... and b1, b2, ... are different if there is some i for which a[i] != b[i].


// Solution: DP w/ Two Pointers

// Populate dp, where dp[start][end] = the number of palindromic subsequences within substring(start, end).

// For each dp[start][end], 

  // If s[start] === s[end], use two pointers (i, j) to find the first occurances of the character s[start] inside the substring(start + 1, end - 1).

    // If i is equal to j: e.g "ccc", (i, j) at index 1.
      // dp[start][end] = dp[start + 1][end - 1] * 2 + 1.
      // Explanation: We take double the occurances because we want all the existing subsequences, plus wrapping all subsequences with s[start] and s[end]. We add +1 for the case of "cc" (we already count "c" since i === j, but we don't have "cc" yet).
    
    // If i > j: e.g "cbabc", (i, j) at indexes (1, 3).
      // dp[start][end] = dp[start + 1][end - 1] * 2 + 2.
      // Explanation: We take double the occurances because we want all the existing subsequences, plus wrapping all subsequences with s[start] and s[end]. We add +2 for the case of "cc" and "c".
   
    // If i < j: e.g: "cbcacbc", (i, j) at indexes (2, 4).
      // dp[start][end] = dp[start + 1][end - 1] * 2 - dp[i + 1][j - 1].
      // Explanation: We remove dp[i + 1][j - 1] because we end up counting duplicate subsequences wrapped with the same characters.

// Otherwise: dp[start][end] = dp[start + 1][end] + dp[start][end - 1] - dp[start + 1][end - 1]
  // Explanation: dp[start + 1][end - 1] is counted twice; once in dp[start + 1][end] and once in dp[start][end - 1]. We eliminate one.

// Time Complexity: O(n^2) 216ms
// Space Complexity: O(n^2) 128.1MB
var countPalindromicSubsequences = function(s) {
  let n = s.length, dp = Array(n).fill(0).map(() => Array(n).fill(1));
  for (let i = 1; i < n; i++) dp[i - 1][i] = 2; // "ab" -> ["a", "b"], "aa" -> ["a", "aa"]
  let MOD = 1000000007;

  for (let len = 3; len <= n; len++) {
    for (let start = 0; start <= n - len; start++) {
      let end = start + len - 1;
      if (s[start] === s[end]) {
        let i = start + 1, j = end - 1;
        while (i <= j && s[i] !== s[start]) i++;
        while (i <= j && s[j] !== s[start]) j--;
        if (i === j) {
          dp[start][end] = (dp[start + 1][end - 1] * 2 + 1) % MOD;
        } else if (i > j) {
          dp[start][end] = (dp[start + 1][end - 1] * 2 + 2) % MOD;
        } else { // i < j
          let duplicates = i + 1 === j ? 0 : dp[i + 1][j - 1];
          dp[start][end] = (dp[start + 1][end - 1] * 2 - duplicates) % MOD;
        }
      } else {
        // both dp[start + 1][end] and dp[start][end - 1] include dp[start + 1][end - 1], so we remove one occurance of dp[start + 1][end - 1]
        dp[start][end] = (dp[start + 1][end] + dp[start][end - 1] - dp[start + 1][end - 1]) % MOD;
      }
    }
  }
  return dp[0][n - 1] < 0 ? dp[0][n - 1] + MOD : dp[0][n - 1];
};

// Two test cases
console.log(countPalindromicSubsequences("bccb")) // 6
console.log(countPalindromicSubsequences("abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba")) // 104860361