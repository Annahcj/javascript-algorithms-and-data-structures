// 758. Bold Words in String
// Given an array of keywords words and a string s, make all appearances of all keywords words[i] in s bold. Any letters between <b> and </b> tags become bold.
// Return s after adding the bold tags. The returned string should use the least number of tags possible, and the tags should form a valid combination.


// Solution 1: Brute Force

// Check all words from each position in s.
// Use an array 'bold' to keep track of which characters need to be bold.

// n = s.length, m = words.length
// Time Complexity: O(n * m * n) 80ms
// Space Complexity: O(n) 45MB
var boldWords = function(words, s) {
  let n = s.length, bold = Array(n).fill(0);
  for (var i = 0; i < n; i++) {
    for (var word of words) {
      let str = s.slice(i, i + word.length); // substring starting from i, same length as word
      if (str !== word) continue; 
      for (var j = i; j < i + word.length; j++) bold[j] = 1; // substring matches word, mark each character as 'bold'
    }
  }  
  let res = "";
  for (i = 0; i < n; i++) { // build final string
    if (bold[i] === 0) res += s[i];
    else {
      let start = i;
      while (i < n - 1 && bold[i + 1] === 1) i++;
      res += `<b>${s.slice(start, i + 1)}</b>`;
    }
  }
  return res;
};


// Solution 2: Trie

// Use a trie to keep all the words.
// From each position in s, match the longest word possible starting from i. Mark all the characters of the matching words as 'bold'.

// Time Complexity: O(n^2) 129ms
// Space Complexity: O(n + m) 42.9MB
var boldWords = function(words, s) {
  let trie = new Trie();
  for (var word of words) {
    trie.addWord(word);
  }
  
  let n = s.length, bold = Array(n).fill(0);
  for (var i = 0; i < n; i++) {
    let node = trie.root;
    let j = i, maxEnd = i;
    while (j < n && node.children[s[j]]) { // keep following the trie while the characters match
      node = node.children[s[j]];
      j++;
      if (node.isWordEnd) maxEnd = j; // we found a match, but want to find the longest possible word.
    }
    if (j === i) continue; // no words matched
    for (var idx = i; idx < maxEnd; idx++) {
      bold[idx] = 1;
    }
  }
  
  let res = "";
  for (i = 0; i < n; i++) {
    if (bold[i] === 0) res += s[i];
    else {
      let start = i; 
      while (i < n - 1 && bold[i + 1]) i++;
      res += `<b>${s.slice(start, i + 1)}</b>`;
    }
  }
  return res;
};

class TrieNode {
  constructor() {
    this.children = {};
    this.isWordEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode(null);
  }
  addWord(word) {
    let node = this.root;
    for (var char of word) {
      node = node.children;
      if (!node[char]) node[char] = new TrieNode();
      node = node[char];
    }
    node.isWordEnd = true;
  }
}

// Two test cases to run function on
console.log(boldWords(["ab","bc"], "aabcd")) // "a<b>abc</b>d"
console.log(boldWords(["ab","cb"], "aabcd")) // "a<b>ab</b>cd"