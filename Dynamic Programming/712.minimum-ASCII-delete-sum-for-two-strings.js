// 712. Minimum ASCII Delete Sum for Two Strings
// Given two strings s1 and s2, return the lowest ASCII sum of deleted characters to make two strings equal.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(i, j), where:
  // i = index in s1
  // j = index in s2

// For each dp(i, j), we have two situations:
  // 1. If s1[i] === s2[j], then it is optimal to not remove any characters and move both pointers forward (dp(i + 1, j + 1)).
  // 2. Otherwise, return the minimum result out of two choices:
    // a. Remove s1[i] (s1.charCodeAt(i) + dp(i + 1, j))
    // b. Remove s2[j] (s2.charCodeAt(j) + dp(i, j + 1)))

// n = length of s1, m = length of s2
// Time Complexity: O(nm) 99ms
// Space Complexity: O(nm) 48.2MB
var minimumDeleteSum = function(s1, s2) {
  let n = s1.length, m = s2.length;
  let memo = Array(n).fill(0).map(() => Array(m).fill(-1));
  return dp(0, 0);
  
  function dp(i, j) {
    if (i === n) return calcASCII(s2, j);
    if (j === m) return calcASCII(s1, i);
    if (memo[i][j] !== -1) return memo[i][j];
    
    if (s1[i] === s2[j]) memo[i][j] = dp(i + 1, j + 1);
    else memo[i][j] = Math.min(s1.charCodeAt(i) + dp(i + 1, j), s2.charCodeAt(j) + dp(i, j + 1));
    return memo[i][j];
  }
};

function calcASCII(str, startIndex) {
  let asciiSum = 0;
  for (let i = startIndex; i < str.length; i++) {
    asciiSum += str.charCodeAt(i);
  }
  return asciiSum;
}

// Two test cases
console.log(minimumDeleteSum("sea", "eat")) // 231
console.log(minimumDeleteSum("delete", "leet")) // 403