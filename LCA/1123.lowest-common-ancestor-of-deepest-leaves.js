// 1123. Lowest Common Ancestor of Deepest Leaves
// Given the root of a binary tree, return the lowest common ancestor of its deepest leaves.


// Solution: Recursive DFS 

// 1. DFS to get the maximum depth.
// 2. DFS to get the LCA of all the deepest nodes.
  // dfs(node, depth) returns a boolean: whether or not there are any of the deepest nodes in the current subtree.
  // If both the left and right subtree contains the deepest nodes, set the answer to be the current node.
    // This is because if only one subtree contains the deepest nodes, that subtree can be the answer itself.

// Time Complexity: O(n) 95ms
// Space Complexity: O(n) 46.4MB
var lcaDeepestLeaves = function(root) {
  let res, maxDepth = getMaxDepth(root);
  dfs(root, 0);
  return res;
  
  function getMaxDepth(root) {
    if (!root) return 0;
    return Math.max(getMaxDepth(root.left), getMaxDepth(root.right)) + 1;
  }
  
  function dfs(node, depth) {
    if (!node) return depth === maxDepth;
    let left = dfs(node.left, depth + 1), right = dfs(node.right, depth + 1);
    if (left && right) res = node;
    let curr = left || right;
    return curr;
  }
};