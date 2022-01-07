// 72. Edit Distance
// Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.
// You have the following three operations permitted on a word:
    // Insert a character
    // Delete a character
    // Replace a character


// Solution: Recursion w/ Memoization

// base case 1: if we have reached the end of both strings, return 0.
// base case 2: if we have reached the end of word1, return the remaining length of word2 (to add).
// base case 3: if we have reached the end of word2, return the remaining length of word1 (to delete).
// base case 4: if memo already contains [i][j], return memo[i][j].
// otherwise, we have two situations:
  // 1. if word1[i] is equal to word2[j]
    // the best move is to move both forward, with 0 operations required -> recurse(i + 1, j + 1) and store in memo.
  // 2. word1[i] is not equal to word2[j],
    // here, we have three options,
      // Add: recurse(i, j + 1) + 1 (one operation)
      // Delete: recurse(i + 1, j) + 1 (one operation)
      // Replace: recurse(i + 1, j + 1) + 1 (one operation)
    // store the best outcome in memo[i][j]
  // return memo[i][j] for earlier calls.

// Time Complexity: O(nm) 100ms
// Space Complexity: O(nm) 42.9MB
var minDistance = function(word1, word2) {
  let n = word1.length, m = word2.length;
  let memo = Array(n);
  for (var i = 0; i < n; i++) memo[i] = Array(m);
  return recurse(0, 0);
  
  function recurse(i, j) {
    if (i === n && j === m) return 0;
    if (i === n) return m - j;
    if (j === m) return n - i;
    if (memo[i][j] !== undefined) return memo[i][j];
    if (word1[i] === word2[j]) return memo[i][j] = recurse(i + 1, j + 1);
    memo[i][j] = Math.min(recurse(i, j + 1), recurse(i + 1, j), recurse(i + 1, j + 1)) + 1;
    return memo[i][j];
  }  
};

// Three test cases to run function on
console.log(minDistance("", "ab")) // 2
console.log(minDistance("horse", "ros")) // 3
console.log(minDistance("intention", "execution")) // 5