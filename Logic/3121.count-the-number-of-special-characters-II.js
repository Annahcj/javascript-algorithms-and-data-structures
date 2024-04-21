// 3121. Count the Number of Special Characters II
// You are given a string word. A letter c is called special if it appears both in lowercase and uppercase in word, and every lowercase occurrence of c appears before the first uppercase occurrence of c.
// Return the number of special letters in word.

 
// Solution: Logic

// Use two boolean arrays of length 26 to keep track of whether we have seen a lowercase or uppercase occurance of a letter.
// If we receive a lowercase letter AFTER an uppercase occurance, mark lowercase as false (not seen).
// If we receive an uppercase letter, mark it as seen.
// At the end, return all characters which have both lowercase and uppercase marked as seen.

// n = length of words
// Time Complexity: O(n) 124ms
// Space Complexity: O(1) 61MB
var numberOfSpecialChars = function(word) {
  let hasLowercase = Array(26).fill(false);
  let hasUppercase = Array(26).fill(false);
  for (let char of word) {
    let charcode = char.toLowerCase().charCodeAt() - 97;
    if (char === char.toLowerCase()) {
      // if lowercase comes after an uppercase, it's not a special letter.
      hasLowercase[charcode] = hasUppercase[charcode] === false;
    } else {
      hasUppercase[charcode] = true;
    }
  }
  let count = 0;
  for (let i = 0; i < 26; i++) {
    if (hasLowercase[i] && hasUppercase[i]) {
      count++;
    }
  }
  return count;
};

// Three test cases
console.log(numberOfSpecialChars("aaAbcBC")) // 3
console.log(numberOfSpecialChars("abc")) // 0
console.log(numberOfSpecialChars("AbBCab")) // 0