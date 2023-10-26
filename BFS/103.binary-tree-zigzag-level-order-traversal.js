// 103. Binary Tree Zigzag Level Order Traversal
// Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).


// Solution: BFS w/ Two Queues

// Use two queues for a level-by-level bfs.
// Keep track of nodes and the node's values for each level.
// Keep track of the level: if the level is even, reverse the nodes before pushing to result.

// Time Complexity: O(n) 122ms
// Space Complexity: O(n) 40.3MB
var zigzagLevelOrder = function(root) {
  if (!root) return [];
  let queue = [root], res = [[root.val]], level = 2;
  while (queue.length) {
    let next = [], values = [];
    while (queue.length) {
      let node = queue.shift();
      if (node.left) {
        next.push(node.left);
        values.push(node.left.val);
      }
      if (node.right) {
        next.push(node.right);
        values.push(node.right.val);
      }
    }
    if (!next.length) continue; // no more nodes
    if (level % 2 === 1) res.push([...values]);
    else res.push(values.reverse());
    queue = next;
    level++;
  }  
  return res;
};