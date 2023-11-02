// 2531. Make Number of Distinct Characters Equal
// You are given two 0-indexed strings word1 and word2.
// A move consists of choosing two indices i and j such that 0 <= i < word1.length and 0 <= j < word2.length and swapping word1[i] with word2[j].
// Return true if it is possible to get the number of distinct characters in word1 and word2 to be equal with exactly one move. Return false otherwise.


// Solution: Try Each Pair of Characters

// 1. Count the occurances of each character in word1 and word2.
// 2. Try each pair of characters (26 * 26).
  // We can figure out the number of distinct characters in word1 and word2 after we swap character i from word1 with character j from word2.
    // New distinct character count in word1:
      // If character j does not exist in word1, +1
      // If character i has only one occurance in word1, -1
    // New distinct character count in word2:
      // If character i does not exist in word2, +1
      // If character j has only one occurance in word2, -1
    // Note: When i and j are equal, we return true if the original distinct character counts are equal.

// n = length of word1, m = length of word2
// Time Complexity: O(n + m + 26*26) 89ms
// Space Complexity: O(1) 47.2MB
var isItPossible = function(word1, word2) {
  let count1 = Array(26).fill(0), distinctCount1 = 0;  
  let count2 = Array(26).fill(0), distinctCount2 = 0;  
  for (let i = 0; i < word1.length; i++) {
    count1[word1.charCodeAt(i) - 97]++;
    if (count1[word1.charCodeAt(i) - 97] === 1) distinctCount1++;
  }
  for (let i = 0; i < word2.length; i++) {
    count2[word2.charCodeAt(i) - 97]++;
    if (count2[word2.charCodeAt(i) - 97] === 1) distinctCount2++;
  }
  
  for (let i = 0; i < 26; i++) {
    for (let j = 0; j < 26; j++) {
      if (count1[i] === 0 || count2[j] === 0) continue;
      if (i === j) {
        if (distinctCount1 === distinctCount2) return true;
        continue;
      }
      let newCount1 = distinctCount1 + (count1[j] === 0 ? 1 : 0) + (count1[i] === 1 ? -1 : 0);
      let newCount2 = distinctCount2 + (count2[i] === 0 ? 1 : 0) + (count2[j] === 1 ? -1 : 0);
      if (newCount1 === newCount2) return true;
    }
  }
  return false;
}; 

// Three test cases
console.log(isItPossible("ac", "b")) // false
console.log(isItPossible("abcc", "aab")) // true
console.log(isItPossible("abcde", "fghij")) // true