// 1408. String Matching in an Array
// Given an array of string words, return all strings in words that is a substring of another word. You can return the answer in any order.
// A substring is a contiguous sequence of characters within a string


// Solution: Trie

// Add all words to a trie, and store a flag on every node to indicate whether it's the end of a word.
// For every word, go through every index as the start index and traverse through the trie until there is no match.
// For any node that is the end of a word, add it to the result array.
// A trie is efficient as we break early if a prefix has no matches.

// n = length of words, m = max(words[i].length)
// Time Complexity: O(nm^2) 15ms
// Space Complexity: O(nm) 53.67MB
function stringMatching(words) {
  const trie = new TrieNode(), n = words.length;
  for (let i = 0; i < n; i++) {
    let node = trie;
    for (let char of words[i]) {
      node = node.children;
      if (!node[char]) node[char] = new TrieNode();
      node = node[char];
    }
    node.isWordEnd = true;
    node.wordIndex = i;
  }

  const substrs = new Set();
  for (let word of words) {
    const m = word.length;
    for (let i = 0; i < m; i++) {
      let node = trie;
      for (let j = i; j < m; j++) {
        if (i === 0 && j === m - 1) break; // don't match word against itself
        node = node.children;
        if (!node[word[j]]) break;
        node = node[word[j]];

        if (node.isWordEnd) {
          substrs.add(words[node.wordIndex]);
        }
      }
    }
  }
  return [...substrs];
};

class TrieNode {
  constructor() {
    this.children = {};
    this.isWordEnd = false;
    this.wordIndex = null;
  }
}

// Three test cases
console.log(stringMatching(["mass","as","hero","superhero"])) // ["as","hero"]
console.log(stringMatching(["leetcode","et","code"])) // ["et","code"]
console.log(stringMatching(["blue","green","bu"])) // []