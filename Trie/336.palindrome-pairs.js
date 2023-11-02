// 336. Palindrome Pairs
// Given a list of unique words, return all the pairs of the distinct indices (i, j) in the given list, so that the concatenation of the two words words[i] + words[j] is a palindrome.


// Solution: Trie

// Trie: store each word in words.
// At the end of each word, mark it as 'isWordEnd' and also store the index of the word.

// Searching for palindrome pairs
// For each word, loop through in reverse order and try to find a matching word in the trie.
// word1 = word in the trie, word2 = current word 

// There are two possible situations:

  // 1. word1 is longer than or equal to word2
    // In this case, each character in word1 should be matched, 
    // so we would try to find each full word from the last matched node onwards.
    // Check if the remaining part of word1 is a palindrome, and if it is, get the index at the end of the word.

  // 2. word2 is longer than word1
    // Each time we come across a wordEnd, check if the front remaining part of word2 is a palindrome,
    // If it is, get the index from word1.

// k = length of longest word, n = words.length
// Time Complexity: O(k^2 * n) 828ms
// inserting words into trie: O(kn)
// finding palindrome pairs: O(k^2) worst case

// Space Complexity: O(kn) (worst case) 130.6MB
var palindromePairs = function(words) {
  let trie = new Trie();
  for (var i = 0; i < words.length; i++) trie.addWord(words[i], i);
  // [match idx, i]
  let res = [];
  for (i = 0; i < words.length; i++) {
    let matches = trie.matches(words[i]);
    for (var idx of matches) {
      if (idx === i) continue;
      res.push([idx, i]);
    }
  }
  return res;
};

class TrieNode {
  constructor() {
    this.children = {};
    this.isWordEnd = false;
    this.idx = null;
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
      node = node[char];
    }
    node.isWordEnd = true;
    node.idx = idx;
  }
  matches(word) {
    let node = this.root, res = [];
    for (var i = word.length - 1; i >= 0; i--) {
      if (node.isWordEnd) { // length of word is longer
        if (isPalindrome(word.slice(0, i + 1))) res.push(node.idx);
      }
      let char = word[i];
      node = node.children;
      if (!node[char]) break;
      node = node[char];
    }
    // word is shorter or equal in length...
    getWords(node, "");
    return res;
    
    function getWords(node, word) {
      if (node.isWordEnd) {
        if (isPalindrome(word)) res.push(node.idx);
      }
      for (var key in node.children) {
        getWords(node.children[key], word + key);
      }
    }
  }
}

function isPalindrome(word) {
  let start = 0, end = word.length - 1;
  while (start < end) {
    if (word[start] !== word[end]) return false;
    start++, end--;
  }
  return true;
}

// Three test cases to run function on
console.log(palindromePairs(["abcd","dcba","lls","s","sssll"])) // [[0,1],[1,0],[3,2],[2,4]]
console.log(palindromePairs(["bat","tab","cat"])) // [[0,1],[1,0]
console.log(palindromePairs(["a",""])) // [[0,1],[1,0]