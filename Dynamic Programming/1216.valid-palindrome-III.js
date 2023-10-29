// 1216. Valid Palindrome III
// Given a string s and an integer k, return true if s is a k-palindrome.
// A string is k-palindrome if it can be transformed into a palindrome by removing at most k characters from it.


// Solution: DP - Recursion w/ Memoization

// The problem boils down to finding the longest palindromic subsequence in s.
// If the longest palindromic subsequence has a length >= s.length - k, return true.

// If s[i] is equal to s[j], we gain 2 characters: dfs(i + 1, j - 1) + 2
// Otherwise, we take the best of two options:
  // 1. Skip s[i]: dfs(i + 1, j)
  // 2. Skip s[j]: dfs(i, j - 1)

// Time Complexity: O(n^2) 89ms
// Space Complexity: O(n^2) 48.5MB
var isValidPalindrome = function(s, k) {
  let n = s.length, memo = Array(n).fill(0).map(() => Array(n).fill(-1));
  return dfs(0, s.length - 1) >= n - k;
  
  function dfs(i, j) {
    if (i === j) return 1;
    if (i > j) return 0;
    if (memo[i][j] !== -1) return memo[i][j];

    if (s[i] === s[j]) {
      return memo[i][j] = dfs(i + 1, j - 1) + 2;
    } else {
      let skipLeft = dfs(i + 1, j), skipRight = dfs(i, j - 1);
      return memo[i][j] = Math.max(skipLeft, skipRight);
    }
  }
};

// Two test cases 
console.log(isValidPalindrome("abcdeca", 2)) // true
console.log(isValidPalindrome("abbababa", 1)) // true