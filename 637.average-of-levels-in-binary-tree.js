// 637. Average of Levels in Binary Tree
// Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10-5 of the actual answer will be accepted.
 

// Solution 1: Level by level BFS

// Traverse the tree using level by level BFS.
// For each level, count the total sum of node values and the number of nodes.
// The average is sum / length.

// n = number of nodes
// Time Complexity: O(n) 137ms
// Space Complexity: O(n/2) 47.4MB
var averageOfLevels = function(root) {
  let res = [], queue = [root];
  while (queue.length) {
    let sum = 0, length = queue.length;
    for (let i = queue.length; i > 0; i--) {
      let node = queue.shift();
      sum += node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(sum / length);
  }
  return res;
};


// Solution 2: Recursive DFS

// Use recursive DFS to traverse the tree.
// Keep track of the level of the current node.
// Keep track of the sum of nodes values and number of nodes in each level.

// n = number of nodes, h = height of the tree
// Time Complexity: O(n) 145ms
// Space Complexity: O(h) 46.8MB
var averageOfLevels = function(root) {
  let res = []; // res[i] = [sum of node values, number of nodes]
  dfs(root, 0);
  return res.map(([sum, length]) => sum / length);
  
  function dfs(node, level) {
    if (!node) return;
    if (res.length <= level) res.push([0, 0]);
    res[level][0] += node.val;
    res[level][1]++;
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }
};