// 1002. Find Common Characters
// Given a string array words, return an array of all characters that show up in all strings within the words (including duplicates). You may return the answer in any order.


// Solution: Counting

// Keep track of a global count of each character from a-z.
// For each word, 
  // Count the occurances of each character.
  // Then, compare these counts with the global counts and take the minimum for each character.

// At the end, use the final global counts to build up the array of common characters.

// n = number of words, m = max(words[i].length)
// Time Complexity: O(nm) 59ms
// Space Complexity: O(1) (excluding output) 52.2MB
var commonChars = function(words) {
  let count = Array(26).fill(Infinity);
  for (let word of words) {
    let currCount = Array(26).fill(0);
    for (let char of word) {
      currCount[char.charCodeAt() - 97]++;
    }
    for (let i = 0; i < 26; i++) {
      count[i] = Math.min(count[i], currCount[i]);
    }
  }
  let common = [];
  for (let i = 0; i < 26; i++) {
    for (let j = 0; j < count[i]; j++) {
      common.push(String.fromCharCode(i + 97));
    }
  }
  return common;
};

// Two test cases 
console.log(commonChars(["bella","label","roller"])) // ["e","l","l"]
console.log(commonChars(["cool","lock","cook"])) // ["c","o"]