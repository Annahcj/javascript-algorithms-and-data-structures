// 820. Short Encoding of Words
// A valid encoding of an array of words is any reference string s and array of indices indices such that:
  // words.length == indices.length
  // The reference string s ends with the '#' character.
  // For each index indices[i], the substring of s starting from indices[i] and up to (but not including) the next '#' character is equal to words[i].
// Given an array of words, return the length of the shortest reference string s possible of any valid encoding of words.


// Solution 1: Hashset & Remove Suffixes

// n = words.length, k = words[i].length
// Time Complexity: O(nk^2) 130ms
// Space Complexity: O(nk) 48.6MB
var minimumLengthEncoding = function(words) {
  let wordsSet = new Set(words);
  for (let word of words) {
    for (let i = 1; i < word.length; i++) {
      wordsSet.delete(word.slice(i));
    }
  }
  let res = wordsSet.size;
  for (let word of wordsSet) res += word.length;
  return res;
};

// Solution 2: Trie

// Add each word from end to start into a trie.
// We reverse it because we only care about shared suffixes.

// Then, we need to get all the word lengths of leaf nodes in the trie.
// We can do this by keeping each node in an array and going through them at the end to get only the leaf nodes.

// Time Complexity: O(nk) 160ms
// Space Complexity: O(nk) 80.1MB
var minimumLengthEncoding = function(words) {
  let trie = new TrieNode(), nodes = [];
  words = [...new Set(words)];
  for (let word of words) {
    let node = trie;
    for (let i = word.length - 1; i >= 0; i--) {
      node.isLeaf = false;
      node = node.children;
      let charcode = word.charCodeAt(i) - 97;
      if (!node[charcode]) node[charcode] = new TrieNode();
      node = node[charcode];
    }
    nodes.push([node, word.length]);
  }
  
  let res = 0;
  for (let [node, wordLen] of nodes) {
    if (node.isLeaf) res += wordLen + 1;
  }
  return res;
};

class TrieNode {
  constructor() {
    this.children = Array(26);
    this.isLeaf = true;
  }
}

// Two test cases 
console.log(minimumLengthEncoding(["time","me","bell"])) // 10
console.log(minimumLengthEncoding(["t"])) // 2