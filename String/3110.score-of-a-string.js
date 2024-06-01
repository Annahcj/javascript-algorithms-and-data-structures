// 3110. Score of a String
// You are given a string s. The score of a string is defined as the sum of the absolute difference between the ASCII values of adjacent characters.
// Return the score of s.


// Solution: Compare Adjacent

// For each pair of adjacent characters, add the absolute difference of character codes to our total score.

// Time Complexity: O(n) 41ms
// Space Complexity: O(1) 49.9MB
var scoreOfString = function(s) {
  let n = s.length, score = 0;
  for (let i = 1; i < n; i++) {
    score += Math.abs(s.charCodeAt(i - 1) - s.charCodeAt(i));
  }
  return score;
};