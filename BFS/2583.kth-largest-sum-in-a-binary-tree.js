// 2583. Kth Largest Sum in a Binary Tree
// You are given the root of a binary tree and a positive integer k.
// The level sum in the tree is the sum of the values of the nodes that are on the same level.
// Return the kth largest level sum in the tree (not necessarily distinct). If there are fewer than k levels in the tree, return -1.
// Note that two nodes are on the same level if they have the same distance from the root.


// Solution: BFS 

// Use level by level BFS to find the sum of values on each level.
// Then, sort the level sums and return the kth sum.

// n = number of nodes, m = number of levels
// Time Complexity: O(n + m log(m)) 411ms
// Space Complexity: O(n + m) 85.6MB
var kthLargestLevelSum = function(root, k) {
  let levelSums = [], queue = [root];
  while (queue.length) {
    levelSums.push(queue.reduce((sum, node) => sum + node.val, 0));
    let next = [];
    while (queue.length) {
      let node = queue.pop();
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    queue = next;
  }
  if (levelSums.length < k) return -1;
  levelSums.sort((a, b) => b - a);
  return levelSums[k - 1];
};