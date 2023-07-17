// 2781. Length of the Longest Valid Substring
// You are given a string word and an array of strings forbidden.
// A string is called valid if none of its substrings are present in forbidden.
// Return the length of the longest valid substring of the string word.
// A substring is a contiguous sequence of characters in a string, possibly empty.

 
// Solution: Two Pointers & Trie

// Keep track of two pointers l and r as the left and right pointers of the current valid substring in word.
// Add all the forbidden words into a trie.
// Iterate through each index l from right to left.
// From each index l, 
  // Iterate through the trie while we have matching nodes.
  // Once we find the first forbidden word in the trie, update the right pointer to be i - 1.
// The advantage of using is trie is that we don't have to create a substring for each iteration, resulting in a O(k^2) time complexity. Using a trie will only be O(k) per index l.

// n = length of word, m = length of forbidden, k = max(forbidden[i].length)
// Time Complexity: O(n * k + mk) 1062ms
// Space Complexity: O(mk) 169.5MB
var longestValidSubstring = function(word, forbidden) {
  let n = word.length, trie = new Trie();
  for (let i = 0; i < forbidden.length; i++) {
    trie.add(forbidden[i]);
  }
  let r = n - 1, ans = 0;
  for (let l = n - 1; l >= 0; l--) {
    let node = trie.root, i = l;
    while (node) {
      node = node.children;
      if (!node[word[i]]) break;
      node = node[word[i]];
      if (node.isWordEnd) {
        r = Math.min(r, i - 1);
        break;
      }
      i++;
    }
    ans = Math.max(ans, r - l + 1);
  }
  return ans;
};

class TrieNode {
  constructor() {
    this.children = {};
    this.count = 0; 
    this.isWordEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  add(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      node = node.children;
      let char = word[i];
      if (!node[char]) node[char] = new TrieNode();
      node = node[char];
      node.count++;
    }
    node.isWordEnd = true;
  }
}

// Two test cases
console.log(longestValidSubstring("cbaaaabc", ["aaa","cb"])) // 4
console.log(longestValidSubstring("leetcode", ["de","le","e"])) // 4