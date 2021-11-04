// 712. Minimum ASCII Delete Sum for Two Strings
// Given two strings s1 and s2, return the lowest ASCII sum of deleted characters to make two strings equal.


// Solution: Recursion w/ Memoization

// base case 1: i has reached the end of s1 AND j has reached the end of s2 -> return 0.
// base case 2: i has reached the end of s1 -> return the sum of the character codes of s2 from j to the end of s2.
// base case 3: j has reached the end of s2 -> return the sum of the character codes of s1 from i to the end of s1.
// base case 4: memo already contains [i][j] -> return memo[i][j]

// two sitations:   
  // 1. s1[i] equals s2[j] 
    // set memo[i][j] to recurse(i + 1, j + 1) (since they are equal, we don't have to delete any characters)
  // 2. s1[i] is not equal to s2[j]
    // set memo[i][j] to the minimum of two choices,
      // Delete s1[i] -> recurse(i + 1, j) + character code at s1[i]
      // Delete s2[j] -> recurse(i, j + 1) + character code at s2[j]
  // Return memo[i][j] for earlier calls.

// Time Complexity: O(nm) 112ms
// Space Complexity: O(nm) 45MB
var minimumDeleteSum = function(s1, s2) {
  let n = s1.length, m = s2.length;
  let memo = Array(n);
  for (var i = 0; i < n; i++) memo[i] = Array(m);
  return recurse(0, 0);

  function charSum(idx, str) {
    let sum = 0;
    for (var i = idx; i < str.length; i++) sum += str.charCodeAt(i);
    return sum;
  }

  function recurse(i, j) {
    if (i === n && j === m) return 0;
    if (i === n) return charSum(j, s2);
    if (j === m) return charSum(i, s1);
    if (memo[i][j] !== undefined) return memo[i][j];
    if (s1[i] === s2[j]) memo[i][j] = recurse(i + 1, j + 1);
    else memo[i][j] = Math.min(recurse(i + 1, j) + s1.charCodeAt(i), recurse(i, j + 1) + s2.charCodeAt(j));
    return memo[i][j];
  }
};


// Two test cases to run function on
console.log(minimumDeleteSum("sea", "eat")) // 231
console.log(minimumDeleteSum("delete", "leet")) // 403