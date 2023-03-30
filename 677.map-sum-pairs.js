// 677. Map Sum Pairs
// Design a map that allows you to do the following:
  // Maps a string key to a given value.
  // Returns the sum of the values that have a key with a prefix equal to a given string.
// Implement the MapSum class:
// MapSum() Initializes the MapSum object.
  // void insert(String key, int val) Inserts the key-val pair into the map. If the key already existed, the original key-value pair will be overridden to the new one.
  // int sum(string prefix) Returns the sum of all the pairs' value whose key starts with the prefix.
 

// Solution 1: Trie w/ DFS

// Insert each key into the trie and store the value at the end of the word.
// When sum is called, traverse the trie with the prefix and use recursive dfs to get the sum of values of all words from the last node onward.

// n = number of keys, m = max(key.length)
// Time Complexity: 55ms
  // insert: O(key.length)
  // sum: O(n * m) at worst
// Space Complexity: O(n * m) 43.7MB
var MapSum = function() {
  this.trie = new TrieNode();  
};

MapSum.prototype.insert = function(key, val) {
  let node = this.trie;
  for (let char of key) {
    node = node.children;
    if (!node[char]) node[char] = new TrieNode();
    node = node[char];
  }
  node.value = val;
};

MapSum.prototype.sum = function(prefix) {
  let node = this.trie;
  for (let char of prefix) {
    node = node.children;
    if (!node[char]) return 0;
    node = node[char];
  }
  return getSum(node);
};

function getSum(node) {
  let sum = node.value;
  node = node.children;
  for (let char in node) {
    sum += getSum(node[char]);
  }
  return sum;
}

class TrieNode {
  constructor() {
    this.children = {};
    this.value = 0;
  }
}

// Solution 2: Trie w/ Hashmap

// Insert each key into the trie and store the sum of values at each character.
// Use a hashmap to keep track of the current value of each key.
// When insert is called with an existing key, we need to update the values (node.value += new value - old value)
// When sum is called, traverse the trie with the prefix and return the sum of values at the last node.

// n = number of keys, m = max(key.length)
// Time Complexity: 59ms
  // insert: O(key.length)
  // sum: O(prefix.length)
// Space Complexity: O(n * m) 44.1MB
var MapSum = function() {
  this.trie = new TrieNode();  
  this.map = new Map();
};

MapSum.prototype.insert = function(key, val) {
  let node = this.trie;
  for (let char of key) {
    node = node.children;
    if (!node[char]) node[char] = new TrieNode();
    node = node[char];
    node.sum += val - (this.map.get(key) || 0);
  }
  this.map.set(key, val);
};

MapSum.prototype.sum = function(prefix) {
  let node = this.trie;
  for (let char of prefix) {
    node = node.children;
    if (!node[char]) return 0;
    node = node[char];
  }
  return node.sum;
};

class TrieNode {
  constructor() {
    this.children = {};
    this.sum = 0;
  }
}