// 1781. Sum of Beauty of All Substrings
// The beauty of a string is the difference in frequencies between the most frequent and least frequent characters.
  // For example, the beauty of "abaacc" is 3 - 1 = 2.
// Given a string s, return the sum of beauty of all of its substrings.


// Solution: Prefix Frequencies 

// From each starting index i, keep a running count of frequencies of characters.
// Since there are only 26 lowercase characters, we can loop through to get the maximum and minimum frequencies for each substring.

// Time Complexity: O(n^2 * 26) 317ms
// Space Complexity: O(1) 44.1MB
var beautySum = function(s) {
  let n = s.length, beauty = 0;
  for (let i = 0; i < n; i++) {
    let count = Array(26).fill(0);
    for (let j = i; j < n; j++) {
      count[s.charCodeAt(j) - 97]++;
      let maxFreq = 0, minFreq = Infinity;
      for (let k = 0; k < 26; k++) {
        if (count[k] > 0) {
          maxFreq = Math.max(maxFreq, count[k]);
          minFreq = Math.min(minFreq, count[k]);
        }
      }
      beauty += maxFreq - minFreq;
    }
  }
  return beauty;
};

// Two test cases
console.log(beautySum("aabcb")) // 5
console.log(beautySum("aabcbaa")) // 17