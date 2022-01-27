// 421. Maximum XOR of Two Numbers in an Array
// Given an integer array nums, return the maximum result of nums[i] XOR nums[j], where 0 <= i <= j < n.


// Solution: Bitwise Trie

// 1. Add each number into the trie: Add each bit from left to right.
// 2. Loop through nums and get the best possible opposite match for each number. Keep track of the global max XOR.
  // Note: We start from left to right because having a bit on the left always results in a higher number than one on the right of it.
  // To elaborate, even if we get 1000, and 0111 exists in the trie, 1000 is bigger, so an earlier left bit is always better.

// Time Complexity: O(32n) 1039ms
// Space Complexity: O(2^31) (worst case) 112.5MB
var findMaximumXOR = function(nums) {
  let trie = new Trie();
  for (var num of nums) trie.addNum(num);
  
  let max = 0;
  for (var num of nums) {
    max = Math.max(max, trie.getMax(num));
  }
  return max;
};

class TrieNode {
  constructor() {
    this.children = Array(2); // there can only be 0 or 1
    this.num = null;
  }
}
class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  addNum(num) {
    let node = this.root;
    for (var i = 31; i >= 0; i--) {
      let bit = (num >> i) & 1; // gets the bit at position i from left
      node = node.children;
      if (!node[bit]) node[bit] = new TrieNode();
      node = node[bit];
    }
    node.num = num;
  }
  getMax(num) {
    let node = this.root;
    for (var i = 31; i >= 0; i--) {
      let bit = (num >> i) & 1, opposite = bit ^ 1;
      node = node.children;
      if (node[opposite]) node = node[opposite]; // it is always optimal to pick the opposite bit if we can, since it results in a higher number.
      else node = node[bit]; // otherwise, go with the same bit.
    }
    return num ^ node.num;
  }
}

// Two test cases to run function on
console.log(findMaximumXOR([3,10,5,25,2,8])) // 28
console.log(findMaximumXOR([14,70,53,83,49,91,36,80,92,51,66,70])) // 127