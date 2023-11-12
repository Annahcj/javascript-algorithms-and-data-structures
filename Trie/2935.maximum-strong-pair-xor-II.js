// 2935. Maximum Strong Pair XOR II
// You are given a 0-indexed integer array nums. A pair of integers x and y is called a strong pair if it satisfies the condition:
  // |x - y| <= min(x, y)
// You need to select two integers from nums such that they form a strong pair and their bitwise XOR is the maximum among all strong pairs in the array.
// Return the maximum XOR value out of all possible strong pairs in the array nums.
// Note that you can pick the same integer twice to form a pair.


// Solution: Bitwise Trie & Two Pointers

// Sort nums in asc order.
// For each nums[i], move up index j while nums[j] - nums[i] <= nums[i].
// Use a bitwise trie to find the maximum bitwise XOR, which is a greedy strategy of taking the opposite bit whenever possible.

// n = length of nums, m = max(nums[i])
// Time Complexity: O(n log(m)) 622ms
// Space Complexity: O(m) 133.4MB
var maximumStrongPairXor = function(nums) {
  nums.sort((a, b) => a - b);
  let n = nums.length, trie = new BitwiseTrie(), maxXor = 0;
  for (let i = 0, j = 0; i < n; i++) {
    if (i > 0) trie.removeNum(nums[i - 1]);
    while (j < n && nums[j] - nums[i] <= nums[i]) {
      trie.addNum(nums[j]);
      j++;
    }
    maxXor = Math.max(maxXor, trie.maxXor(nums[i]));
  } 
  return maxXor;
};

class TrieNode {
  constructor() {
    this.children = Array(2);
    this.num = null;
    this.count = 0;
  }
}

class BitwiseTrie {
  constructor() {
    this.root = new TrieNode();
  }
  addNum(num) {
    let node = this.root;
    for (let i = 20; i >= 0; i--) {
      let bit = (num >> i) & 1; 
      node = node.children;
      if (!node[bit]) node[bit] = new TrieNode();
      node = node[bit];
      node.count++;
    }
    node.num = num;
  }
  removeNum(num) {
    let node = this.root;
    for (let i = 20; i >= 0; i--) {
      let bit = (num >> i) & 1;
      node = node.children;
      node[bit].count--;
      if (node[bit].count <= 0) {
        node[bit] = null;
        break;
      }
      else node = node[bit];
    }
  }
  maxXor(num) {
    let node = this.root;
    for (let i = 20; i >= 0; i--) {
      let bit = (num >> i) & 1, opposite = bit ^ 1;
      node = node.children;
      if (node[opposite]) node = node[opposite];
      else node = node[bit];
    }
    return num ^ node.num;
  }
}

// Three test cases
console.log(maximumStrongPairXor([1,2,3,4,5])) // 7
console.log(maximumStrongPairXor([10,100])) // 0
console.log(maximumStrongPairXor([500,520,2500,3000])) // 1020