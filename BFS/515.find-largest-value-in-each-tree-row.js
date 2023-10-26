// 515. Find Largest Value in Each Tree Row
// Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).


// Solution: Level-by-level BFS

// Time Complexity: O(n) 100ms
// Space Complexity: O(n) 47MB
var largestValues = function(root) {
  if (!root) return [];
  let queue = [root], res = [];
  
  while (queue.length) {
    let max = -Infinity;
    for (let i = queue.length - 1; i >= 0; i--) {
      let node = queue.shift();
      max = Math.max(max, node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(max);
  }
  return res;
};