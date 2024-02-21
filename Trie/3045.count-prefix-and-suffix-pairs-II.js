// 3045. Count Prefix and Suffix Pairs II
// You are given a 0-indexed string array words.
// Let's define a boolean function isPrefixAndSuffix that takes two strings, str1 and str2:
// isPrefixAndSuffix(str1, str2) returns true if str1 is both a prefix and a suffix of str2, and false otherwise.
// For example, isPrefixAndSuffix("aba", "ababa") is true because "aba" is a prefix of "ababa" and also a suffix, but isPrefixAndSuffix("abc", "abcd") is false.
// Return an integer denoting the number of index pairs (i, j) such that i < j, and isPrefixAndSuffix(words[i], words[j]) is true.


// Solution: Trie

// For each word, insert each pair of characters (i, word.length - i - 1) into a trie.
// Count the total number of matches in the trie.

// e.g: words = ['abc', 'abcabc']
  // 'abc' ->    'ac' + 'bb' + 'ca'
  // 'abcabc' -> 'ac' + 'bb' + 'ca' + 'ac' + 'bb' + 'ca'
// Notice that the pairs are initially the same between 'abc' and 'abcabc'

// n = number of words, m = max(word[i].length)
// Time Complexity: O(nm) 524ms
// Space Complexity: O(nm) 109.2MB
var countPrefixSuffixPairs = function(words) {
  let trie = new TrieNode(), pairs = 0;
  for (let word of words) {
    let node = trie;
    for (let i = 0; i < word.length; i++) {
      node = node.children;
      let charPair = word[i] + word[word.length - i - 1];
      if (!node[charPair]) node[charPair] = new TrieNode();
      node = node[charPair];
      pairs += node.count;
    }
    node.count++;
  }
  return pairs;
};

class TrieNode {
  constructor() {
    this.children = {};
    this.count = 0; 
  }
}

// Three test cases
console.log(countPrefixSuffixPairs(["a","aba","ababa","aa"])) // 4
console.log(countPrefixSuffixPairs(["pa","papa","ma","mama"])) // 2
console.log(countPrefixSuffixPairs(["abab","ab"])) // 0