// 2047. Number of Valid Words in a Sentence
// A sentence consists of lowercase letters ('a' to 'z'), digits ('0' to '9'), hyphens ('-'), punctuation marks ('!', '.', and ','), and spaces (' ') only. Each sentence can be broken down into one or more tokens separated by one or more spaces ' '.
// A token is a valid word if:
// It only contains lowercase letters, hyphens, and/or punctuation (no digits).
// There is at most one hyphen '-'. If present, it should be surrounded by lowercase characters ("a-b" is valid, but "-ab" and "ab-" are not valid).
// There is at most one punctuation mark. If present, it should be at the end of the token.
// Examples of valid words include "a-b.", "afad", "ba-c", "a!", and "!".
// Given a string sentence, return the number of valid words in sentence.


// Solution: Split by Spaces, Filter Words

// Time Complexity: O(n) 115ms
// Space Complexity: O(1) 40.5MB
var countValidWords = function(sentence) {
  let spaceRegex = /\s+/;
  // trim and split by any number of white-spaces
  sentence = sentence.trim().split(spaceRegex);
  let count = 0;
  for (let word of sentence) {
    if (filter(word)) {
      count++;
    }
  }
  return count;

  function filter(word) {
    let hyphens = 0;
    for (let i = 0; i < word.length; i++) {
      let char = word[i];
      // if character is a number, return false.
      if (!isNaN(char)) return false;
      // if character is punctuation, it can only be the last letter in the word.
      else if (char === '!' || char === ',' || char === '.') {
        if (i === word.length - 1) return true;
        return false;
      // if character is a hyphen, count hyphen, return false if not surrounded by lowercase letters.
      } else if (char === '-') {
        hyphens++;
        if (i === 0 || i === word.length - 1) return false;
        if (word.charCodeAt(i - 1) < 97 || word.charCodeAt(i - 1) > 122 || word.charCodeAt(i + 1) < 97 || word.charCodeAt(i + 1) > 122) return false;
      }
    }
    // return false if there was more than one hyphen, otherwise return true.
    return hyphens > 1 ? false : true;
  }  
}; 

// Four test cases
console.log(countValidWords("!g 3 !sy ")) // 0
console.log(countValidWords("cat and  dog")) // 3
console.log(countValidWords("!this  1-s b8d!")) // 0
console.log(countValidWords("alice and  bob are playing stone-game10")) // 5