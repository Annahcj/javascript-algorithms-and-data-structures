// 1935. Maximum Number of Words You Can Type
// Given a string text of words separated by a single space (no leading or trailing spaces) and a string brokenLetters of all distinct letter keys that are broken, return the number of words in text you can fully type using this keyboard.


// Solution: Use Hashmap for brokenLetters

// First split the text by spaces
// Loop through brokenLetters and add each to a hashmap.
// Loop through each word in text
  // Loop through each letter in word, if it contains a broken letter, set valid to false and break out of the loop.
// If the word is valid, increment words.
// Return words.

// Time Complexity: O(n + number of words in text) 80ms
// Space Complexity: O(length of brokenLetters) 39.8MB
var canBeTypedWords = function(text, brokenLetters) {
  let broken = {}, valid = true, words = 0;
  text = text.split(" ");
  for (let i = 0; i < brokenLetters.length; i++) {
    broken[brokenLetters[i]] = 1;
  }
  for (let j = 0; j < text.length; j++) {
    valid = true;
    for (let k = 0; k < text[j].length; k++) {
      if (broken[text[j][k]]) {
        valid = false;
        break;
      }
    }
    if (valid) words++;
  }
  return words;
};

// Two test cases
console.log(canBeTypedWords("hello world", 'ad')) // 1
console.log(canBeTypedWords("leet code", "e")) // 0