// 3316. Find Maximum Removals From Source String
// You are given a string source of size n, a string pattern that is a subsequence of source, and a sorted integer array targetIndices that contains distinct numbers in the range [0, n - 1].
// We define an operation as removing a character at an index idx from source such that:
  // idx is an element of targetIndices.
  // pattern remains a subsequence of source after removing the character.
// Performing an operation does not change the indices of the other characters in source. For example, if you remove 'c' from "acb", the character at index 2 would still be 'b'.
// Return the maximum number of operations that can be performed.


// Solution: DP - Recursion w/ Memoization

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

// Four test cases
console.log(maxRemovals("abbaa", "aba", [0,1,2])) // 1
console.log(maxRemovals("bcda", "d", [0,3])) // 2
console.log(maxRemovals("dda", "dda", [0,1,2])) // 0
console.log(maxRemovals("yeyeykyded", "yeyyd", [0,2,3,4])) // 2