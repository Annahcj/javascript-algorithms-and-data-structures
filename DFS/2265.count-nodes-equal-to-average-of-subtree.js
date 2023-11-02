// 2265. Count Nodes Equal to Average of Subtree
// Given the root of a binary tree, return the number of nodes where the value of the node is equal to the average of the values in its subtree.
// Note:
  // The average of n elements is the sum of the n elements divided by n and rounded down to the nearest integer.
  // A subtree of root is a tree consisting of root and all of its descendants.


// Solution: Post-order DFS

// Use post-order DFS to find the sum of values and number of nodes in each subtree.

// Time Complexity: O(n) 67ms
// Space Complexity: O(n) 46.9MB
var averageOfSubtree = function(root) {
  let count = 0;
  dfs(root);
  return count;
  
  function dfs(node) {
    if (!node) return [0, 0];
    let [leftSum, leftCount] = dfs(node.left);
    let [rightSum, rightCount] = dfs(node.right);
    let totalSum = leftSum + rightSum + node.val;
    let totalCount = leftCount + rightCount + 1;
    let avg = Math.floor(totalSum / totalCount);
    if (node.val === avg) count++;
    return [totalSum, totalCount];
  }  
};