// 1684. Count the Number of Consistent Strings
// You are given a string allowed consisting of distinct characters and an array of strings words. A string is consistent if all characters in the string appear in the string allowed.
// Return the number of consistent strings in the array words.

 
// Solution:

// Store the allowed characters in a hashset.
// Count the number of words where every character exists in the allowed hashset.

// n = length of words, m = max(words[i].length)
// Time Complexity: O(nm) 81ms
// Space Complexity: O(1) 57.1MB
function countConsistentStrings(allowed, words) {
  let allowedChars = new Set(allowed.split(""));
  let consistent = 0;
  for (let word of words) {
    let isConsistent = true;
    for (let char of word) {
      if (!allowedChars.has(char)) {
        isConsistent = false;
        break;
      }
    }
    consistent += isConsistent ? 1 : 0;
  }
  return consistent;
};