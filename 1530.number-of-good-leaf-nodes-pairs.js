// 1530. Number of Good Leaf Nodes Pairs
// You are given the root of a binary tree and an integer distance. A pair of two different leaf nodes of a binary tree is said to be good if the length of the shortest path between them is less than or equal to distance.
// Return the number of good leaf node pairs in the tree.


// Solution 1: Map Nodes to Parents

// 1. DFS to create a hashmap of nodes to parents.
// 2. DFS to find the leaf nodes
// 3. For each leaf node, DFS to traverse and count all nodes within the distance.
  // Traverse each node's parent, left child, and right child.
// Since we will count each pair twice, divide the answer by 2.

// Time Complexity: O(n^2) (loose bound) 181ms
// Space Complexity: O(n) 53.2MB
var countPairs = function(root, distance) {
  let parent = new Map();
  getParent(root); // populate the parent map
  
  let ans = 0;
  dfs(root); // find the leaf nodes and count the pairs
  
  function dfs(node) {
    if (!node) return;
    if (!node.left && !node.right) { // found a leaf node
      let seen = new Set(); // keep a visited set to avoid visiting the same nodes
      getPairs(node, 0, seen);
    }
    dfs(node.left);
    dfs(node.right);
  }
  return ans / 2;
  
  function getPairs(node, dist, seen) {
    if (seen.has(node) || dist > distance) return;
    seen.add(node);
    if (!node.left && !node.right && dist > 0 && dist <= distance) ans++;
    if (node.left) getPairs(node.left, dist + 1, seen);
    if (node.right) getPairs(node.right, dist + 1, seen);
    if (parent.has(node)) getPairs(parent.get(node), dist + 1, seen);
  }
  
  function getParent(node) {
    if (node.left) {
      parent.set(node.left, node);
      getParent(node.left);
    }  
    if (node.right) {
      parent.set(node.right, node);
      getParent(node.right);
    }
  }
};