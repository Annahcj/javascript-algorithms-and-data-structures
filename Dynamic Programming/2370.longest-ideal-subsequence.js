// 2370. Longest Ideal Subsequence
// You are given a string s consisting of lowercase letters and an integer k. We call a string t ideal if the following conditions are satisfied:
  // t is a subsequence of the string s.
  // The absolute difference in the alphabet order of every two adjacent letters in t is less than or equal to k.
// Return the length of the longest ideal string.
// A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.
// Note that the alphabet order is not cyclic. For example, the absolute difference in the alphabet order of 'a' and 'z' is 25, not 1.


// Solution: DP

// Keep track of the current longest subsequence ending at each lowercase character.
  // maxLen[i] = longest subsequence ending with character i.
// Go through each character in s and take the maximum sequence length ending at a character with absolute difference <= k, +1 for the current character.

// Time Complexity: O(nk) 121ms
// Space Complexity: O(1) 51.5MB
var longestIdealString = function(s, k) {
  let n = s.length, maxLen = Array(26).fill(0);
  for (let i = 0; i < n; i++) {
    let charcode = s.charCodeAt(i) - 97;
    for (let j = charcode; j >= Math.max(0, charcode - k); j--) {
      maxLen[charcode] = Math.max(maxLen[charcode], 1 + maxLen[j]);
    }
    for (let j = charcode + 1; j <= Math.min(25, charcode + k); j++) {
      maxLen[charcode] = Math.max(maxLen[charcode], 1 + maxLen[j]);
    }
  }
  return Math.max(...maxLen);
};

// Two test cases
console.log(longestIdealString("acfgbd", 2)) // 4
console.log(longestIdealString("abcd", 3)) // 4