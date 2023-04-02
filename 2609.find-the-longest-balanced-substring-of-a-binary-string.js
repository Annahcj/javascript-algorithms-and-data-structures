// 2609. Find the Longest Balanced Substring of a Binary String
// You are given a binary string s consisting only of zeroes and ones.
// A substring of s is considered balanced if all zeroes are before ones and the number of zeroes is equal to the number of ones inside the substring. Notice that the empty substring is considered a balanced substring.
// Return the length of the longest balanced substring of s.
// A substring is a contiguous sequence of characters within a string.


// Solution: Counting

// Go through s and count the consecutive zeros until we reach a one.
// Then, count how many consecutive ones until we reach the next zero.
// The length of the longest substring is min(consecutive zeros, consecutive ones) * 2.

// Time Complexity: O(n) 86ms
// Space Complexity: O(1) 45.6MB
var findTheLongestBalancedSubstring = function(s) {
  let n = s.length, ans = 0, i = 0;
  while (i < n && s[i] !== '0') i++; // find the first 0
  while (i < n) {
    let zeros = 0, ones = 0;
    while (i < n && s[i] === '0') i++, zeros++;
    while (i < n && s[i] === '1') i++, ones++;
    ans = Math.max(ans, Math.min(zeros, ones) * 2);
  }
  return ans;
};

// Three test cases
console.log(findTheLongestBalancedSubstring("01000111")) // 6
console.log(findTheLongestBalancedSubstring("00111")) // 4
console.log(findTheLongestBalancedSubstring("111")) // 0