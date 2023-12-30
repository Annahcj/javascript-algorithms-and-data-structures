// 1897. Redistribute Characters to Make All Strings Equal
// You are given an array of strings words (0-indexed).
// In one operation, pick two distinct indices i and j, where words[i] is a non-empty string, and move any character from words[i] to any position in words[j].
// Return true if you can make every string in words equal using any number of operations, and false otherwise.


// Solution: Counting

// Count the occurances of each character across all words.
// Each character count must be divisible by the number of words, in order to redistribute them among the words equally.

// n = number of words, m = words[i].length
// Time Complexity: O(nm) 115ms
// Space Complexity: O(1) 44.2MB
var makeEqual = function(words) {
  let n = words.length;
  let count = Array(26).fill(0);
  for (let word of words) {
    for (let char of word) {
      count[char.charCodeAt() - 97]++;
    }
  }
  for (let i = 0; i < 26; i++) {
    if (count[i] % n !== 0) return false;
  }
  return true;
};

// Two test cases
console.log(makeEqual(["abc","aabc","bc"])) // true
console.log(makeEqual(["ab","a"])) // false