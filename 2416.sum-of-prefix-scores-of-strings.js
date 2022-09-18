// 2416. Sum of Prefix Scores of Strings
// You are given an array words of size n consisting of non-empty strings.
// We define the score of a string word as the number of strings words[i] such that word is a prefix of words[i].
  // For example, if words = ["a", "ab", "abc", "cab"], then the score of "ab" is 2, since "ab" is a prefix of both "ab" and "abc".
// Return an array answer of size n where answer[i] is the sum of scores of every non-empty prefix of words[i].
// Note that a string is considered as a prefix of itself.


// Solution: Trie

// Store each word in a trie.
// For every node in the trie, keep track of the number of words it is part of.

// Since we stored the count of words on every node, we can calculate the count of every prefix for every word on the fly.

// n = number of words, m = max(words[i].length)
// Time Complexity: O(nm) 1884ms
// Space Complexity: O(26^m) (at worst) 146.1MB
var sumPrefixScores = function(words) {
  let trie = new Trie();
  for (let word of words) {
    trie.add(word);
  } 

  let n = words.length, res = Array(n);
  for (let i = 0; i < words.length; i++) {
    res[i] = trie.getScore(words[i]);
  }
  return res;
};

class TrieNode {
  constructor() {
    this.children = {};
    this.count = 0; 
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
  }
  getScore(word) {
    let node = this.root, score = 0;
    for (let i = 0; i < word.length; i++) {
      node = node.children;
      let char = word[i];
      if (!node[char]) return score;
      node = node[char];
      score += node.count;
    }
    return score;
  }
}

// Two test cases to run function on
console.log(sumPrefixScores(["abc","ab","bc","b"])) // [5,4,3,2]
console.log(sumPrefixScores(["abcd"])) // [4]