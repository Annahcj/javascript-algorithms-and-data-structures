// 76. Minimum Window Substring
// Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".


// Solution: Sliding Window & Hashmap

// 1. Count the occurances of characters in t, and get the distinct character count in t.
// 2. Maintain a sliding window in s, 
  // Move up the right pointer incrementally.
  // Move up the left pointer while the window contains all characters in t (we want the window to be as small as possible).
  // Update the distinct character count when we have all occurances of a character.

// Record the minimum window length and the indices at that window. 
// At the end, return the substring at those indices.

// m = length of s, n = length of t
// Time Complexity: O(m + n) 85ms
// Space Complexity: O(1) 53.3MB
var minWindow = function(s, t) {
  let chars = {}, distinctChars = 0;
  for (let char of t) {
    chars[char] = (chars[char] || 0) + 1;
    if (chars[char] === 1) distinctChars++;
  }
  let n = s.length, indices = [-Infinity, Infinity];
  for (let j = 0, i = 0; j < n; j++) {
    if (chars[s[j]] !== undefined) chars[s[j]]--;
    if (chars[s[j]] === 0) distinctChars--;
    while (distinctChars === 0) {
      if (chars[s[i]] !== undefined) chars[s[i]]++;
      if (chars[s[i]] === 1) {
        distinctChars++;
        if (j - i < indices[1] - indices[0]) indices = [i, j];
      }
      i++;
    }
  }
  return indices[1] === Infinity ? "" : s.slice(indices[0], indices[1] + 1);
};
  
// Five test cases
console.log(minWindow("abcaba", "aa")) // "aba"
console.log(minWindow("bba", "ab")) // "ba"
console.log(minWindow("ADOBECODEBANC", "ABC")) // "BANC"
console.log(minWindow("a", "a")) // "a"
console.log(minWindow("a", "aa")) // ""