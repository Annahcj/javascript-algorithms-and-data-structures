// 796. Rotate String
// Given two strings s and goal, return true if and only if s can become goal after some number of shifts on s.
// A shift on s consists of moving the leftmost character of s to the rightmost position.
// For example, if s = "abcde", then it will be "bcdea" after one shift.
 

// Solution 1: Brute Force

// Go through every split position and check whether the suffix of s = prefix of goal, and prefix of s = suffix of goal.
// If any split is valid, return true.

// n = length of s
// Time Complexity: O(n^2) 0ms
// Space Compexity: O(1) 48.9MB
var rotateString = function(s, goal) {
  if (s.length !== goal.length) return false;
  let n = s.length;
  for (let i = 0; i < n; i++) {
    if (isValidSplit(i, s, goal)) {
      return true;
    }
  }
  return false;
};

function isValidSplit(startIndex, s, goal) {
  let n = s.length;
  for (let i = 0; i < n - startIndex; i++) {
    if (s[startIndex + i] !== goal[i]) {
      return false;
    }
  }
  for (let i = 0; i < startIndex; i++) {
    if (s[i] !== goal[n - startIndex + i]) {
      return false;
    }
  }
  return true;
}


// Solution 2: Append String

// Append s to itself. This will contain every possible rotation of s.
// If the appended string contains the goal, return true.

// Time Complexity: O(n) 0ms
// Space Complexity: O(n) 48.3MB
var rotateString = function(s, goal) {
  if (s.length !== goal.length) return false;
  return (s + s).includes(goal);
};

// Two test cases
console.log(rotateString("abcde", "cdeab")) // true
console.log(rotateString("abcde", "abced")) // false