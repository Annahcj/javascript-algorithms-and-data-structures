// 2370. Longest Ideal Subsequence
// You are given a string s consisting of lowercase letters and an integer k. We call a string t ideal if the following conditions are satisfied:
  // t is a subsequence of the string s.
  // The absolute difference in the alphabet order of every two adjacent letters in t is less than or equal to k.
// Return the length of the longest ideal string.
// A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.
// Note that the alphabet order is not cyclic. For example, the absolute difference in the alphabet order of 'a' and 'z' is 25, not 1.


// Solution: DP

// Populate dp, where dp[i] = longest subsequence ending with character i.
// For each s[i], take the best result of putting it in front of each character j with an absolute difference <= k.

// Time Complexity: O(nk) 156ms
// Space Complexity: O(1) 44.6MB
var longestIdealString = function(s, k) {
  let n = s.length, dp = Array(26).fill(0);
  for (let i = 0; i < n; i++) {
    let charcode = s.charCodeAt(i) - 97, maxLen = 0;
    for (let j = Math.max(0, charcode - k); j <= Math.min(25, charcode + k); j++) {
      maxLen = Math.max(maxLen, dp[j] + 1);
    }
    dp[charcode] = maxLen;
  }
  return Math.max(...dp);
};

// Two test cases
console.log(longestIdealString("acfgbd", 2)) // 4
console.log(longestIdealString("abcd", 3)) // 4