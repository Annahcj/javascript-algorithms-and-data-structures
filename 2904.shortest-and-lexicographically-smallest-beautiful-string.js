// 2904. Shortest and Lexicographically Smallest Beautiful String
// You are given a binary string s and a positive integer k.
// A substring of s is beautiful if the number of 1's in it is exactly k.
// Let len be the length of the shortest beautiful substring.
// Return the lexicographically smallest beautiful substring of string s with length equal to len. If s doesn't contain a beautiful substring, return an empty string.
// A string a is lexicographically larger than a string b (of the same length) if in the first position where a and b differ, a has a character strictly larger than the corresponding character in b.
  // For example, "abcd" is lexicographically larger than "abcc" because the first position they differ is at the fourth character, and d is greater than c.


// Solution: Sliding Window & Binary Search

// 1. Binary search for the shortest length of a valid substring, using a sliding window to check whether a length has a valid substring.
// 2. Use a sliding window to find the lexicographically smallest valid substring of length `len`.

// Time Complexity: O(n log(n) + n^2) 56ms
// Space Complexity: O(n) 44.6MB
var shortestBeautifulSubstring = function(s, k) {
  let len = getShortestLen(s, k);
  if (len === -1) return "";
  
  let ones = 0, n = s.length, smallest = "";
  for (let i = 0; i < n; i++) {
    ones += s[i] === '1' ? 1 : 0;
    if (i >= len) {
      ones -= s[i - len] === '1' ? 1 : 0;
    }
    if (ones === k) {
      smallest = getSmaller(s, len, smallest, i - len + 1);
    }
  }
  return smallest;
};

// Compare two substrings and return the smaller one
function getSmaller(s, len, smallest, startIndex) {
  if (smallest === "") return s.slice(startIndex, startIndex + len);
  for (let i = 0; i < len; i++) {
    if (smallest[i] !== s[startIndex + i]) {
      return smallest[i] < s[startIndex + i] ? smallest : s.slice(startIndex, startIndex + len);
    }
  }
  return smallest;
}

// Binary search for the shortest length of a valid substring
function getShortestLen(s, k) {
  let n = s.length;
  let low = k, high = n;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (hasValidSubstring(s, k, mid)) high = mid;
    else low = mid + 1;
  }
  return hasValidSubstring(s, k, low) ? low : -1;
}

// Check whether a certain length has a valid substring
function hasValidSubstring(s, k, len) {
  let ones = 0, n = s.length;
  for (let i = 0; i < n; i++) {
    ones += s[i] === '1' ? 1 : 0;
    if (i >= len) {
      ones -= s[i - len] === '1' ? 1 : 0;
    }
    if (ones === k) return true;
  }
  return false;
}

// Three test cases
console.log(shortestBeautifulSubstring("100011001", 3)) // "11001"
console.log(shortestBeautifulSubstring("1011", 2)) // "11"
console.log(shortestBeautifulSubstring("000", 1)) // ""