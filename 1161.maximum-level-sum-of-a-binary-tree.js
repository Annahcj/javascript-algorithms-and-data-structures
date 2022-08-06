// 1161. Maximum Level Sum of a Binary Tree
// Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.
// Return the smallest level x such that the sum of all the values of nodes at level x is maximal.


// Solution 1: Level-by-level BFS

// Process nodes level by level using BFS.
// For each level, get the sum of the node values.
// Keep track of the maximum sum and level number.

// Time Complexity: O(n) 266ms
// Space Complexity: O(n/2) 66.9MB
var maxLevelSum = function(root) {
  let queue = [root], level = 1;
  let maxSum = -Infinity, maxLevel = -1;
  
  while (queue.length) {
    let size = queue.length, sum = 0;
    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      sum += node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    if (sum > maxSum) {
      maxSum = sum;
      maxLevel = level;
    }
    level++;
  }
  return maxLevel;
};


// Solution 2: DFS

// Recursively DFS while keeping track of the level of each node.
// Keep an array of sums for each level and get the max sum level.

// Time Complexity: O(n) 168ms
// Space Complexity: O(n) 62.5MB
var maxLevelSum = function(root) {
  let sums = [];
  dfs(root, 0);
  
  let ans = 0;
  for (let i = 1; i < sums.length; i++) {
    if (sums[i] > sums[ans]) {
      ans = i;
    }
  }
  return ans + 1;
  
  function dfs(node, lvl) {
    if (!node) return;
    if (sums.length <= lvl) sums.push(0);
    sums[lvl] += node.val;
    dfs(node.left, lvl + 1);
    dfs(node.right, lvl + 1);
  }
};