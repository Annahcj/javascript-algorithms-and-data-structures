// 1446. Consecutive Characters
// The power of the string is the maximum length of a non-empty substring that contains only one unique character.
// Given a string s, return the power of s.


// Solution: Sliding Window

// Count the number of consecutive characters which are equal, save the longest length.
// When a different character is reached, reset the counter.

// Time Complexity: O(n) 76ms
// Space Complexity: O(1) 40.9MB
var maxPower = function(s) {
  let maxLen = 0, currLen = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === 0 || s[i] !== s[i - 1]) {
      currLen = 1;
    } else {
      currLen++;
    }
    maxLen = Math.max(maxLen, currLen);
  }
  return maxLen;
};

// Two test cases
console.log(maxPower("leetcode")) // 2
console.log(maxPower("abbcccddddeeeeedcba")) // 5