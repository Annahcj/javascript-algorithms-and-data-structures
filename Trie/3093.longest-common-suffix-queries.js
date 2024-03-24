// 3093. Longest Common Suffix Queries
// You are given two arrays of strings wordsContainer and wordsQuery.
// For each wordsQuery[i], you need to find a string from wordsContainer that has the longest common suffix with wordsQuery[i]. If there are two or more strings in wordsContainer that share the longest common suffix, find the string that is the smallest in length. If there are two or more such strings that have the same smallest length, find the one that occurred earlier in wordsContainer.
// Return an array of integers ans, where ans[i] is the index of the string in wordsContainer that has the longest common suffix with wordsQuery[i].


// Solution: Trie

// Add each word (right-to-left) from wordsContainer into a trie.
  // Each trie node keeps track of the index of the smallest lengthed word sharing this suffix. 
  // This way, we don't need to traverse the whole trie to find all the words and decide the index.

// For each word query, 
  // Go through each character from right-to-left, and find the longest matching path in the trie.
  // Since each trie node is pre-populated with the index we need, we just use `node.index`.

// n = sum(wordsContainer[i].length), m = sum(wordsQuery[i].length)
// Time Complexity: O(n + m) 866ms
// Space Complexity: O(n) 134.6MB
var stringIndices = function(wordsContainer, wordsQuery) {
  let n = wordsContainer.length, trie = new TrieNode(), defaultIndex = 0;
  for (let i = 0; i < n; i++) {
    let word = wordsContainer[i], node = trie;
    for (let j = word.length - 1; j >= 0; j--) {
      node = node.children;
      let char = word[j];
      if (!node[char]) node[char] = new TrieNode();
      node = node[char];
      
      // pre-populate index of the word
      if (node.index === -1 || node.wordLen > word.length) {
        node.index = i;
        node.wordLen = word.length;
      }
    }
    
    // Find default index - for when a word has no common suffixes
    if (wordsContainer[defaultIndex].length > wordsContainer[i].length) {
      defaultIndex = i;
    }
  }
  trie.index = defaultIndex;
  
  let m = wordsQuery.length, ans = Array(m);
  for (let i = 0; i < m; i++) {
    let node = trie, word = wordsQuery[i];
    for (let j = word.length - 1; j >= 0; j--) {
      let char = word[j];
      if (!node.children[char]) {
        break;
      }
      node = node.children[char];
    }
    ans[i] = node.index;
  }
  return ans;
};

class TrieNode {
  constructor() {
    this.children = {};
    this.index = -1;
    this.wordLen = Infinity;
  }
}

// Two test cases
console.log(stringIndices(["abcd","bcd","xbcd"], ["cd","bcd","xyz"])) // [1,1,1]
console.log(stringIndices(["abcdefgh","poiuygh","ghghgh"], ["gh","acbfgh","acbfegh"])) // [2,0,2]