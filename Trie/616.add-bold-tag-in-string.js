// 616. Add Bold Tag in String
// You are given a string s and an array of strings words. You should add a closed pair of bold tag <b> and </b> to wrap the substrings in s that exist in words. If two such substrings overlap, you should wrap them together with only one pair of closed bold-tag. If two substrings wrapped by bold tags are consecutive, you should combine them.
// Return s after adding the bold tags.


// Solution 1: Brute Force

// Check all words from each position in s.
// Use an array 'bold' to keep track of which characters need to be bold.

// n = s.length, m = words.length
// Time Complexity: O(n * m * n) 119ms
// Space Complexity: O(n) 45.2MB
var addBoldTag = function(s, words) {
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

// Time Complexity: O(n^2) 255ms
// Space Complexity: O(n + m) 60.4MB
var addBoldTag = function(s, words) {
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

// Three test cases to run function on
console.log(addBoldTag("abcxyz123", ["abc","123"])) // <b>abc</b>xyz<b>123</b>
console.log(addBoldTag("aaabbcc", ["aaa","aab","bc"])) // <b>aaabbc</b>c
console.log(addBoldTag("aaabbcc", ["aaa","aab","bc","aaabbcc"])) // <b>aaabbcc</b>