// 687. Longest Univalue Path
// Given the root of a binary tree, return the length of the longest path, where each node in the path has the same value. This path may or may not pass through the root.
// The length of the path between two nodes is represented by the number of edges between them.


// Solution: DFS

// For each node in the tree, it can either be:
  // 1. The middle node that connects the longest left and right subtree paths.
    // We need to make sure the left and right nodes have the same value as the current node before counting the path length.
  // 2. Part of a subtree path for parent nodes.
    // Return the longest (left or right) subtree path + 1 (the current node).

// Time Complexity: O(n) 378ms
// Space Complexity: O(n) 98.7MB
var longestUnivaluePath = function(root) {
  let res = 0;
  dfs(root);
  return res;
  
  function dfs(node) {
    if (!node) return 0;
    
    let ans = 0, max = 0;
    let left = dfs(node.left), right = dfs(node.right);
    if (node.left?.val === node.val) {
      ans += left;
      max += left;
    } 
    if (node.right?.val === node.val) {
      ans = Math.max(ans, right);
      max += right;
    }
    res = Math.max(res, max);
    return ans + 1;
  }  
};