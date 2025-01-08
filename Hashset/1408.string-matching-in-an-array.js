// 1408. String Matching in an Array
// Given an array of string words, return all strings in words that is a substring of another word. You can return the answer in any order.
// A substring is a contiguous sequence of characters within a string


// Solution: Hashset

// Store all words in a hashset.
// Go through every substring in every word, and return an array of all substrings that exist in the hashset.

// n = length of words, m = max(words[i].length)
// Time Complexity: O(nm^3) 12ms
// Space Complexity: O(nm) 51.09MB
function stringMatching(words) {
  const set = new Set(words), substrs = [];
  for (let word of words) {
    const m = word.length;
    for (let i = 0; i < m; i++) {
      for (let j = i; j < m; j++) {
        const substr = word.slice(i, j + 1);
        if (substr !== word && set.has(substr)) {
          substrs.push(substr);
          set.delete(substr); // to avoid pushing into result array more than once
        }
      }
    }
  }
  return substrs;
};

// Three test cases
console.log(stringMatching(["mass","as","hero","superhero"])) // ["as","hero"]
console.log(stringMatching(["leetcode","et","code"])) // ["et","code"]
console.log(stringMatching(["blue","green","bu"])) // []