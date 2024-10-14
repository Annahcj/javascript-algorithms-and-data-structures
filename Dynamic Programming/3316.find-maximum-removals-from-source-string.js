// 3316. Find Maximum Removals From Source String
// You are given a string source of size n, a string pattern that is a subsequence of source, and a sorted integer array targetIndices that contains distinct numbers in the range [0, n - 1].
// We define an operation as removing a character at an index idx from source such that:
  // idx is an element of targetIndices.
  // pattern remains a subsequence of source after removing the character.
// Performing an operation does not change the indices of the other characters in source. For example, if you remove 'c' from "acb", the character at index 2 would still be 'b'.
// Return the maximum number of operations that can be performed.


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(i, j), where
  // i = index in source
  // j = index in pattern

// For each dp(i, j), we have three choices:
  // 1. If i is a target index, remove it.
  // 2. If source[i] === pattern[j], match it.
  // 3. Skip it.

// Return the maximum number of indices we can remove out of all choices.

// n = length of source, m = length of pattern
// Time Complexity: O(nm) 647ms
// Space Complexity: O(nm) 119.6MB
var maxRemovals = function(source, pattern, targetIndices) {
  let n = source.length, m = pattern.length;
  targetIndices = new Set(targetIndices);
  let memo = Array(n).fill(0).map(() => Array(m + 1).fill(-1));
  return dp(0, 0);
  
  function dp(i, j) {
    if (i === n) return j === m ? 0 : -Infinity;
    if (memo[i][j] !== -1) return memo[i][j];
    
    let ans = dp(i + 1, j) + (targetIndices.has(i) ? 1 : 0); // skip or remove
    if (j < m && source[i] === pattern[j]) {
      ans = Math.max(ans, dp(i + 1, j + 1));
    }
    return memo[i][j] = ans;
  }
};


// Solution 2: Iterative DP - Bottom Up

// Iterative bottom up DP.
// We only need to know the maximum removals for the previous index in source.
// Keep track of the previous and current DP results.

// prev[j] = Maximum removals matching up to j characters in pattern.

// n = length of source, m = length of pattern
// Time Complexity: O(nm) 174ms
// Space Complexity: O(m) 56.2MB
var maxRemovals = function(source, pattern, targetIndices) {
  let n = source.length, m = pattern.length;
  targetIndices = new Set(targetIndices);
  let prev = Array(m + 1).fill(-Infinity);
  prev[0] = 0;
  for (let i = 0; i < n; i++) {
    let curr = Array(m + 1).fill(-Infinity);
    let isTargetIndex = targetIndices.has(i);
    curr[0] = Math.max(curr[0], prev[0] + (isTargetIndex ? 1 : 0));
    for (let j = 0; j < m; j++) {
      curr[j + 1] = Math.max(curr[j + 1], prev[j + 1] + (isTargetIndex ? 1 : 0));
      if (source[i] === pattern[j]) {
        curr[j + 1] = Math.max(curr[j + 1], prev[j]);
      }
    }
    prev = curr;
  }
  return prev[m];
};

// Four test cases
console.log(maxRemovals("abbaa", "aba", [0,1,2])) // 1
console.log(maxRemovals("bcda", "d", [0,3])) // 2
console.log(maxRemovals("dda", "dda", [0,1,2])) // 0
console.log(maxRemovals("yeyeykyded", "yeyyd", [0,2,3,4])) // 2