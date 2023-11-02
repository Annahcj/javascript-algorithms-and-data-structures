// 111. Minimum Depth of Binary Tree
// Given a binary tree, find its minimum depth.
// The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.
// Note: A leaf is a node with no children.


// Solution 1: Recursive DFS

// Recursively visit each node
// Keep track of each node's depth
// If node is a leaf node (no children), check its depth with the global min depth.

// Time Complexity: O(n) 294ms
// Space Complexity: O(n) 103.5MB
var minDepth = function(root) {
  if (!root) return 0;
  let min = Infinity;
  dfs(root, 1);
  return min;

  function dfs(node, depth) {
    if (!node.left && !node.right) min = Math.min(min, depth);
    if (node.left) dfs(node.left, depth + 1);
    if (node.right) dfs(node.right, depth + 1);
  }
};

// Solution 2: Optimized Recursive DFS

// Recursively visit each node
// If node is a leaf node, return 1
// Return the smaller depth out of dfs(node.left) and dfs(node.right)  + 1

// Time Complexity: O(n) 333ms
// Space Complexity: O(n) 103MB
var minDepth = function(root) {
  if (!root) return 0;
  return dfs(root);

  function dfs(node) {
    if (!node.left && !node.right) return 1;
    let min = Infinity;
    if (node.left) min = Math.min(min, dfs(node.left));
    if (node.right) min = Math.min(min, dfs(node.right));
    return min + 1;
  }
};


// Solution 3: BFS

// Use level-by-level BFS to find the minimum depth of a leaf node.
// Once we find a leaf node, we can return the current depth.

// Note: 
  // Here we use an array as a queue, which results in O(n) time complexity for .shift(), with O(n^2) total time complexity.
  // If we use a real queue the total time complexity will be O(n).

// Time Complexity: O(n) 215ms
// Space Complexity: O(n) 98.7MB
var minDepth = function(root) {
  if (!root) return 0;
  let queue = [root], depth = 1;
  while (queue.length) {
    for (let i = queue.length - 1; i >= 0; i--) {
      let node = queue.shift();
      if (!node.left && !node.right) {
        return depth;
      }
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    depth++;
  }
};