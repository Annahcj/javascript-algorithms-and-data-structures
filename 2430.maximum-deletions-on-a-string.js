// 2430. Maximum Deletions on a String
// You are given a string s consisting of only lowercase English letters. In one operation, you can:
  // Delete the entire string s, or
  // Delete the first i letters of s if the first i letters of s are equal to the following i letters in s, for any i in the range 1 <= i <= s.length / 2.
// For example, if s = "ababc", then in one operation, you could delete the first two letters of s to get "abc", since the first two letters of s and the following two letters of s are both equal to "ab".
// Return the maximum number of operations needed to delete all of s.


// Solution: DP w/ LPS

// Use the LPS (longest prefix suffix from the KMP algorithm) to find the lengths of each prefix suffix in O(n) time.
// Check for a valid prefix suffix where the first i letters are equal to the next i letters: lps[j] === (j + 1) / 2

// To need to try every possible for every valid prefix suffix, since we don't know which one will result in more operations.
// Memoize each dp(i), where i = index in s.
  // For each index i, try every possible valid prefix suffix and take the maximum result.

// Time Complexity: O(n^2) 451ms
// Space Complexity: O(n) 129.4MB
var deleteString = function(s) {
  let n = s.length, memo = Array(n).fill(-1);
  return dp(0);

  function dp(i) {
    if (i === n) return 0;
    if (memo[i] !== -1) return memo[i];

    let ans = 1;
    let lps = getLPS(s.slice(i));
    for (let j = 0; j < lps.length; j++) {
      if (lps[j] === (j + 1) / 2) {
        ans = Math.max(ans, dp(lps[j] + i) + 1);
      }
    }
    return memo[i] = ans;
  }
};

function getLPS(str) {
  let n = str.length, lps = Array(n).fill(0);
  let i = 0, j = 1;
  while (j < n) {
    if (str[i] === str[j]) {
      lps[j++] = ++i;
    } else if (i > 0) {
      i = lps[i - 1];
    } else j++;
  }
  return lps;
}

// Three test cases
console.log(deleteString("abcabcdabc")) // 2
console.log(deleteString("aaabaab")) // 4
console.log(deleteString("aaaaa")) // 5