// 3305. Count of Substrings Containing Every Vowel and K Consonants I
// You are given a string word and a non-negative integer k.
// Return the total number of substrings of word that contain every vowel ('a', 'e', 'i', 'o', and 'u') at least once and exactly k consonants.


// Solution: Brute Force

// Go through every pair of indices.
// Anchor the left index and move up the right index.
// Count the number of consonants and distinct vowels.

// Time Complexity: O(n^2) 109ms
// Space Complexity: O(1) 55.3MB
var countOfSubstrings = function(word, k) {
  let n = word.length, substrings = 0;
  for (let i = 0; i < n; i++) {
    let consonants = 0, distinctVowels = new Set();
    for (let j = i; j < n; j++) {
      if (isVowel(word[j])) {
        distinctVowels.add(word[j]);
      } else {
        consonants++;
      }
      if (distinctVowels.size === 5 && consonants === k) {
        substrings++;
      }
    }
  }
  return substrings;
};

function isVowel(char) {
  return ['a', 'e', 'i', 'o', 'u'].includes(char.toLowerCase());
}

// Three test cases
console.log(countOfSubstrings("aeioqq", 1)) // 0
console.log(countOfSubstrings("aeiou", 0)) // 1
console.log(countOfSubstrings("ieaouqqieaouqq", 1)) // 3