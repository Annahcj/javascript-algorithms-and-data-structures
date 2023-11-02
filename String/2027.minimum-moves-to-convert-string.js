// 2027. Minimum Moves to Convert String
// You are given a string s consisting of n characters which are either 'X' or 'O'.
// A move is defined as selecting three consecutive characters of s and converting them to 'O'. Note that if a move is applied to the character 'O', it will stay the same.
// Return the minimum number of moves required so that all the characters of s are converted to 'O'.


// Solution: Left to Right Scan

// Logic:

//  index   0123456
// For e.g: XXOOXOX

// At index 0: s[0] is X, so we take a window of 3, min = 1
// At index 3: s[3] is O, so we skip it
// At index 4: s[4] is X, so we take a window of 3, min = 2

// index 7 is out of bounds, so we return min, which is 2


// Algorithm:
// Keep a min counter, and a pointer i
// Loop through s while i is smaller than s.length
  // if s[i] is X
    // increment min by one
    // increment i by 3 (we must take a window of 3 at a time)
  // otherwise just increment i by one
// Return min

// Time Complexity: O(n) 72ms
// Space Complexity: O(1) 38.8MB
var minimumMoves = function(s) {
  let min = 0, i = 0;
  while (i < s.length) {
    if (s[i] === 'X') {
      min++,
      i += 3;
    } else {
      i++;
    }
  }
  return min;
};

// Three test cases
console.log(minimumMoves("XXX")) // 1
console.log(minimumMoves("XXOX")) // 2
console.log(minimumMoves("OOOO")) // 0