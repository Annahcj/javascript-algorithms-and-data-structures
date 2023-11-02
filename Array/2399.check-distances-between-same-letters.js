// 2399. Check Distances Between Same Letters
// You are given a 0-indexed string s consisting of only lowercase English letters, where each letter in s appears exactly twice. You are also given a 0-indexed integer array distance of length 26.
// Each letter in the alphabet is numbered from 0 to 25 (i.e. 'a' -> 0, 'b' -> 1, 'c' -> 2, ... , 'z' -> 25).
// In a well-spaced string, the number of letters between the two occurrences of the ith letter is distance[i]. If the ith letter does not appear in s, then distance[i] can be ignored.
// Return true if s is a well-spaced string, otherwise return false.


// Solution: Track Index of First Occurance

// Track the index of the first occurance of each character in s.
// Use an array of length 26 to store the indices.
// If the distance between two characters is not equal to distance[character], return false.

// Time Complexity: O(n) 108ms
// Space Complexity: O(1) 42.4MB
var checkDistances = function(s, distance) {
  let firstIndex = Array(26).fill(-1);
  for (let i = 0; i < s.length; i++) {
    let charcode = s.charCodeAt(i) - 97;
    if (firstIndex[charcode] === -1) {
      firstIndex[charcode] = i;
      continue;
    }
    if (distance[charcode] !== i - firstIndex[charcode] - 1) return false;
  }
  return true;
};

// Two test cases
console.log(checkDistances("abaccb", [1,3,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])) // true
console.log(checkDistances("aa", [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])) // false