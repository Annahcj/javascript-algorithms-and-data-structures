// 1832. Check if the Sentence Is Pangram
// A pangram is a sentence where every letter of the English alphabet appears at least once.
// Given a string sentence containing only lowercase English letters, return true if sentence is a pangram, or false otherwise.


// Solution 1: Array

// Since an array of size 26 to keep track of which characters exist.
// Mark each character in sentence as seen, and return false if any of the 26 characters don't exist.

// Time Complexity: O(n) 115ms
// Space Complexity: O(26) = O(1) 44.2MB
var checkIfPangram = function(sentence) {
  let hasChar = Array(26).fill(0);
  for (let char of sentence) {
    hasChar[char.charCodeAt() - 97] = 1;
  }
  for (let i = 0; i < 26; i++) {
    if (!hasChar[i]) return false;
  }
  return true;
};

// Solution 2: Bitmask

// Since there are always at most 26 characters, we can use a bitmask to keep track of which characters are present.
// Mark characters that are present with bit 1: mask |= (1 << charcode)
// If the first 26 bits are 1, every character is present.

// Time Complexity: O(n) 99ms
// Space Complexity: O(1) 43.8MB
var checkIfPangram = function(sentence) {
  let mask = 0;
  for (let char of sentence) {
    let charcode = char.charCodeAt() - 97;
    mask |= (1 << charcode);
  }
  return mask === (1 << 26) - 1;
};

// Two test cases
console.log(checkIfPangram("thequickbrownfoxjumpsoverthelazydog")) // true
console.log(checkIfPangram("leetcode")) // false