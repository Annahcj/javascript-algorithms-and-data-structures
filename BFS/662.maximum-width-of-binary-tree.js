// 662. Maximum Width of Binary Tree
// Given the root of a binary tree, return the maximum width of the given tree.
// The maximum width of a tree is the maximum width among all levels.
// The width of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes are also counted into the length calculation.
// It is guaranteed that the answer will in the range of 32-bit signed integer.


// Solution: BFS with Two Queues

// Note: Because some test cases may contain integers bigger than the javascript limitations (2^53-1), 
// All numbers should be Big Integers.

// Initiate a queue with [root, 0n] inside. Set max width to 0n
// (next, we will perform bfs with two queues (for level by level traversal))
// Loop while queue is not empty *
  // Set next to an empty array
  // Set left (most left of current level) to Number.POSITIVE_INFINITY, right (most right of current level) to Number.NEGATIVE_INFINITY
  // Loop while queue is not empty **
    // Set [node, idx] to be queue.pop
    // If idx is smaller than left, set left to idx
    // If idx is bigger than right, set right to idx
    // If node has left child, push [node.left, idx * 2n] into next
    // If node has right child, push [node.right, idx * 2n + 1n] into next
  // **
  // Set queue to next
  // If right - left + 1n (max width for this level) is bigger than maxWidth, update maxWidth to right - left + 1n.
// *
// Return maxWidth

// Time Complexity: O(n) 176ms
// Space Complexity: O(n) 45.9MB
var widthOfBinaryTree = function(root) {
  let queue = [[root, 0n]], maxWidth = 0n;
  while (queue.length) {
    let next = [];
    let left = Number.POSITIVE_INFINITY, right = Number.NEGATIVE_INFINITY;
    while (queue.length) {
      let [node, idx] = queue.pop();
      if (idx < left) left = idx;
      if (idx > right) right = idx;
      if (node.left) next.push([node.left, idx * 2n]);
      if (node.right) next.push([node.right, idx * 2n + 1n]);
    }
    queue = next;
    let tempMax = right - left + 1n;
    if (tempMax > maxWidth) maxWidth = tempMax;
  }
  return maxWidth;
};