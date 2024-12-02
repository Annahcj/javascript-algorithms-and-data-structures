// 1455. Check If a Word Occurs As a Prefix of Any Word in a Sentence
// Given a sentence that consists of some words separated by a single space, and a searchWord, check if searchWord is a prefix of any word in sentence.
// Return the index of the word in sentence (1-indexed) where searchWord is a prefix of this word. If searchWord is a prefix of more than one word, return the index of the first word (minimum index). If there is no such word return -1.
// A prefix of a string s is any leading contiguous substring of s.


// Solution 1: Two Pointers

// Maintain two pointers. 
// The index in sentence is always positioned at the start of every word. 
// Checks the prefix against the searchWord and then fast forwards to the next word.

// Time Complexity: O(n) 0ms
// Space Complexity: O(1) 49MB
var isPrefixOfWord = function(sentence, searchWord) {
  let n = sentence.length, i = 0, words = 1;
  while (i < n) {
    let matches = true;
    for (let j = 0; j < searchWord.length; j++) {
      if (searchWord[j] !== sentence[i]) {
        matches = false;
        break;
      }
      i++;
    }
    if (matches) {
      return words;
    }
    while (i < n && sentence[i] !== ' ') i++;
    i++;
    words++;
  }
  return -1;
};


// Solution 2: Built-in Functions

// n = length of sentence
// Time Complexity: O(n) 0ms
// Space Complexity: O(n) 48.4MB
var isPrefixOfWord = function(sentence, searchWord) {
  let words = sentence.split(" ");
  for (let i = 0; i < words.length; i++) {
    if (words[i].startsWith(searchWord)) {
      return i + 1;
    }
  }
  return -1;
};

// Three test cases
console.log(isPrefixOfWord("i love eating burger", "burg")) // 4
console.log(isPrefixOfWord("this problem is an easy problem", "pro")) // 2
console.log(isPrefixOfWord("i am tired", "you")) // -1