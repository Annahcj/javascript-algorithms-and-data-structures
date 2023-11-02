// 745. Prefix and Suffix Search
// Design a special dictionary with some words that searchs the words in it by a prefix and a suffix.
// Implement the WordFilter class:
  // WordFilter(string[] words) Initializes the object with the words in the dictionary.
  // f(string prefix, string suffix) Returns the index of the word in the dictionary, which has the prefix prefix and the suffix suffix. If there is more than one valid index, return the largest of them. If there is no such word in the dictionary, return -1.


// Solution: Trie

// Since word.length <= 10, we can insert each possible suffix-prefix combination of each word into the trie.
// Then, we just look for suffix#prefix.

// Each node in the trie keeps track of the largest index of a word that matches it.
// Update the word index each time we insert a word.
// Since we are inserting in left-to-right order, the index will always be the largest.

// n = words.length, m = length of longest word
// Time Complexity: 
  // initial: O(nm^2)
  // f: O(prefix.length + suffix.length)
// Space Complexity: O(nm^2)
var WordFilter = function(words) {
  this.trie = new Trie();
  for (var i = 0; i < words.length; i++) {
    let word = words[i];
    for (var j = 0; j < word.length; j++) {
      // suffix#word
      let suffix = word.slice(j);
      this.trie.addWord(suffix + '#' + word, i);
    }
  }
};

WordFilter.prototype.f = function(prefix, suffix) {
  // look for suffix#prefix
  return this.trie.startsWith(suffix + '#' + prefix);
};

class TrieNode {
  constructor() {
    this.children = {};
    this.idx = -1;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  addWord(word, idx) {
    let node = this.root;
    for (var char of word) {
      node = node.children;
      if (!node[char]) node[char] = new TrieNode();
      node[char].idx = idx; 
      node = node[char];
    }
    node.idx = idx;
  }
  startsWith(word) {
    let node = this.root;
    for (var char of word) {
      node = node.children;
      if (!node[char]) return -1;
      node = node[char];
    }
    return node.idx;
  }
}

// A test case
let wordFilter = new WordFilter(["apple"]);
console.log(wordFilter.f("a", "e")); // return 0, because the word at index 0 has prefix = "a" and suffix = 'e".