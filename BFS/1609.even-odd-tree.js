// 1609. Even Odd Tree
// A binary tree is named Even-Odd if it meets the following conditions:
  // The root of the binary tree is at level index 0, its children are at level index 1, their children are at level index 2, etc.
  // For every even-indexed level, all nodes at the level have odd integer values in strictly increasing order (from left to right).
  // For every odd-indexed level, all nodes at the level have even integer values in strictly decreasing order (from left to right).
// Given the root of a binary tree, return true if the binary tree is Even-Odd, otherwise return false.


// Solution: BFS 

// Level by level BFS.
// For each level of nodes, check
  // the node values (even level -> odd values, odd level -> even values)
  // the ordering of the nodes (even level -> strictly increasing, odd level -> strictly decreasing)

// n = number of nodes
// Time Complexity: O(n) 279ms
// Space Complexity: O(n/2) 74.8MB
var isEvenOddTree = function(root) {
  let queue = [root], level = 0;
  while (queue.length) {
    if (!isEvenOdd(queue, level)) return false;
    let next = [];
    while (queue.length) {
      let node = queue.shift();
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    queue = next;
    level++;
  }
  return true;
};

function isEvenOdd(nodes, level) {
  if (!isCorrectEvenOdd(nodes[0].val, level)) return false;
  for (let i = 1; i < nodes.length; i++) {
    if (!isCorrectEvenOdd(nodes[i].val, level) || !isCorrectOrdering(nodes[i - 1].val, nodes[i].val, level)) {
      return false;
    }
  }
  return true;
}

function isCorrectEvenOdd(val, level) {
  return val % 2 !== level % 2;
}

function isCorrectOrdering(val1, val2, level) {
  return level % 2 === 0 ? val1 < val2 : val1 > val2;
}