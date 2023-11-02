// 979. Distribute Coins in Binary Tree
// You are given the root of a binary tree with n nodes where each node in the tree has node.val coins. There are n coins in total throughout the whole tree.
// In one move, we may choose two adjacent nodes and move one coin from one node to another. A move may be from parent to child, or from child to parent.
// Return the minimum number of moves required to make every node have exactly one coin.


// Solution: Recursive DFS

// For each subtree, find the amount of excess coins or coins needed to be passed in.
// Positive amount: Coins needed to be passed up to the parent and distributed.
// Negative amount: Coins needed to be passed down from the parent.

// Explanations:

// res += Math.abs(left) + Math.abs(right)
  // Regardless of whether coins need to be passed up or down, they still count as moves, so need to take the absolute value.

// return node.val + left + right - 1
  // We subtract 1 because each node needs one coin.

// Time Complexity: O(n) 100ms
// Space Complexity: O(n) 44.1MB
var distributeCoins = function(root) {
  let res = 0;
  dfs(root);
  return res;
  
  function dfs(node) {
    if (!node) return 0;
    let left = dfs(node.left), right = dfs(node.right);
    res += Math.abs(left) + Math.abs(right);
    return node.val + left + right - 1;
  }
};