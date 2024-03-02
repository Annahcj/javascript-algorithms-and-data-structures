// 3039. Apply Operations to Make String Empty
// You are given a string s.
// Consider performing the following operation until s becomes empty:
  // For every alphabet character from 'a' to 'z', remove the first occurrence of that character in s (if it exists).
// For example, let initially s = "aabcbbca". We do the following operations:
  // Remove the underlined characters s = "aabcbbca". The resulting string is s = "abbca".
  // Remove the underlined characters s = "abbca". The resulting string is s = "ba".
  // Remove the underlined characters s = "ba". The resulting string is s = "".
// Return the value of the string s right before applying the last operation. In the example above, answer is "ba".


// Solution: Counting

// Find the characters with the maximum occurance in s, we those will be the characters leftover before the last removal.

// 1. Count the occurances of each character in s and record the max occurance count.
// 2. Go through s from right to left and build the final string of characters with the max occurance.

// Note: The final string will never exceed length 26.

// Time Complexity: O(n) 111ms
// Space Complexity: O(1) 60.6MB
var lastNonEmptyString = function(s) {
  let n = s.length, count = Array(26).fill(0);
  let maxCount = 0;
  for (let i = 0; i < n; i++) {
    count[s.charCodeAt(i) - 97]++;
    maxCount = Math.max(maxCount, count[s.charCodeAt(i) - 97]);
  }
  let res = "";
  for (let i = n - 1; i >= 0; i--) {
    if (count[s.charCodeAt(i) - 97] === maxCount) {
      res = s[i] + res;
      count[s.charCodeAt(i) - 97] = 0; // reset to 0 to avoid appending the same character again
    }
  }
  return res;
};

// Two test cases
console.log(lastNonEmptyString("aabcbbca")) // "ba"
console.log(lastNonEmptyString("abcd")) // "abcd"