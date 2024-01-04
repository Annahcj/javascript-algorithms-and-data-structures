// 2982. Find Longest Special Substring That Occurs Thrice II 
// You are given a string s that consists of lowercase English letters.
// A string is called special if it is made up of only a single character. For example, the string "abc" is not special, whereas the strings "ddd", "zz", and "f" are special.
// Return the length of the longest special substring of s which occurs at least thrice, or -1 if no special substring occurs at least thrice.
// A substring is a contiguous non-empty sequence of characters within a string.


// Solution: Binary Search

// Binary search for the longest equal substring which occurs at least three times.
// For a length `len`, iterate through s and keep a running count of consectutive equal characters.
// Based on the running count, we can calculate the number of equal substrings of length `len` that we get from it.
// e.g: "aaaaaaaa", len = 3 -> 6 substrings of "aaa"

// Time Complexity: O(n log(n)) 431ms
// Space Complexity: O(1) 52.6MB
var maximumLength = function(s) {
  let n = s.length, low = 0, high = n - 2;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (occursThreeTimes(s, mid)) low = mid;
    else high = mid - 1;
  }
  return low === 0 ? -1 : low;
};

function occursThreeTimes(s, len) {
  let n = s.length, equalSubstrings = Array(26).fill(0), count = 0;
  for (let i = 0; i < n; i++) {
    if (i === 0 || s[i] !== s[i - 1]) count = 1;
    else count++;
    
    if (count >= len) equalSubstrings[s.charCodeAt(i) - 97]++;
    if (equalSubstrings[s.charCodeAt(i) - 97] === 3) return true;
  }
  return false;
}

// Three test cases
console.log(maximumLength("aaaa")) // 2
console.log(maximumLength("abcdef")) // -1
console.log(maximumLength("abcaba")) // 1