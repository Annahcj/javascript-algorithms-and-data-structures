// 2673. Make Costs of Paths Equal in a Binary Tree
// You are given an integer n representing the number of nodes in a perfect binary tree consisting of nodes numbered from 1 to n. The root of the tree is node 1 and each node i in the tree has two children where the left child is the node 2 * i and the right child is 2 * i + 1.
// Each node in the tree also has a cost represented by a given 0-indexed integer array cost of size n where cost[i] is the cost of node i + 1. You are allowed to increment the cost of any node by 1 any number of times.
// Return the minimum number of increments you need to make the cost of paths from the root to each leaf node equal.
// Note:
  // A perfect binary tree is a tree where each node, except the leaf nodes, has exactly 2 children.
  // The cost of a path is the sum of costs of nodes in the path


// Solution: DFS 

// Key point: For each node, the sum of the all children paths must be equal since they share the same root path.
// Since we can only increase node values, we must make all path sums equal to the maximum path sum. 
  // Increase the child node with the smaller path sum to become equal to the larger path sum.
  // Then, return the maximum out of the left and right path sums.

// n = number of nodes, h = height of tree
// Time Complexity: O(n) 129ms
// Space Complexity: O(h) 54.7MB
var minIncrements = function(n, cost) {
  let ans = 0;
  dfs(1);
  return ans;
  
  function dfs(i) { 
    if (i * 2 > n) return cost[i - 1]; // leaf node
    let leftSum = dfs(2 * i), rightSum = dfs(2 * i + 1);
    ans += Math.max(leftSum, rightSum) - Math.min(leftSum, rightSum);
    return cost[i - 1] + Math.max(leftSum, rightSum);
  }  
};

// Two test cases
console.log(minIncrements(7, [1,5,2,2,3,3,1])) // 6
console.log(minIncrements(3, [5,3,3])) // 0