// 2265. Count Nodes Equal to Average of Subtree
// Given the root of a binary tree, return the number of nodes where the value of the node is equal to the average of the values in its subtree.
// Note:
  // The average of n elements is the sum of the n elements divided by n and rounded down to the nearest integer.
  // A subtree of root is a tree consisting of root and all of its descendants.


// Solution: Recursive DFS

// Recursively DFS the tree.
// dfs(node) returns [sum, number of nodes] of the subtree rooted at node.

// Time Complexity: O(n) 88ms
// Space Complexity: O(n) 47.1MB
var averageOfSubtree = function(root) {
  let res = 0;
  dfs(root);
  return res;
  
  function dfs(node) {
    if (!node) return [0, 0]; // [sum, n]
    
    let [leftSum, leftN] = dfs(node.left), [rightSum, rightN] = dfs(node.right);
    let n = leftN + rightN + 1;
    let sum = leftSum + rightSum + node.val;
    if (node.val === Math.floor(sum / n)) res++;
    return [sum, n];
  }  
};