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

// Solution 2: Distance Array

// Recursively DFS the root, returning a distance array where distance[i] = number of nodes distance i away from the current node
// When we find a leaf node, return a distance array with distance[1] = 1.
// For any other node, get the distance array for the left and right subtrees.
  // Loop through each combination of left distance (i) and right distance (j),
  // if i + j <= distance, add left[i] * right[j] to the count of pairs.
// Then, return a distance array after adding 1 to each distance.

// Time Complexity: O(n * d^2) 187ms
// Space Complexity: O(n) 57.2MB
var countPairs = function(root, distance) {
  let ans = 0;
  dfs(root);
  return ans;
  
  function dfs(node) {
    let res = Array(distance + 1).fill(0);
    if (!node) return res;
    if (!node.left && !node.right) {
      res[1] = 1;
      return res;
    }
    let left = dfs(node.left), right = dfs(node.right);
    for (let i = 1; i < left.length; i++) {
      for (let j = 1; j < left.length; j++) {
        if (i + j > distance) break;
        ans += left[i] * right[j];
      }
    }
    
    for (let i = 1; i < distance; i++) {
      res[i + 1] = left[i] + right[i];
    }
    return res;
  }
};