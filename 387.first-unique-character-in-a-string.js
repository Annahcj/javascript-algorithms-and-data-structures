// 387. First Unique Character in a String
// Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.


// Solution: Map Character Frequencies

// Map the frequencies/occurances of each character to a hashmap
// Loop through s (pointer = i)
  // If freqMap[s[i]] is 1, return i.
// If the loop finishes, return -1 (no character is unique)

// Time Complexity: O(n) 122ms
// Space Complexity: O(1) 42.2MB
var firstUniqChar = function(s) {
  let freqMap = {};
  for (var char of s) {
    freqMap[char] = (freqMap[char] || 0) + 1;
  }  
  for (var i = 0; i < s.length; i++) {
    if (freqMap[s[i]] === 1) return i;
  }
  return -1;
};

// Three test cases to run function on
console.log(firstUniqChar("leetcode")) // 0
console.log(firstUniqChar("loveleetcode")) // 2
console.log(firstUniqChar("aabb")) // -1