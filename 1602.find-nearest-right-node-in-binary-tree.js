// 1602. Find Nearest Right Node in Binary Tree
// Given the root of a binary tree and a node u in the tree, return the nearest node on the same level that is to the right of u, or return null if u is the rightmost node in its level.


// Solution: Level by Level BFS

// Process the tree level by level using a queue.
// When we come across node u, 
  // if u is the last node in its level, return null, otherwise return the current first node in the queue.

// Time Complexity: O(n) (worst case if u is at the bottom level) 258ms
// Space Complexity: O(n) 82.4MB
var findNearestRightNode = function(root, u) {
  let queue = [root];
  while (queue.length) {
    let size = queue.length; 
    for (var i = 0; i < size; i++) {
      let node = queue.shift();
      if (node === u) {
        return i === size - 1 ? null : queue[0];
      }
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
};