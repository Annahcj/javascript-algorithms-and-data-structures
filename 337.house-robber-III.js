// 337. House Robber III
// The thief has found himself a new place for his thievery again. There is only one entrance to this area, called root.
// Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if two directly-linked houses were broken into on the same night.
// Given the root of the binary tree, return the maximum amount of money the thief can rob without alerting the police.


// Solution: Recursive DFS 

// For each node, we have two choices:
  // 1. take the grandchildren + current node
  // 2. take the best of grandchildren & children (WITHOUT current node)

// Algorithm:
  // Edge case: If node is not defined, return [0, 0]
  // let left be dfs(node.left)
  // let right be dfs(node.right)
  // choice 1: take the grandchildren -> left[1] + right[1] + node.val
  // choice 2: take the best of children/grandchildren -> Math.max(left[0], left[1]) + Math.max(right[0], right[1])
  // return [take grandchildren, take children]

// Time Complexity: O(n) 121ms
// Space Complexity: O(n) (call stack) 43.3MB
var rob = function(root) {
  let ans = dfs(root);
  return Math.max(ans[0], ans[1]);

  function dfs(node) {
    if (!node) return [0, 0];
    let left = dfs(node.left);
    let right = dfs(node.right);
    let takeGrandchildren = left[1] + right[1] + node.val;
    let takeChildren = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
    return [takeGrandchildren, takeChildren];
  }  
};