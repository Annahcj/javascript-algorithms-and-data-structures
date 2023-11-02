// 2641. Cousins in Binary Tree II
// Given the root of a binary tree, replace the value of each node in the tree with the sum of all its cousins' values.
// Two nodes of a binary tree are cousins if they have the same depth with different parents.
// Return the root of the modified tree.
// Note that the depth of a node is the number of edges in the path from the root node to it.


// Solution: Level by level BFS 

// Traverse the tree with level by level BFS.
// At each level, traverse all the nodes on the next level (two passes)
  // 1. Get the sum of all nodes in the next level
  // 2. Replace the value of each node in the next level with levelSum - siblingsSum

// n = number of nodes
// Time Complexity: O(n) 573ms
// Space Complexity: O(n) 96.8MB
var replaceValueInTree = function(root) {
  root.val = 0;
  let queue = [root];
  while (queue.length) {
    let next = [], levelSum = 0;
    for (let i = 0; i < queue.length; i++) {
      let node = queue[i];
      if (node.left) levelSum += node.left.val;
      if (node.right) levelSum += node.right.val;
    }
    for (let i = 0; i < queue.length; i++) {
      let node = queue[i];
      let siblingsSum = (node.left?.val ?? 0) + (node.right?.val ?? 0);
      if (node.left) {
        next.push(node.left);
        node.left.val = levelSum - siblingsSum;
      }
      if (node.right) {
        next.push(node.right);
        node.right.val = levelSum - siblingsSum;
      }
    }
    queue = next;
  }
  return root;
};