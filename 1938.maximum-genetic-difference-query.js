// 1938. Maximum Genetic Difference Query
// There is a rooted tree consisting of n nodes numbered 0 to n - 1. Each node's number denotes its unique genetic value (i.e. the genetic value of node x is x). The genetic difference between two genetic values is defined as the bitwise-XOR of their values. You are given the integer array parents, where parents[i] is the parent for node i. If node x is the root of the tree, then parents[x] == -1.
// You are also given the array queries where queries[i] = [nodei, vali]. For each query i, find the maximum genetic difference between vali and pi, where pi is the genetic value of any node that is on the path between nodei and the root (including nodei and the root). More formally, you want to maximize vali XOR pi.
// Return an array ans where ans[i] is the answer to the ith query.


// Solution: Bit Trie & DFS

// 1. Build an adjacency list from parents and find the root (index where parents[index] is -1)
// 2. Map queries to their nodes: map[node] = [[value, index in res], [value, index in res], ...]
// 3. DFS from the root node
  // Add the node to the trie
  // Answer the queries associated to the current node
  // Recursively DFS all the children of the node
  // Backtrack - remove the node from the trie

// Bit Trie:
// Adding a number: Add each bit (maximum 18 bits based on the constraints) to the trie, each node has two choices: 0 or 1. 
// Removing a number from the trie: We keep a count of how many of the same nodes are at a certain point, so we only need to decrement this count.
// Finding the max XOR result: It is always optimal to go to the opposite bit as early/left as possible.

// n = length of parents, m = length of queries
// Time Complexity: O(18 * (n + m)) 2120ms
// Space Complexity: O(2^18) 158.5MB
var maxGeneticDifference = function(parents, queries) {
  // build adjacency list 
  let n = parents.length, tree = Array(n).fill(0).map(() => []);
  let root;
  for (let i = 0; i < n; i++) {
    if (parents[i] === -1) {
      root = i;
      continue;
    }
    tree[parents[i]].push(i);
  }
  
  // map[node] = [[value, index in res], [value, index in res], ...]
  let map = Array(n).fill(0).map(() => []);
  for (let i = 0; i < queries.length; i++) {
    let [node, val] = queries[i];
    map[node].push([val, i]);
  }
  
  let res = Array(queries.length);
  let trie = new Trie();
  dfs(root);
  
  function dfs(node) {
    trie.increment(node, 1);
    // answer queries for node
    for (let [val, index] of map[node]) {
      res[index] = trie.getMax(val);
    }
    for (let child of tree[node]) {
      dfs(child);
    }
    trie.increment(node, -1); // backtrack -> remove the node
  }
  return res;
};

class TrieNode {
  constructor() {
    this.children = Array(2);
    this.count = 0;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  increment(num, val) {
    let node = this.root;
    // insert backwards
    for (let i = 18; i >= 0; i--) {
      let bit = (num >> i) & 1;
      node = node.children;
      if (!node[bit]) node[bit] = new TrieNode();
      node = node[bit];
      node.count += val;
    }
  }
  getMax(val) {
    let node = this.root, max = 0;
    for (let i = 18; i >= 0; i--) {
      node = node.children;
      let bit = (val >> i) & 1, opposite = bit ^ 1;
      
      // remove nodes that shouldn't exist anymore
      if (node[opposite] && node[opposite].count <= 0) node[opposite] = null;
      if (node[bit] && node[bit].count <= 0) node[bit] = null;
        
      // always optimal to get the opposite bit for XOR
      if (node[opposite]) {
        node = node[opposite];
        max |= (1 << i);
      } else node = node[bit];
    }
    return max;
  }
}

// Two test cases to run function on
console.log(maxGeneticDifference([-1,0,1,1], [[0,2],[3,2],[2,5]])) // [2,3,7]
console.log(maxGeneticDifference([3,7,-1,2,0,7,0,2], [[4,6],[1,15],[0,5]])) // [6,14,7]