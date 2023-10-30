// 2730. Find the Longest Semi-Repetitive Substring
// You are given a 0-indexed string s that consists of digits from 0 to 9.
// A string t is called a semi-repetitive if there is at most one consecutive pair of the same digits inside t. For example, 0010, 002020, 0123, 2002, and 54944 are semi-repetitive while 00101022, and 1101234883 are not.
// Return the length of the longest semi-repetitive substring inside s.
// A substring is a contiguous non-empty sequence of characters within a string.


// Solution: Sliding Window

// Maintain a sliding window of at most one consecutive pair.
// Once we find two consecutive pairs, move the left pointer up until there is only one consecutive pair.

// Time Complexity: O(n) 203ms
// Space Complexity: O(1) 50.7MB
var longestSemiRepetitiveSubstring = function(s) {
  let n = s.length, pairs = 0, ans = 1;
  for (let j = 1, i = 0; j < n; j++) {
    if (s[j] === s[j - 1]) pairs++;
    while (pairs > 1) {
      if (s[i] === s[i + 1]) pairs--;
      i++;
    }
    ans = Math.max(ans, j - i + 1);
  }
  return ans;
};

// Three test cases
console.log(longestSemiRepetitiveSubstring("52233")) // 4
console.log(longestSemiRepetitiveSubstring("5494")) // 4
console.log(longestSemiRepetitiveSubstring("1111111")) // 2