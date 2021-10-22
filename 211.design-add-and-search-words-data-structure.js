// 211. Design Add and Search Words Data Structure
// Design a data structure that supports adding new words and finding if a string matches any previously added string.


// Runtime on LeetCode: 228ms
// Memory Usage on LeetCode: 59.2MB

// addWord: (word)
// w = length of word
// Time Complexity: O(w)
  // loop through word and add each character to the trie if it doesn't already contain it.

// search: (word)
// m = size of entire trie
// Time Complexity: O(m) (worst-case)
  // create a helper function 'dfs'
  // dfs: (current node, current index in word)
    // if word[idx] is a '.',
      // loop through all children in curr node, if dfs(child, idx + 1) returns true, return true (we found a valid word)
    // otherwise,
      // if curr node doesn't contain word[idx], return false.
      // else return dfs(currNode[word[idx]], idx + 1) 
    // if nothing was matched, return false.

class TrieNode {
  constructor(char) {
    this.char = char;
    this.children = {};
    this.wordEnd = false;
  }
}

var WordDictionary = function() {
  this.root = new TrieNode(null);  
};

WordDictionary.prototype.addWord = function(word) {
  let node = this.root;
  for (var char of word) {
    node = node.children;
    if (!node[char]) node[char] = new TrieNode(char);
    node = node[char];
  }
  node.wordEnd = true;
};

WordDictionary.prototype.search = function(word) {
  return dfs(this.root, 0);
  function dfs(node, idx) {
    if (idx === word.length) return node.wordEnd;
    if (word[idx] === '.') {
      for (var key in node.children) {
        if (dfs(node.children[key], idx + 1)) return true;
      }
    } else {
      if (!node.children[word[idx]]) return false;
      return dfs(node.children[word[idx]], idx + 1);
    }
    return false;
  }
};

// A few test cases 
let wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
console.log(wordDictionary.search("pad")); // return False
console.log(wordDictionary.search("bad")); // return True
console.log(wordDictionary.search(".ad")); // return True
console.log(wordDictionary.search("b..")); // return True