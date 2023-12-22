// 1422. Maximum Score After Splitting a String
// Given a string s of zeros and ones, return the maximum score after splitting the string into two non-empty substrings (i.e. left substring and right substring).
// The score after splitting a string is the number of zeros in the left substring plus the number of ones in the right substring.


// Solution 1: Counting - Two Passes

// Keep a rolling count of zeros on the left and ones on the right.
// Go through each index i as the split point, updating the counts of zeros and ones as we move.
// Record and return the maximum zeros count + ones count.

// Time Complexity: O(n) 60ms
// Space Complexity: O(1) 42.5MB
var maxScore = function(s) {
  let onesRight = 0;
  for (let i = 0; i < s.length; i++) {
    onesRight += s[i] === '1' ? 1 : 0;
  }
  let zerosLeft = 0, maxScore = 0;
  for (let i = 0; i < s.length - 1; i++) {
    zerosLeft += s[i] === '0' ? 1 : 0;
    onesRight -= s[i] === '1' ? 1 : 0;
    maxScore = Math.max(maxScore, zerosLeft + onesRight);
  }
  return maxScore;
};


// Solution 2: Counting - One Pass

// Instead of using two passes, it's possible to achieve this in just one pass.
// At each index i, zeros on the left + ones on the right === zeros on the left + total ones - ones on the left.
// In one pass, record the maximum zeros left + ones left, then add total ones at the end.

// Time Complexity: O(n) 52ms
// Space Complexity: O(1) 42.2MB
var maxScore = function(s) {
  let zerosLeft = 0, onesLeft = 0, maxScore = -Infinity;
  for (let i = 0; i < s.length - 1; i++) {
    zerosLeft += s[i] === '0' ? 1 : 0;
    onesLeft += s[i] === '1' ? 1 : 0;
    maxScore = Math.max(maxScore, zerosLeft - onesLeft);
  }
  onesLeft += s[s.length - 1] === '1' ? 1 : 0;
  return maxScore + onesLeft;
};

// Three test cases
console.log(maxScore("011101")) // 5
console.log(maxScore("00111")) // 5
console.log(maxScore("1111")) // 3