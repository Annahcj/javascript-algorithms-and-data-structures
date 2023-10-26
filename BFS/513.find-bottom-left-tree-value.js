// 513. Find Bottom Left Tree Value
// Given the root of a binary tree, return the leftmost value in the last row of the tree.


// Solution: Level by level BFS

// Traverse the tree using level-by-level BFS.
// Record the value of the first node in the last row.

// Time Complexity: O(n) 120ms
// Space Complexity: O(n/2) 45.9MB
var findBottomLeftValue = function(root) {
  let queue = [root], bottomLeftVal = null;
  while (queue.length) {
    bottomLeftVal = queue[0].val;
    for (let i = queue.length; i > 0; i--) {
      let node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return bottomLeftVal;
};