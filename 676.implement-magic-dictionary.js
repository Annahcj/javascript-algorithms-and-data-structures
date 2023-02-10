// 676. Implement Magic Dictionary
// Design a data structure that is initialized with a list of different words. Provided a string, you should determine if you can change exactly one character in this string to match any word in the data structure.
// Implement the MagicDictionary class:
  // MagicDictionary() Initializes the object.
  // void buildDict(String[] dictionary) Sets the data structure with an array of distinct strings dictionary.
  // bool search(String searchWord) Returns true if you can change exactly one character in searchWord to match any string in the data structure, otherwise returns false.


// Solution: Trie

// Add all the words into a trie.
// search:
  // Search in the trie for a word where all characters are matching except one. 
  // Keep track of a nonEqualChars count: the count of characters in the trie that were not equal with the original characters. This count can't exceed 1.
  // For each character we have two choices:
    // 1. Match the original character.
    // 2. Use a different character path only if nonEqualChars is 0.

// n = number of words in the dictionary, m = max length of a word
// Time Complexity: 154ms
  // buildDict: O(nm)
  // search: O(m^2 * 26) per call
// Space Complexity: O(nm) 51.4MB
var MagicDictionary = function() {
  this.trie = new TrieNode();  
};

MagicDictionary.prototype.buildDict = function(dictionary) {
  for (let word of dictionary) {
    let node = this.trie;
    for (let char of word) {
      node = node.children;
      if (!node[char]) node[char] = new TrieNode();
      node = node[char];
    }
    node.isWordEnd = true;
  }  
};

MagicDictionary.prototype.search = function(searchWord) {
  return hasMatch(searchWord, 0, this.trie, 0);
};

function hasMatch(word, i, node, nonEqualChars) {
  if (i === word.length) {
    return nonEqualChars === 1 && node.isWordEnd;
  }
  node = node.children;
  if (nonEqualChars === 1) {
    if (!node[word[i]]) return false;
    return hasMatch(word, i + 1, node[word[i]], nonEqualChars);
  }
  for (let char in node) {
    if (char === word[i]) {
      if (hasMatch(word, i + 1, node[char], nonEqualChars)) return true;
    } else {
      if (hasMatch(word, i + 1, node[char], nonEqualChars + 1)) return true;
    }
  }
  return false;
}

class TrieNode {
  constructor() {
    this.children = {};
    this.isWordEnd = false;
  }
}

// A few test cases
let magicDictionary = new MagicDictionary();
magicDictionary.buildDict(["hello", "leetcode"]);
console.log(magicDictionary.search("hello")); // false
console.log(magicDictionary.search("hhllo")); // true
console.log(magicDictionary.search("hell")); // false
console.log(magicDictionary.search("leetcoded")); // false