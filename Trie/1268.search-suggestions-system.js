// 1268. Search Suggestions System
// Given an array of strings products and a string searchWord. We want to design a system that suggests at most three product names from products after each character of searchWord is typed. Suggested products should have common prefix with the searchWord. If there are more than three products with a common prefix return the three lexicographically minimums products.
// Return list of lists of the suggested products after each character of searchWord is typed. 


// Solution 1: Trie

// n = total number of characters in products, m = length of searchWord
// Time Complexity: O(n + m) 372ms
// Space Complexity: O(n) 71.4MB
var suggestedProducts = function(products, searchWord) {
  // TrieNode -> uses an array of size 26 so that results can be searched in lexographical order
  class TrieNode {
    constructor() {
      this.children = Array(26);
      this.wordEnd = false;
    }
  } 
  let root = new TrieNode(null);
  // insert each word into the trie 
  for (let word of products) {
    let node = root;
    for (let char of word) {
      let charCode = char.charCodeAt() - 97;
      if (!node.children[charCode]) {
        node.children[charCode] = new TrieNode(char);
      }
      node = node.children[charCode];
    }
    node.wordEnd = true;
  }

  let res = [], node = root;
  let currStr = '';
  // search for top 3 words for each current prefix
  for (let char of searchWord) {
    let words = [];
    currStr += char;
    let charCode = char.charCodeAt() - 97;
    // if there are no words, break (fill with empty arrays later)
    if (!node.children[charCode]) break;
    node = node.children[charCode];
    // get the top 3 words that continue on from node
    dfs(node, currStr, words);
    res.push([...words]);
  }
  // fill with empty arrays if length is not full
  while (res.length < searchWord.length) res.push([]);
  return res;

  function dfs(node, str, words) {
    // stop when we find 3 words
    if (words.length === 3) {
      return;
    }
    // when a word is found, push the string to words
    if (node.wordEnd) {
      words.push(str);
    }
    // loops through in lexographical order
    for (var i = 0; i < 26; i++) {
      if (node.children[i]) dfs(node.children[i], str + String.fromCharCode(i + 97), words);
    }
  }
};

// Solution 2: Sorting & Filtering

// First, sort products.
// Each time we go to the next character in searchWord, we only keep the results that matched from the previous letter.
// This way, we are almost 'filtering' out words to be searched, and we won't need to search the entire array.

// n = length of products, m = length of searchWord
// Time Complexity: O(n log(n) + nm) 124ms
// Space Complexity: O(n) 53.5MB
var suggestedProducts = function(products, searchWord) {
  products.sort();
  let res = [];
  for (let i = 0; i < searchWord.length; i++) {
    let list = [];
    for (let word of products) {
      if (word[i] === searchWord[i]) {
        list.push(word);
      }
    }
    let copy = [...list];
    products = copy;
    res.push(copy.slice(0, 3));
  }
  return res;
};

// A test case
console.log(suggestedProducts(["mobile","mouse","moneypot","monitor","mousepad"], "mouse")) // [
// ["mobile","moneypot","monitor"],
// ["mobile","moneypot","monitor"],
// ["mouse","mousepad"],
// ["mouse","mousepad"],
// ["mouse","mousepad"]
// ]
console.log(suggestedProducts(["bags","baggage","banner","box","cloths"], "bags")) // [["baggage","bags","banner"],["baggage","bags","banner"],["baggage","bags"],["bags"]]