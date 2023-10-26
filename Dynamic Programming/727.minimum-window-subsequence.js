// 727. Minimum Window Subsequence
// Given strings s1 and s2, return the minimum contiguous substring part of s1, so that s2 is a subsequence of the part.
// If there is no such window in s1 that covers all characters in s2, return the empty string "". If there are multiple such minimum-length windows, return the one with the left-most starting index.


// Solution 1: Two Pointers

// i = start pointer in s2, j = end pointer in s2, k = pointer in s2
// When s2 becomes fully matched, try to improve the window size:
  // 1. Reset k (pointer in s2) to 0.
  // 2. Reset j to i + 1 

// n = length of s1
// Time Complexity: O(n^2) 1528ms
// Space Complexity: O(1) 43.2MB
var minWindow = function(s1, s2) {
  let n = s1.length, m = s2.length;
  let start = -Infinity, end = Infinity;
  for (let i = 0, j = 0, k = 0; j < n; j++) {
    if (s1[j] === s2[k]) {
      if (k === 0) i = j; // optimize the position of i
      k++;
    }
    if (k === m) {
      if (j - i < end - start) start = i, end = j;
      k = 0, j = i;
    }
  }
  return end === Infinity ? "" : s1.slice(start, end + 1);
};

// Solution 2: Recursion w/ Memoization

// Each state has two choices:
  // 1. If s1[i] matches s2[j], move both i and j forward.
  // 2. Regardless of whether they match, only move i forward.
// The base case is when s2 is fully matched, and we return the end position in s1.
// If we reach the end of s1 and s2 is not fully matched, it is impossible so we return Infinity.

// n = length of s1, m = length of s2
// Time Complexity: O(nm) 784ms
// Space Complexity: O(nm) 78.1MB
var minWindow = function(s1, s2) {
  let start = -Infinity, end = Infinity;
  let n = s1.length, m = s2.length;
  let memo = Array(n).fill(0).map(() => Array(m).fill(-1)); 
  dp(0, 0);
  return end === Infinity ? "" : s1.slice(start, end);

  function dp(i, j) {
    if (j === m) return i;
    if (i === n) return Infinity;
    if (memo[i][j] !== -1) return memo[i][j];
    
    let ans = Infinity;
    if (s1[i] === s2[j]) ans = Math.min(ans, dp(i + 1, j + 1)); // match s1[i] and s2[j]
    ans = Math.min(ans, dp(i + 1, j)); // skip s1[i]
    
    if (j === 0) { 
      // ans is the smallest end index given the current state
      if (ans - i <= end - start) start = i, end = ans;
    }
    // memo[i][j] records the smallest end index in s1, where s2 becomes fully matched.
    return memo[i][j] = ans;
  }
};

// Two test cases to run function on
console.log(minWindow("abcdebdde", "bde")) // "bcde"
console.log(minWindow("jmeqksfrsdcmsiwvaovztaqenprpvnbstl", "u")) // ""