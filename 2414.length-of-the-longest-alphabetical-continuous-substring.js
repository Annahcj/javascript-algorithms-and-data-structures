// 2414. Length of the Longest Alphabetical Continuous Substring
// An alphabetical continuous string is a string consisting of consecutive letters in the alphabet. In other words, it is any substring of the string "abcdefghijklmnopqrstuvwxyz".
  // For example, "abc" is an alphabetical continuous string, while "acb" and "za" are not.
// Given a string s consisting of lowercase letters only, return the length of the longest alphabetical continuous substring.


// Solution: Compare Adjacent 

// Compare adjacent characters and keep track of the length of the current continuous string.
// Record the maximum length.

// Time Complexity: O(n) 83ms
// Space Complexity: O(1) 46.2MB
var longestContinuousSubstring = function(s) {
  let n = s.length, count = 1, ans = 1;
  for (let i = 1; i < n; i++) {
    let currCharcode = s.charCodeAt(i);
    let prevCharcode = s.charCodeAt(i - 1);
    if (currCharcode - prevCharcode === 1) count++;
    else count = 1;
    ans = Math.max(ans, count);
  }
  return ans;
};

// Two test cases to run function on
console.log(longestContinuousSubstring("abacaba")) // 2
console.log(longestContinuousSubstring("abcde")) // 5