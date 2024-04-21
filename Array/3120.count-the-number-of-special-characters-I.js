// 3120. Count the Number of Special Characters I
// You are given a string word. A letter is called special if it appears both in lowercase and uppercase in word.
// Return the number of special letters in word.


// Solution: Boolean Arrays

// Use two boolean arrays hasLowercase and hasUppercase to indicate whether we have seen a lowercase or uppercase occurance of each letter.

// n = length of word
// Time Complexity: O(n) 69ms
// Space Complexity: O(1) 51.7MB
var numberOfSpecialChars = function(word) {
  let hasLowercase = Array(26).fill(false);
  let hasUppercase = Array(26).fill(false);
  for (let char of word) {
    let charcode = char.toLowerCase().charCodeAt() - 97;
    if (char === char.toLowerCase()) {
      hasLowercase[charcode] = true;
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
console.log(numberOfSpecialChars("abBCab")) // 1