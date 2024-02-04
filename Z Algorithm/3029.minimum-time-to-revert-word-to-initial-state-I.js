// 3029. Minimum Time to Revert Word to Initial State I
// You are given a 0-indexed string word and an integer k.
// At every second, you must perform the following operations:
  // Remove the first k characters of word.
  // Add any k characters to the end of word.
// Note that you do not necessarily need to add the same characters that you removed. However, you must perform both operations at every second.
// Return the minimum time greater than zero required for word to revert to its initial state.


// Solution: Z Algorithm

// At each operation, when we add any k characters to the end of word, this means later on we can "change" these characters to be anything.
// When adding k characters to the end, imagine word becoming something like "abc***". The part "***" can be anything.

// Keep track of the start index of the covered area ("***" area).
// If the non-covered area matches the prefix, word can be equal to the initial state.

// Use Z algorithm to find the longest string starting from each index that matches the prefix.
// z[i] = length of string starting from index i, matching the prefix

// Time Complexity: O(n) 70ms
// Space Complexity: O(n) 52.8MB
var minimumTimeToInitialState = function(word, k) {
  let n = word.length, z = zArray(word);
  let startIndex = 0, coveredIndex = n, time = 0;
  while (startIndex < n) {
    coveredIndex -= k;
    startIndex += k;
    time++;
    let zIndex = z[startIndex] || 0;
    if (zIndex >= coveredIndex) return time;
  }
  return n;
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

// Three test cases
console.log(minimumTimeToInitialState("abacaba", 3)) // 2
console.log(minimumTimeToInitialState("abacaba", 4)) // 1
console.log(minimumTimeToInitialState("abcbabcd", 2)) // 4