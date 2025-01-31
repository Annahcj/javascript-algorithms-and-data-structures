// 3291. Minimum Number of Valid Strings to Form Target I
// You are given an array of strings words and a string target.
// A string x is called valid if x is a prefix of any string in words.
// Return the minimum number of valid strings that can be concatenated to form target. If it is not possible to form target, return -1.


// Solution: DP & Trie

// We can use a trie to efficiently check if a word is a prefix of any words[i]. 
// The main time saving comes from breaking early if there are no words matching the current prefix.

// Populate every dp[i] from n-1 to 0, where dp[i] = minimum valid strings for the suffix from index i to n-1.
// For every index i, iterate through the trie starting from target[i] until there are no prefix matches.
// dp[i] = min(dp[i], 1 + dp[j + 1]).

// m = length of words, k = max(words[i].length), n = length of target
// Time Complexity: O(mk + nk) 1439ms
// Space Complexity: O(mk) 68.14MB
function minValidStrings(words, target) {
  const trie = new Trie(words);
  const n = target.length, dp = Array(n + 1).fill(Infinity);
  dp[n] = 0;
  for (let i = n - 1; i >= 0; i--) {
    let node = trie.root;
    for (let j = i; j < n; j++) {
      node = node.children;
      if (!node[target[j]]) break;
      node = node[target[j]];
      dp[i] = Math.min(dp[i], 1 + dp[j + 1]);
    }
  }
  return dp[0] !== Infinity ? dp[0] : -1;
};

class TrieNode {
  constructor() {
    this.children = {};
    this.count = 0; 
  }
}

class Trie {
  constructor(words) {
    this.root = new TrieNode();
    for (let word of words) {
      this.add(word);
    }
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
  }
}

// Two test cases
console.log(minValidStrings(["abc","aaaaa","bcdef"], "aabcdabc")) // 3
console.log(minValidStrings(["abababab","ab"], "ababaababa")) // 2