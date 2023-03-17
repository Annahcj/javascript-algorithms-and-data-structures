// 648. Replace Words
// In English, we have a concept called root, which can be followed by some other word to form another longer word - let's call this word successor. For example, when the root "an" is followed by the successor word "other", we can form a new word "another".
// Given a dictionary consisting of many roots and a sentence consisting of words separated by spaces, replace all the successors in the sentence with the root forming it. If a successor can be replaced by more than one root, replace it with the root that has the shortest length.
// Return the sentence after the replacement.


// Solution: Trie

// Add each dictionary word to a trie.
// For each word in the sentence, find the shortest prefix of the word in the trie.

// n = number of words in dictionary, m = number of words in sentence, k = maximum length of a word
// Time Complexity: O(nk + mk) 505ms
// Space Complexity: O(nk) 109.5MB
var replaceWords = function(dictionary, sentence) {
  let trie = new Trie();
  for (let word of dictionary) trie.add(word);
  let words = sentence.split(" "), res = [];
  for (let word of words) {
    let firstPrefix = trie.firstPrefix(word);
    res.push(firstPrefix);
  }
  return res.join(" ");
};

class TrieNode {
  constructor() {
    this.children = {};
    this.isWordEnd = false;
  }
}

class Trie {
  constructor() {
    this.trie = new TrieNode();
  }
  add(word) {
    let node = this.trie;
    for (let char of word) {
      node = node.children;
      if (!node[char]) node[char] = new TrieNode();
      node = node[char];
    }
    node.isWordEnd = true;
  }
  firstPrefix(word) {
    let node = this.trie, prefix = "";
    for (let char of word) {
      prefix += char;
      node = node.children;
      if (!node[char]) node[char] = new TrieNode();
      node = node[char];
      if (node.isWordEnd) return prefix;
    }
    return word;
  }
}

// Two test cases
console.log(replaceWords(["cat","bat","rat"], "the cattle was rattled by the battery")) // "the cat was rat by the bat"
console.log(replaceWords(["a","b","c"], "aadsfasf absbs bbab cadsfafs")) // "a a b c"