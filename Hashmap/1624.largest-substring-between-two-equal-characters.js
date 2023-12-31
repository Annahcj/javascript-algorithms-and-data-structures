// 1624. Largest Substring Between Two Equal Characters
// Given a string s, return the length of the longest substring between two equal characters, excluding the two characters. If there is no such substring return -1.
// A substring is a contiguous sequence of characters within a string.


// Solution: Hashmap

// Iterate through s, use a hashmap to keep track of the first occurance index for each character.
// Record the maximum i - map.get(s[i]) - 1.

// Time Complexity: O(n) 47ms
// Space Complexity: O(26) = O(1) 43.2MB
var maxLengthBetweenEqualCharacters = function(s) {
  let n = s.length, map = new Map(), maxLen = -1;
  for (let i = 0; i < n; i++) {
    if (map.has(s[i])) {
      maxLen = Math.max(maxLen, i - map.get(s[i]) - 1);
    } else {
      map.set(s[i], i); 
    }
  }
  return maxLen;
};

// Three test cases
console.log(maxLengthBetweenEqualCharacters("aa")) // 0
console.log(maxLengthBetweenEqualCharacters("abca")) // 2
console.log(maxLengthBetweenEqualCharacters("cbzxy")) // -1