// 3136.valid-word.js
// 3136. Valid Word
// A word is considered valid if:
  // It contains a minimum of 3 characters.
  // It consists of the digits 0-9, and the uppercase and lowercase English letters. (Not necessary to have all of them.)
  // It includes at least one vowel.
  // It includes at least one consonant.
// You are given a string word.
// Return true if word is valid, otherwise, return false.
// Notes:
  // 'a', 'e', 'i', 'o', 'u', and their uppercases are vowels.
  // A consonant is an English letter that is not a vowel.


// Solution: 

// Time Complexity: O(n) 51ms
// Space Complexity: O(1) 51.7MB
var isValid = function(word) {
  if (word.length < 3) return false;
  let hasVowel = false, hasConsonant = false;
  for (let char of word) {
    if (!isNumberOrLetter(char)) return false;
    if (isNumber(char)) continue;
    if (isVowel(char)) {
      hasVowel = true;
    } else {
      hasConsonant = true;
    }
  }
  return hasVowel && hasConsonant;
};

function isVowel(char) {
  return ['a', 'e', 'i', 'o', 'u'].includes(char.toLowerCase());
}

function isNumberOrLetter(char) {
  return !!char.match(/[0-9a-zA-Z]/);
}

function isNumber(char) {
  return !isNaN(Number(char));
}

// Three test cases
console.log(isValid("234Adas")) // true
console.log(isValid("b3")) // false
console.log(isValid("a3$e")) // false