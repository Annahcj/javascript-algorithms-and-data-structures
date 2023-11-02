// 1379. Find a Corresponding Node of a Binary Tree in a Clone of That Tree
// Given two binary trees original and cloned and given a reference to a node target in the original tree.
// The cloned tree is a copy of the original tree.
// Return a reference to the same node in the cloned tree.
// Note that you are not allowed to change any of the two trees or the target node and the answer must be a reference to a node in the cloned tree.


// Solution 1: Iterative DFS 

// Iteratively DFS through the trees using a stack.
// Traverse both original and cloned trees simultaneously, when the node in original matches the target, return the current node in cloned.

// Time Complexity: O(n) 331ms
// Space Complexity: O(n) 87MB
var getTargetCopy = function(original, cloned, target) {
  let stack = [[original, cloned]];
  while (stack.length) {
    let [node, node_c] = stack.pop();
    if (node === target) return node_c;
    if (node.right) stack.push([node.right, node_c.right]);
    if (node.left) stack.push([node.left, node_c.left]);
  }
  return null;
};

// Solution 2: Iterative BFS

// Iteratively BFS through the two trees simultaneously using a queue.

// Time Complexity: O(n) 342ms
// Space Complexity: O(n) 88.9MB
var getTargetCopy = function(original, cloned, target) {
  let queue = [[original, cloned]];
  while (queue.length) {
    let [node, node_c] = queue.shift();
    if (node === target) return node_c;
    if (node.left) queue.push([node.left, node_c.left]);
    if (node.right) queue.push([node.right, node_c.right]);
  }
  return null;
};