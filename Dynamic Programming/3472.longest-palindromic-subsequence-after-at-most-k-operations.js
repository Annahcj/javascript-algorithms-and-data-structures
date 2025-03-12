// 3472. Longest Palindromic Subsequence After at Most K Operations
// You are given a string s and an integer k.
// In one operation, you can replace the character at any position with the next or previous letter in the alphabet (wrapping around so that 'a' is after 'z'). For example, replacing 'a' with the next letter results in 'b', and replacing 'a' with the previous letter results in 'z'. Similarly, replacing 'z' with the next letter results in 'a', and replacing 'z' with the previous letter results in 'y'.
// Return the length of the longest palindromic subsequence of s that can be obtained after performing at most k operations.


// Solution: DP

// Memoize every dp(i, j, k), where dp(i, j, k) returns the maximum lengthed palindromic subsequence within the indices (i, j).
  // i = left index in s
  // j = right index in s
  // k = number of operations remaining

// For every dp(i, j, k), there are three scenarios:
  // 1. If we have enough operations to make s[i] and s[j] equal, take both these characters.
  // 2. Skip s[i].
  // 3. Skip s[j].
// Memoize and return the maximum length out of all three scenarios.

// Time Complexity: O(n^2 * k) 792ms
// Space Complexity: O(n^2 * k) 142.1MB
function longestPalindromicSubsequence(s, k) {
  const n = s.length;
  const memo = Array(n).fill(0).map(() => Array(n).fill(0).map(() => Array(k + 1).fill(-1)));
  return dp(0, n - 1, k);

  function dp(i, j, k) {
    if (i === j) return 1;
    if (i > j) return 0;
    if (memo[i][j][k] !== -1) return memo[i][j][k];
    let maxLen = Math.max(dp(i + 1, j, k), dp(i, j - 1, k));
    const ops = diff(s[i], s[j]);
    if (ops <= k) {
      maxLen = Math.max(maxLen, 2 + dp(i + 1, j - 1, k - ops));
    }
    return memo[i][j][k] = maxLen;
  }  
};

function diff(a, b) {
  if (b > a) return diff(b, a);
  const charcodeA = a.charCodeAt() - 97;
  const charcodeB = b.charCodeAt() - 97;
  return Math.min(charcodeA - charcodeB, charcodeB + 26 - charcodeA);
}

// Two test cases
console.log(longestPalindromicSubsequence("abced", 2)) // 3
console.log(longestPalindromicSubsequence("aaazzz", 4)) // 6