// 958. Check Completeness of a Binary Tree
// Given the root of a binary tree, determine if it is a complete binary tree.
// In a complete binary tree, every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.


// Solution: BFS

// Perform BFS, get each node's left and right child regardless of whether they exist.
// If we represent a complete binary tree in a level-by-level format, there should never be null values in front of valid values.
  // e.g: [1,2,3,4,null,5] can never be a complete binary tree.
// When we find the first null value, break out of the loop.

// When we finish, we should have a queue with null or valid values. 
// If the tree is complete, it should only contain null values. Check whether this is true.

// Time Complexity: O(n) 98ms
// Space Complexity: O(n) 44.7MB
var isCompleteTree = function(root) {
  let queue = [root];
  while (queue.length) {
    let node = queue.shift();
    if (!node) break;
    queue.push(node.left);
    queue.push(node.right);
  }
  while (queue.length && !queue[queue.length - 1]) {
    queue.pop();
  }
  return queue.length === 0;
};