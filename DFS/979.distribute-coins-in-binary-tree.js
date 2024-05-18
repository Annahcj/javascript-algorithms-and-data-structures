// 979. Distribute Coins in Binary Tree
// You are given the root of a binary tree with n nodes where each node in the tree has node.val coins. There are n coins in total throughout the whole tree.
// In one move, we may choose two adjacent nodes and move one coin from one node to another. A move may be from parent to child, or from child to parent.
// Return the minimum number of moves required to make every node have exactly one coin.


// Solution: Recursive DFS

// For each subtree, find the amount of excess coins or coins needed to be passed in.
// Positive amount: Coins needed to be passed up to the parent and distributed.
// Negative amount: Coins needed to be passed down from the parent.

// Use post-order DFS to traverse the tree and count the number of moves required for each subtree (sum of absolute difference between subtree sums and subtree sizes).
// Each dfs(node) returns the sum of node values, along with the count of nodes in the subtree.
// For each subtree, look at the sum of node values compared with the count of nodes to determine whether we need to use moves to either "pass up" the values to the parent, or values to be "passed down" to this subtree.

// n = number of nodes, h = height of the tree
// Time Complexity: O(n) 57ms
// Space Complexity: O(h) 51.8MB
var distributeCoins = function(root) {
  let moves = 0;
  dfs(root);
  return moves;
  
  function dfs(node) { // [sum, count of nodes]
    if (!node) return [0, 0];
    let [sumLeft, countLeft] = dfs(node.left);
    let [sumRight, countRight] = dfs(node.right);
    let sum = sumLeft + sumRight + node.val;
    let count = countLeft + countRight + 1;
    moves += Math.abs(sum - count);
    return [sum, count];
  }  
};