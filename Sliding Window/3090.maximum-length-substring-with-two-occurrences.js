// 3090. Maximum Length Substring With Two Occurrences
// Given a string s, return the maximum length of a substring such that it contains at most two occurrences of each character.


// Solution: Sliding Window

// Maintain a sliding window where no character has more than 2 occurances.
// Keep track of the count of characters in the window.
// If a count exceeds 2, move the left pointer up until the count is no longer exceeding 2.
// Record and return the maximum window length.

// Time Complexity: O(n) 68ms
// Space Complexity: O(1) 51MB
var maximumLengthSubstring = function(s) {
  let n = s.length, count = Array(26).fill(0), ans = 0;
  for (let j = 0, i = 0; j < n; j++) {
    count[s.charCodeAt(j) - 97]++;
    while (count[s.charCodeAt(j) - 97] > 2) {
      count[s.charCodeAt(i) - 97]--;
      i++;
    }
    ans = Math.max(ans, j - i + 1);
  }
  return ans;
};

// Two test cases
console.log(maximumLengthSubstring("bcbbbcba")) // 4
console.log(maximumLengthSubstring("aaaa")) // 2