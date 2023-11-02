// 140. Word Break II
// Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.
// Note that the same word in the dictionary may be reused multiple times in the segmentation.


// Solution: Trie w/ DFS

// Use a trie to store all the words.
// Backtrack/dfs over all the possibilities of words.
  // When a word matches, there are two situations:
    // 1. Take the word: add the word to the array, reset the current trie node back to the root.
    // 2. Don't take the word: keep going

// n = length of s, m = length of all words in wordDict
// Time Complexity: O(m + 2^n) 76ms
// Space Complexity: O(m) 38.8MB
var wordBreak = function(s, wordDict) {
  let trie = new Trie(), res = [];
  for (var word of wordDict) {
    trie.addWord(word);
  }
  dfs(trie.root, 0, "", [], 0);
  return res;

  function dfs(node, idx, currWord, words, totalLen) {
    if (idx === s.length && totalLen === s.length) {
      res.push(words.join(" "));
      return;
    }
    node = node.children;
    if (!node[s[idx]]) return;
    node = node[s[idx]];
    currWord += s[idx];

    if (node.isWordEnd) {
      words.push(currWord);
      dfs(trie.root, idx + 1, "", words, totalLen + currWord.length);
      words.pop();
    }

    dfs(node, idx + 1, currWord, words, totalLen);
  }
};

class TrieNode {
  constructor() {
    this.children = {};
    this.isWordEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  addWord(word) {
    let node = this.root;
    for (var char of word) {
      node = node.children;
      if (!node[char]) node[char] = new TrieNode();
      node = node[char];
    }
    node.isWordEnd = true;
  }
}

// Three test cases to run function on
console.log(wordBreak("catsanddog", ["cat","cats","and","sand","dog"])) // ["cats and dog","cat sand dog"]
console.log(wordBreak("pineapplepenapple", ["apple","pen","applepen","pine","pineapple"])) // ["pine apple pen apple","pineapple pen apple","pine applepen apple"]
console.log(wordBreak("catsandog", ["cats","dog","sand","and","cat"])) // []