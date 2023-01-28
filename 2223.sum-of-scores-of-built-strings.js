// 2223. Sum of Scores of Built Strings
// You are building a string s of length n one character at a time, prepending each new character to the front of the string. The strings are labeled from 1 to n, where the string with length i is labeled si.
  // For example, for s = "abaca", s1 == "a", s2 == "ca", s3 == "aca", etc.
// The score of si is the length of the longest common prefix between si and sn (Note that s == sn).
// Given the final string s, return the sum of the score of every si.


// Solution: Z Algorithm

// Keep track of:
  // left and right indices (the z window)
  // i: the current index (the start of the current suffix)

// 1. If the current index i is NOT inside the window of left and right (i > right),
  // Reset left and right to be i (start a new window).
  // Match the characters: increase right while s[right] === s[right - left].
  // After matching, set z[i] to be right - left.
  // Decrease r by 1 (since we went over by 1).

// 2. If the current index is inside the window, 
  // We can try to use the values already computed in the prefix (if a substring matches a prefix, then we can re-use the z values from the prefix since the characters are the same).
  // a. If z[i - left] + i <= right, then we are completely within the window, so we can re-use the value at z[i - left].
  // b. If we extend outside the window, then we need to match the characters just like in step 1.
    // Reset left to be i.
    // Start matching s[right] === s[right - left].
    // Note: We know that all characters in the remainder of the window (<= r) has been matched, so we start comparing from outside the window to see if we can extend the right pointer.

// Time Complexity: O(n) 111ms
// Space Complexity: O(n) 51.1MB
var sumScores = function(s) {
  let z = zArray(s);
  return s.length + z.reduce((sum, value) => sum + value);
};

function zArray(s) {
  let n = s.length, z = Array(n).fill(0);
  for (let i = 1, left = 0, right = 0; i < n; i++) {
    if (i > right) { // i is outside of window, match characters
      left = right = i;
      while (right < n && s[right] === s[right - left]) {
        right++;
      }
      z[i] = right - left;
      right--;
    } else { // i is inside window
      if (z[i - left] + i <= right) { // can re-use prefix value since i is completely within the window
        z[i] = z[i - left];
      } else { // need to match characters since z[i - left] exceeds the right bound
        left = i;
        while (right < n && s[right] === s[right - left]) {
          right++;
        }
        z[i] = right - left;
        right--;
      }
    }
  }
  return z;
}

// Two test cases
console.log(sumScores("babab")) // 9
console.log(sumScores("azbazbzaz")) // 14