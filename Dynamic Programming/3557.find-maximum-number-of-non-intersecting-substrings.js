// 3557. Find Maximum Number of Non Intersecting Substrings
// You are given a string word.
// Return the maximum number of non-intersecting substrings of word that are at least four characters long and start and end with the same letter.


// Solution: DP

// For each letter, store the running indices of occurrances.
// For each word[i], find the rightmost index j which is at least four characters apart, 
// and set dp[i] = dp[j - 1] + 1. 

// n = length of word
// Time Complexity: O(n) 70ms
// Space Complexity: O(n) 80MB
function maxSubstrings(word) {
  const n = word.length, indices = Array(26).fill(0).map(() => []);
  const dp = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    const charcode = word.charCodeAt(i) - 97;
    let j = indices[charcode].length - 1;
    while (j >= 0 && i - indices[charcode][j] < 3) j--;
    if (j >= 0) {
      dp[i] = 1 + (indices[charcode][j] === 0 ? 0 : dp[indices[charcode][j] - 1]);
    }
    if (i > 0) {
      dp[i] = Math.max(dp[i], dp[i - 1]);
    }
    indices[charcode].push(i);
  }
  return dp[n - 1];
};

// Two test cases
console.log(maxSubstrings("abcdeafdef")) // 2
console.log(maxSubstrings("bcdaaaab")) // 1