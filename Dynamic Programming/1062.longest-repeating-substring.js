// 1062. Longest Repeating Substring
// Given a string s, find out the length of the longest repeating substring(s). Return 0 if no repeating substring exists.


// Solution: Dynamic Programming

// This problem is similar to 1143. Longest Common Subsequence,
// except instead of comparing two different strings, we compare s with itself (length - 1)

// Generate a 2d dp array with dimensions n + 1 by n, filled with 0's
// Set ans to 0
// Loop through from n - 1 to 0 (pointer = i) (for the longer part of the string)
  // loop through from i - 1 to 0 (pointer = j) (for the shorter part of the string)
    // if s[i] is equal to s[j]
      // set dp[i][j] to 1 + dp[i + 1][j + 1]
      // update ans if dp[i][j] is bigger than ans
// Return ans

// Time Complexity: O(n^2) 156ms
// Space Complexity: O(n^2) 65.3MB
var longestRepeatingSubstring = function(s) {
  let n = s.length, m = s.length - 1;  
  let dp = Array(n + 1);
  for (let i = 0; i <= n; i++) {
    dp[i] = Array(m + 1).fill(0);
  }
  let ans = 0;
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      if (s[i] === s[j]) {
        dp[i][j] = 1 + dp[i + 1][j + 1];
        ans = Math.max(ans, dp[i][j]);
      } 
    }
  }
  return ans;
};

// Four test cases
console.log(longestRepeatingSubstring("abcd")) // 0
console.log(longestRepeatingSubstring("abbaba")) // 2
console.log(longestRepeatingSubstring("aabcaabdaab")) // 3
console.log(longestRepeatingSubstring("aaaaa")) // 4