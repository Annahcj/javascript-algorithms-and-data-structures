// 107. Binary Tree Level Order Traversal II
// Given the root of a binary tree, return the bottom-up level order traversal of its nodes' values. (i.e., from left to right, level by level from leaf to root).


// Solution: Level by Level BFS

// Time Complexity: O(n) 117ms
// Space Complexity: O(n) 40.2MB
var levelOrderBottom = function(root) {
  if (!root) return [];
  let queue = [root], res = [];
  while (queue.length) {
    let size = queue.length; // only traverse the fixed size of this level
    res.push(getValues(queue)); // get the values of nodes for the current level
    for (var i = 0; i < size; i++) {
      let node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return res.reverse(); // reverse to get bottom up traversal
  
  function getValues(nodes) {
    let values = [];
    for (var node of nodes) values.push(node.val);
    return values;
  }
};