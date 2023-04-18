// 1768. Merge Strings Alternately
// You are given two strings word1 and word2. Merge the strings by adding letters in alternating order, starting with word1. If a string is longer than the other, append the additional letters onto the end of the merged string.
// Return the merged string.


// Solution: Two Pointers

// Maintain two pointers for word1 and word2.
// Loop while either word1 or word2 has characters left, and append word1[i] and word2[j] to the final string.

// Time Complexity: O(n + m) 51ms
// Space Complexity: O(n + m) 42.8MB
var mergeAlternately = function(word1, word2) {
  let i = 0, j = 0;
  let n = word1.length, m = word2.length;
  let merged = "";
  while (i < n || j < m) {
    if (i < n) merged += word1[i++];
    if (j < m) merged += word2[j++];
  }
  return merged;
};