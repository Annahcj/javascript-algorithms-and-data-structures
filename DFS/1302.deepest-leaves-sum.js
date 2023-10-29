// 1302. Deepest Leaves Sum
// Given the root of a binary tree, return the sum of values of its deepest leaves.


// Solution 1: Recursive DFS 

// 1. Find the maximum depth using recursive dfs
// 2. Find the sum of the nodes at the max depth

// Time Complexity: O(n) 230ms
// Space Complexity: O(n) 97.8MB
var deepestLeavesSum = function(root) {
  let maxDepth = getMaxDepth(root);
  return getSum(root, 1);
  
  function getMaxDepth(node) {
    if (!node) return 0;
    return Math.max(getMaxDepth(node.left), getMaxDepth(node.right)) + 1;
  }
  
  function getSum(node, depth) {
    if (!node) return 0;
    if (depth === maxDepth) return node.val;
    return getSum(node.left, depth + 1) + getSum(node.right, depth + 1);
  }
};


// Solution 2: Level by level BFS

// BFS the tree level-by-level.
// Keep track of the sum at each level and reset it when we start at each level.
// The final result of sum will be the sum of the last level.

// Time Complexity: O(n) 267ms
// Space Complexity: O(n) 96.7MB
var deepestLeavesSum = function(root) {
  let queue = [root], sum = 0;
  while (queue.length) {
    sum = 0;
    for (let i = queue.length - 1; i >= 0; i--) {
      let node = queue.shift();
      sum += node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return sum;
};