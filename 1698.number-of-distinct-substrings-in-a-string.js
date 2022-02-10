// 1698. Number of Distinct Substrings in a String
// Given a string s, return the number of distinct substrings of s.
// A substring of a string is obtained by deleting any number of characters (possibly zero) from the front of the string and any number (possibly zero) from the back of the string.


// Solution: Trie

// For each substring starting at index i, insert each character into the trie.
// If any character's node doesn't exist in the trie yet, increase the count of distinct substrings by 1.

// Time Complexity: O(n^2) 1640ms
// Space Complexity: O(n^2) (worst case) 94.1MB
var countDistinct = function(s) {
  let trie = new TrieNode(), ans = 0, n = s.length;
  for (let i = 0; i < n; i++) {
    let node = trie;
    for (let j = i; j < n; j++) {
      let charCode = s.charCodeAt(j) - 97;
      node = node.children;
      if (!node[charCode]) {
        ans++;
        node[charCode] = new TrieNode();
      }
      node = node[charCode];
    }
  }
  return ans;
};

class TrieNode {
  constructor() {
    this.children = Array(26);
  }
}

// Two test cases to run function on
console.log(countDistinct("aabbaba")) // 21
console.log(countDistinct("abcdefg")) // 28