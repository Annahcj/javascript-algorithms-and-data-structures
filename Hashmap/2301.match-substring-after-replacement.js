// 2301. Match Substring After Replacement
// You are given two strings s and sub. You are also given a 2D character array mappings where mappings[i] = [old[i], new[i]] indicates that you may perform the following operation any number of times:
  // Replace a character old[i] of sub with new[i].
// Each character in sub cannot be replaced more than once.
// Return true if it is possible to make sub a substring of s by replacing zero or more characters according to mappings. Otherwise, return false.
// A substring is a contiguous non-empty sequence of characters within a string.


// Solution: Brute Force

// Use a hashmap of hashsets for quick lookup on character mappings.
// Iterate through every starting index in s, and try to match with sub using the mappings.

// n = length of s, m = length of sub, k = length of mappings
// Time Complexity: O(nm + k) 373ms
// Space Complexity: O(k) 60MB
function matchReplacement(s, sub, mappings) {
  const map = {};
  for (let [a, b] of mappings) {
    if (!map[a]) map[a] = new Set();
    map[a].add(b);
  }
  const n = s.length, m = sub.length;
  for (let i = 0; i <= n - m; i++) {
    let hasMatch = true;
    for (let j = 0; j < m; j++) {
      if (s[i + j] !== sub[j] && !map[sub[j]]?.has(s[i + j])) {
        hasMatch = false;
        break;
      }
    }
    if (hasMatch) return true;
  }
  return false;
};

// Two test cases
console.log(matchReplacement("fool3e7bar", "leet", [["e","3"],["t","7"],["t","8"]])) // true
console.log(matchReplacement("fooleetbar", "f00l", [["o","0"]])) // false