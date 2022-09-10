// 1657. Determine if Two Strings Are Close
// Two strings are considered close if you can attain one from the other using the following operations:
  // Operation 1: Swap any two existing characters.
    // For example, abcde -> aecdb
  // Operation 2: Transform every occurrence of one existing character into another existing character, and do the same with the other character.
    // For example, aacabb -> bbcbaa (all a's turn into b's, and all b's turn into a's)
// You can use the operations on either string as many times as necessary.
// Given two strings, word1 and word2, return true if word1 and word2 are close, and false otherwise.


// Solution: Counting

// The strings are close if:
  // 1. They share the same unique characters (regardless of frequency. "aaabc" and "abbcc" have the same characters)
  // 2. They have the same character frequencies (regardless of characters. "aac" and "acc" have the same frequencies)

// Same unique characters: 
  // 1. Count the frequency of each character in word1 and word2.
  // 2. Compare the character counts - if only one count has a frequency > 0, the strings have different characters.

// Same character frequencies:
  // 1. Count the frequency of each character in word1 and word2.
  // 2. Extract each non-zero frequency into an array (freq1 and freq2).
  // 3. Sort freq1 & freq2 and use two pointers to check if the arrays are equal.

// n = length of word1, m = length of word2
// Time Complexity: O(n + m) 115ms
// Space Complexity: O(1) 48.7MB
var closeStrings = function(word1, word2) {
  if (word1.length !== word2.length) return false;
  let count1 = Array(26).fill(0), count2 = Array(26).fill(0);
  for (let i = 0; i < word1.length; i++) {
    count1[word1.charCodeAt(i) - 97]++;
    count2[word2.charCodeAt(i) - 97]++;
  }
  
  let freq1 = [], freq2 = [];
  for (let i = 0; i < 26; i++) {
    if (count1[i] > 0 && count2[i] > 0) {
      freq1.push(count1[i]);
      freq2.push(count2[i]);
    } else if (count1[i] > 0 || count2[i] > 0) { // has different characters
      return false;
    }
  }
  freq1.sort((a, b) => a - b), freq2.sort((a, b) => a - b);
  for (let i = 0; i < freq1.length; i++) {
    if (freq1[i] !== freq2[i]) return false; // different frequencies
  }
  return true;
};

// Three test cases to run function on
console.log(closeStrings("abc", "bca")) // true
console.log(closeStrings("a", "aa")) // false
console.log(closeStrings("cabbba", "abbccc")) // true