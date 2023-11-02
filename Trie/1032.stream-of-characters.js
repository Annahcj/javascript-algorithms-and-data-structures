// 1032. Stream of Characters
// Design an algorithm that accepts a stream of characters and checks if a suffix of these characters is a string of a given array of strings words.
// For example, if words = ["abc", "xyz"] and the stream added the four characters (one by one) 'a', 'x', 'y', and 'z', your algorithm should detect that the suffix "xyz" of the characters "axyz" matches "xyz" from words.
// Implement the StreamChecker class:
  // StreamChecker(String[] words) Initializes the object with the strings array words.
  // boolean query(char letter) Accepts a new character from the stream and returns true if any non-empty suffix from the stream forms a word that  is in words.


// Solution: Reversed Trie

// Store the words in a reversed manner.
// e.g: words -> ["abc", "de"]
// trie: c  e
//       |  |
//       b  d
//       |
//       a

// For each query, loop through the word backwards and try to find a word in the trie which is a suffix of it.

// Runtime on LeetCode: 572ms
// Memory Usage on LeetCode: 69.2MB

// n = number of words, m = number of letters in a word
// Time Complexity: O(nm)
// Space Complexity: O(nm)
var StreamChecker = function(words) {
  this.trie = new Trie();
  this.queryWord = "";
  for (var word of words) {
    this.trie.insertWord(word);
  }  
};

// Time Complexity: O(m)
// Space Complexity: O(m)
StreamChecker.prototype.query = function(letter) {
  this.queryWord += letter;
  return this.trie.hasSuffix(this.queryWord);  
};

class TrieNode {
  constructor() {
    this.children = {};
    this.wordEnd = false;
  }
}
class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  insertWord(word) { // inserts word into trie in reverse order
    let node = this.root;
    for (var i = word.length - 1; i >= 0; i--) {
      let char = word[i];
      node = node.children;
      if (!node[char]) node[char] = new TrieNode();
      node = node[char];
    }
    node.wordEnd = true;
  }
  hasSuffix(word) { // checks whether trie contains a suffix of word
    let node = this.root;
    for (var i = word.length - 1; i >= 0; i--) {
      let char = word[i];
      node = node.children;
      if (!node[char]) return false;
      node = node[char];
      if (node.wordEnd) return true;
    }
    return false;
  }
}

// A few test cases
let streamChecker = new StreamChecker(["cd", "f", "kl"]);
console.log(streamChecker.query("a")); // return False
console.log(streamChecker.query("b")); // return False
console.log(streamChecker.query("c")); // return False
console.log(streamChecker.query("d")); // return True, because 'cd' is in the wordlist
console.log(streamChecker.query("e")); // return False
console.log(streamChecker.query("f")); // return True, because 'f' is in the wordlist
console.log(streamChecker.query("g")); // return False
console.log(streamChecker.query("h")); // return False
console.log(streamChecker.query("i")); // return False
console.log(streamChecker.query("j")); // return False
console.log(streamChecker.query("k")); // return False
console.log(streamChecker.query("l")); // return True, because 'kl' is in the wordlist