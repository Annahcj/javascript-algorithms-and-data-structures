// 2415. Reverse Odd Levels of Binary Tree
// Given the root of a perfect binary tree, reverse the node values at each odd level of the tree.
  // For example, suppose the node values at level 3 are [2,1,3,4,7,11,29,18], then it should become [18,29,11,7,4,3,1,2].
// Return the root of the reversed tree.
// A binary tree is perfect if all parent nodes have two children and all leaves are on the same level.
// The level of a node is the number of edges along the path between it and the root node.


// Solution: Level by level BFS 

// Traverse the tree with level-by-level BFS.
// For each odd level, reverse the values of the nodes on that level.

// Time Complexity: O(n) 520ms
// Space Complexity: O(n/2) 94MB
var reverseOddLevels = function(root) {
  let queue = [root], depth = 0;
  while (queue.length) {
    if (depth % 2 === 1) reverseValues(queue);    
    for (let i = queue.length; i > 0; i--) {
      let node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    depth++;
  }
  return root;
};

function reverseValues(nodes) {
  let i = 0, j = nodes.length - 1;
  while (i < j) {
    let firstValue = nodes[i].val;
    nodes[i].val = nodes[j].val;
    nodes[j].val = firstValue;
    i++, j--;
  }
}