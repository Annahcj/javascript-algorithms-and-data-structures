// 140. Word Break II
// Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.
// Note that the same word in the dictionary may be reused multiple times in the segmentation.


// Solution: Backtracking & Trie

// Use backtracking to traverse every combination of segmentations.
// For every backtrack(i, words), go through each possible substring starting from index i.
// Store the words from the dictionary in a trie, so that we can early return if the current substring doesn't match any words in the trie.

// n = length of s, m = number of characters from all words in wordDict
// Time Complexity: O(2^n + m) 40ms
// Space Complexity: O(2^n + m) 48.4MB
var wordBreak = function(s, wordDict) {
  let n = s.length, trie = new Trie();
  for (let word of wordDict) {
    trie.add(word);
  }
  let sentences = [];
  backtrack(0, []);
  return sentences;
  
  function backtrack(i, words) {
    if (i === n) {
      sentences.push(words.join(" "));
      return;
    }
    
    let node = trie.root;
    for (let j = i; j < n; j++) {
      node = node.children;
      if (!node[s[j]]) return; // no words in the dictionary match the current substring, so there is no point in continuing
      node = node[s[j]];
      if (node.isWordEnd) {
        words.push(node.word);
        backtrack(j + 1, words);
        words.pop();
      }
    }
  }
};

class TrieNode {
  constructor() {
    this.children = {};
    this.isWordEnd = false;
    this.word = null;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  add(word) {
    let node = this.root;
    for (let char of word) {
      node = node.children;
      if (!node[char]) node[char] = new TrieNode();
      node = node[char];
    }
    node.isWordEnd = true;
    node.word = word;
  }
}

// Three test cases
console.log(wordBreak("catsanddog", ["cat","cats","and","sand","dog"])) // ["cats and dog","cat sand dog"]
console.log(wordBreak("pineapplepenapple", ["apple","pen","applepen","pine","pineapple"])) // ["pine apple pen apple","pineapple pen apple","pine applepen apple"]
console.log(wordBreak("catsandog", ["cats","dog","sand","and","cat"])) // []