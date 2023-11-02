// 87. Scramble String
// We can scramble a string s to get a string t using the following algorithm:
// 1. If the length of the string is 1, stop.
// 2. If the length of the string is > 1, do the following:
  // Split the string into two non-empty substrings at a random index, i.e., if the string is s, divide it to x and y where s = x + y.
  // Randomly decide to swap the two substrings or to keep them in the same order. i.e., after this step, s may become s = x + y or s = y + x.
  // Apply step 1 recursively on each of the two substrings x and y.
// Given two strings s1 and s2 of the same length, return true if s2 is a scrambled string of s1, otherwise, return false.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(i, j, len), where
  // i = index in s1
  // j = index in s2
  // len = length of the substrings starting at s1[i] and s2[j]

// For each dp(i, j, len),
  // If the two substrings don't have the same characters, return false immediately.
  // Try splitting s1 at each index from i to i + len - 1.
  // When we split s1, we either:
    // 1. Keep the same order: 
      // Left part: dp(i, j, k + 1) 
      // Right part: dp(i + k + 1, j + k + 1, len - k - 1)
    // 2. Swap:
      // Left part of s1 and right part of s2: dp(i, j + len - k - 1, k + 1)
      // Right part of s1 and left part of s2: dp(i + k + 1, j, len - k - 1)

// Time Complexity: O(n^4) 105ms
// Space Complexity: O(n^3) 50.1MB
var isScramble = function(s1, s2) {
  let n = s1.length, memo = Array(n).fill(0).map(() => Array(n).fill(0).map(() => Array(n + 1).fill(-1))); 
  return dp(0, 0, s1.length);
  
  function dp(i, j, len) {
    if (memo[i][j][len] !== -1) return memo[i][j][len];
    if (!hasSameChars(i, j, len)) return false;
    if (len === 1) return true;
    if (isSame(i, j, len)) return true;
    for (let k = 0; k < len - 1; k++) {
      let keepSame = dp(i, j, k + 1) && dp(i + k + 1, j + k + 1, len - k - 1);
      let swap = dp(i, j + len - k - 1, k + 1) && dp(i + k + 1, j, len - k - 1);
      if (keepSame || swap) {
        return memo[i][j][len] = true;
      }
    }
    return memo[i][j][len] = false;
  }
  
  function isSame(i, j, len) {
    for (let k = 0; k < len; k++) {
      if (s1[i + k] !== s2[j + k]) return false;
    }
    return true;
  }
  
  function hasSameChars(i, j, len) {
    let chars = Array(26).fill(0);
    for (let k = i; k < i + len; k++) {
      chars[s1.charCodeAt(k) - 97]++;
    }
    for (let k = j; k < j + len; k++) {
      chars[s2.charCodeAt(k) - 97]--;
    }
    for (let k = 0; k < 26; k++) {
      if (chars[k] !== 0) return false;
    }
    return true;
  }
};

// Two test cases
console.log(isScramble("great","rgeat")) // true
console.log(isScramble("abcde", "caebd")) // false