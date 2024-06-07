// 648. Replace Words
// In English, we have a concept called root, which can be followed by some other word to form another longer word - let's call this word successor. For example, when the root "an" is followed by the successor word "other", we can form a new word "another".
// Given a dictionary consisting of many roots and a sentence consisting of words separated by spaces, replace all the successors in the sentence with the root forming it. If a successor can be replaced by more than one root, replace it with the root that has the shortest length.
// Return the sentence after the replacement.


// Solution: Trie

// Store words from the dictionary in a trie.
// For each word in sentence, find the first prefix match in the trie.

// Using a trie is faster than a hashset, because you don't need to build up or create the prefix substring when we try to find the prefix match.
// With a trie, you traverse each matching node, and when we find the first match we can then return the substring, just once.

// n = words in dictionary, m = words in sentence, k = max length of a word
// Time Complexity: O(nk + mk) 85ms
// Space Complexity: O(nk + mk) 69.6MB
var replaceWords = function(dictionary, sentence) {
  let trie = new Trie();
  for (let word of dictionary) {
    trie.add(word);
  }
  let words = sentence.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = trie.firstPrefix(words[i]);
  }
  return words.join(" ");
};

class TrieNode {
  constructor() {
    this.children = {};
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
    }
    node.isWordEnd = true;
  }
  firstPrefix(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      node = node.children;
      if (!node[word[i]]) return word; // no matches - take the whole word
      node = node[word[i]];
      if (node.isWordEnd) return word.slice(0, i + 1);
    }
    return word;
  }
}

// Two test cases
console.log(replaceWords(["cat","bat","rat"], "the cattle was rattled by the battery")) // "the cat was rat by the bat"
console.log(replaceWords(["a","b","c"], "aadsfasf absbs bbab cadsfafs")) // "a a b c"