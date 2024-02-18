// 3043. Find the Length of the Longest Common Prefix
// You are given two arrays with positive integers arr1 and arr2.
// A prefix of a positive integer is an integer formed by one or more of its digits, starting from its leftmost digit. For example, 123 is a prefix of the integer 12345, while 234 is not.
// A common prefix of two integers a and b is an integer c, such that c is a prefix of both a and b. For example, 5655359 and 56554 have a common prefix 565 while 1223 and 43456 do not have a common prefix.
// You need to find the length of the longest common prefix between all pairs of integers (x, y) such that x belongs to arr1 and y belongs to arr2.
// Return the length of the longest common prefix among all pairs. If no common prefix exists among them, return 0.


// Solution 1: Trie

// Add each number (convert into string) from arr2 into a trie.
// Go through each number in arr1 and iterate through the trie to find the longest matching prefix.

// n = length of arr1 and arr2, m = length of arr1[i]/arr2[i]
// Time Complexity: O(nm) 247ms
// Space Complexity: O(nm) 75.6MB
var longestCommonPrefix = function(arr1, arr2) {
  let trie = new Trie();
  for (let num of arr2) {
    let str = num.toString();
    trie.add(str);
  }
  let longestCommonPrefix = 0;
  for (let num of arr1) {
    let str = num.toString();
    let node = trie.root;
    let matching = 0;
    for (let char of str) {
      node = node.children;
      if (!node[char]) break;
      matching++;
      node = node[char];
    }
    longestCommonPrefix = Math.max(longestCommonPrefix, matching);
  }
  return longestCommonPrefix;
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
}


// Solution 2: Hashset

// Add the prefix of each word in arr2 into a hashset.
// For each word in arr1, go through each prefix of the word and check whether it exists in the hashset for arr2.
// Record and return the maximum length of a common prefix.

// Time Complexity: O(n * m^2) 339ms
// Space Complexity: O(nm) 73.6MB
var longestCommonPrefix = function(arr1, arr2) {
  let prefixes = new Set();
  for (let num of arr2) {
    let pref = "", str = num.toString();
    for (let i = 0; i < str.length; i++) {
      pref += str[i];
      prefixes.add(pref);
    }
  }
  let longestCommonPrefix = 0;
  for (let num of arr1) {
    let pref = "", str = num.toString();
    for (let i = 0; i < str.length; i++) {
      pref += str[i];
      if (prefixes.has(pref)) {
        longestCommonPrefix = Math.max(longestCommonPrefix, pref.length);
      }
    }
  }
  return longestCommonPrefix;
};

// Two test cases
console.log(longestCommonPrefix([1,10,100], [1000])) // 3
console.log(longestCommonPrefix([1,2,3], [4,4,4])) // 0