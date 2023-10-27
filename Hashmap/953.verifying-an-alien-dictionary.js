// 953. Verifying an Alien Dictionary
// Given a sequence of words written in the alien language, and the order of the alphabet, return true if and only if the given words are sorted lexicographicaly in this alien language.


// Solution: Compare Two Words at a Time

// Traverse order and save each letter in a map with its value from 1 to 26 incrementally.

// (helper function) isSmaller: given two words, find which is lexographically bigger
  // Loop through word1. We can use the pointer i for both words.
    // If word1[i] is not equal to word2[i]
      // If the value of word1[i] in alpha is smaller than word2[i] in alpha, return true (word1 is lexographically smaller, so the order is correct)
      // Otherwise if it's bigger, return false (word2 is lexographically bigger)
  // If the loop finishes, the two strings must be the exact same up to the length of word1, so we compare the lengths.
  // If the length of word1 is bigger than the length of word2, we return false, otherwise we return true;

// Traverse words until length of words - 1.
  // call isSmaller on words[i] and words[i + 1]
  // if isSmaller returns false, return false.
// If we got to the end, return true.

// Time Complexity: O(m) (m = total number of characters in words) 68ms
// Space Complexity: O(1) (object which stores alphabet keys will always be length of 26) 40.6MB
var isAlienSorted = function(words, order) {
  let alpha = {};
  for (let i = 0; i < order.length; i++) alpha[order[i]] = (alpha[order[i - 1]] || 0) + 1;

  const isSmaller = (word1, word2) => {
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] !== word2[i]) {
        if (alpha[word1[i]] < alpha[word2[i]]) return true;
        else if (alpha[word1[i]] > alpha[word2[i]]) return false;
      }
    }
    if (word1.length > word2.length) return false;
    return true;
  }
  
  for (let j = 0; j < words.length - 1; j++) {
    if (!isSmaller(words[j], words[j + 1])) return false;
  }
  return true;
};

// Four test cases 
console.log(isAlienSorted(["hello","hello"], "abcdefghijklmnopqrstuvwxyz")) // true
console.log(isAlienSorted(["hello","leetcode"], "hlabcdefgijkmnopqrstuvwxyz")) // true
console.log(isAlienSorted(["word","world","row"], "worldabcefghijkmnpqstuvxyz")) // false
console.log(isAlienSorted(["apple","app"], "abcdefghijklmnopqrstuvwxyz")) // false