// 720. Longest Word in Dictionary
// Given an array of strings words representing an English Dictionary, return the longest word in words that can be built one character at a time by other words in words.
// If there is more than one possible answer, return the longest word with the smallest lexicographical order. If there is no answer, return the empty string.


// Solution: Trie & DFS

// Store every word in a trie.
// Use recursive DFS to find the longest word by trying every valid path.
  // Each node must be a 'wordEnd', because otherwise they are cannot be built incrementally (one character at a time from the first one)

// n = words.length, m = words[i].length
// Time Complexity: O(nm) 104ms
// Space Complexity: O(nm) 51.1MB
var longestWord = function(words) {
  let trie = new Trie();
  for (let word of words) {
    trie.addWord(word);
  }
  return trie.getLongestWord();
};

class TrieNode {
  constructor() {
    this.children = Array(26);
    this.wordEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  addWord(word) {
    let node = this.root;
    for (let char of word) {
      node = node.children;
      
      let charcode = char.charCodeAt() - 97;
      if (!node[charcode]) {
        node[charcode] = new TrieNode();
      }
      node = node[charcode];
    }
    node.wordEnd = true;
  }
  getLongestWord() {
    let res = '', root = this.root;
    dfs(root, []);
    return res;
    
    function dfs(node, chars) {
      if (!node.wordEnd && node !== root) return;
      if ((chars.length > res.length) || (chars.length === res.length && chars.join("") < res)) res = chars.join("");
      for (let i = 0; i < 26; i++) {
        let children = node.children;
        let char = String.fromCharCode(i + 97);
        if (children[i]) {
          chars.push(char);
          dfs(children[i], chars);
          chars.pop();
        }
      }
    }
  }
}

// Two test cases to run function on
console.log(longestWord(["w","wo","wor","worl","world"])) // "world"
console.log(longestWord(["a","banana","app","appl","ap","apply","apple"])) // "apple"