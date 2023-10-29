// 1483. Kth Ancestor of a Tree Node
// You are given a tree with n nodes numbered from 0 to n - 1 in the form of a parent array parent where parent[i] is the parent of ith node. The root of the tree is node 0. Find the kth ancestor of a given node.
// The kth ancestor of a tree node is the kth node in the path from that node to the root node.
// Implement the TreeAncestor class:
  // TreeAncestor(int n, int[] parent) Initializes the object with the number of nodes in the tree and the parent array.
  // int getKthAncestor(int node, int k) return the kth ancestor of the given node node. If there is no such ancestor, return -1.


// Solution: Binary Lifting

// Use binary lifting to reduce the time complexity of getKthAncestor to O(1).
// Store each 2^ith parent of each node. p[pow2][node] = (2^pow2)th parent of node
// When getKthAncestor is called, we can use the binary representation of k to jump by powers of 2.

// n = number of nodes in the tree
// Time Complexity: 396ms
  // init: O(n log(n))
  // getKthAncestor: O(log(k))
// Space Complexity: O(n log(n)) 84.3MB
var TreeAncestor = function(n, parent) {
  let depth = Math.ceil(Math.log2(n));
  this.p = Array(depth + 1).fill(0).map(() => Array(n).fill(-1)); // p[pow2][node] = (2^pow2)th parent of node 
  for (let i = 0; i < n; i++) {
    this.p[0][i] = parent[i]; // set initial direct parents
  }
  for (let pow2 = 1; pow2 <= depth; pow2++) {
    for (let node = 0; node < n; node++) {
      let halfParent = this.p[pow2 - 1][node]; 
      this.p[pow2][node] = halfParent === -1 ? -1 : this.p[pow2 - 1][halfParent]; // e.g: if 2^pow2 = 8, we find the 4th parent of the 4th parent of the current node.
    }
  }
};

TreeAncestor.prototype.getKthAncestor = function(node, k) {
  let parent = node;
  for (let i = 0; i < 16; i++) {
    if ((k >> i) & 1) {
      parent = this.p[i][parent]; 
      if (parent === -1) return -1;
    }
  } 
  return parent;
};

// A few test cases
let treeAncestor = new TreeAncestor(7, [-1, 0, 0, 1, 1, 2, 2]);
console.log(treeAncestor.getKthAncestor(3, 1)); // returns 1 which is the parent of 3
console.log(treeAncestor.getKthAncestor(5, 2)); // returns 0 which is the grandparent of 5
console.log(treeAncestor.getKthAncestor(6, 3)); // returns -1 because there is no such ancestor