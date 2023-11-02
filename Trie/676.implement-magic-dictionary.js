// 676. Implement Magic Dictionary
// Design a data structure that is initialized with a list of different words. Provided a string, you should determine if you can change exactly one character in this string to match any word in the data structure.
// Implement the MagicDictionary class:
  // MagicDictionary() Initializes the object.
  // void buildDict(String[] dictionary) Sets the data structure with an array of distinct strings dictionary.
  // bool search(String searchWord) Returns true if you can change exactly one character in searchWord to match any string in the data structure, otherwise returns false.


// Solution 1: Trie

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


// Solution 2: Count Edited Strings 

// Keep track of the following:
  // count: hashmap of the count of occurances for each 'xxx_xxx' string.
  // dict: hashset of the original words in the dictionary.

// buildDict:
  // add all words into the hashset.
  // for each word, 
    // go through each character and replace the character with an underscore: e.g: 'xxx_xxx' 
    // add to the count for the edited string.

// search:
  // go through each character in searchWord and replace the character with an underscore: e.g: 'xxx_xxx'
  // return true if either of the following statements are true:
    // 1. The searchWord exists in the dictionary and the count of the edited string > 1 (every word in the dictionary is unique, so if the count is larger than 1 that means we have at least one different word)
    // 2. The searchWord doesn't exist in the dictionary and the count of the edited string > 0.

// n = number of words in the dictionary, m = max length of a word
// Time Complexity: 207ms
  // buildDict: O(n * m^2)
  // search: O(m^2) per call
// Space Complexity: O(n * m^2) 55.6MB
var MagicDictionary = function() {
  this.count = new Map();
  this.dict = new Set();
};

MagicDictionary.prototype.buildDict = function(dictionary) {
  for (let word of dictionary) {
    this.dict.add(word);
    for (let i = 0; i < word.length; i++) {
      let edited = word.slice(0, i) + '_' + word.slice(i + 1);
      this.count.set(edited, (this.count.get(edited) || 0) + 1);
    }
  }
};

MagicDictionary.prototype.search = function(searchWord) {
  let hasSameWord = this.dict.has(searchWord);
  for (let i = 0; i < searchWord.length; i++) {
    let edited = searchWord.slice(0, i) + '_' + searchWord.slice(i + 1);
    if ((hasSameWord && this.count.get(edited) > 1) || (!hasSameWord && this.count.has(edited))) {
      return true;
    } 
  }
  return false;
};

// A few test cases
let magicDictionary = new MagicDictionary();
magicDictionary.buildDict(["hello", "leetcode"]);
console.log(magicDictionary.search("hello")); // false
console.log(magicDictionary.search("hhllo")); // true
console.log(magicDictionary.search("hell")); // false
console.log(magicDictionary.search("leetcoded")); // false