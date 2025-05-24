// 2942. Find Words Containing Character
// You are given a 0-indexed array of strings words and a character x.
// Return an array of indices representing the words that contain the character x.
// Note that the returned array may be in any order.


// Solution: Enumeration

// Iterate through each word, then iterate through each character in the word and break if x is found.
// Collect the indices of words where x exists.

// n = number of words, m = words[i].length
// Time Complexity: O(nm) 3ms
// Space Complexity: O(1) 57MB
function findWordsContaining(words, x) {
  const indices = [];
  for (let i = 0; i < words.length; i++) {
    for (let char of words[i]) {
      if (char === x) {
        indices.push(i);
        break;
      }
    }
  }
  return indices;
};