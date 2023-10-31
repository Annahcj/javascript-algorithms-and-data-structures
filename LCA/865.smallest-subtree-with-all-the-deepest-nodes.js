// 865. Smallest Subtree with all the Deepest Nodes
// Given the root of a binary tree, the depth of each node is the shortest distance to the root.
// Return the smallest subtree such that it contains all the deepest nodes in the original tree.
// A node is called the deepest if it has the largest depth possible among any node in the entire tree.
// The subtree of a node is a tree consisting of that node, plus the set of all descendants of that node.


// Solution: Recursive DFS

// 1. DFS to get the maximum depth.
// 2. DFS to get the LCA of all the deepest nodes.
  // dfs(node, depth) returns a boolean: whether or not there are any of the deepest nodes in the current subtree.
  // If both the left and right subtree contains the deepest nodes, set the answer to be the current node.
    // This is because if only one subtree contains the deepest nodes, that subtree can be the answer itself.

// Time Complexity: O(n) 67ms
// Space Complexity: O(n) 44.8MB
var subtreeWithAllDeepest = function(root) {
  let res, maxDepth = getMaxDepth(root);
  dfs(root, 0);
  return res;
  
  function getMaxDepth(node) {
    if (!node) return 0;
    return Math.max(getMaxDepth(node.left), getMaxDepth(node.right)) + 1;
  }
  
  function dfs(node, depth) {
    if (!node) return depth === maxDepth; 
    let left = dfs(node.left, depth + 1), right = dfs(node.right, depth + 1);
    if (left && right) res = node; // there are deepest nodes in both left and right subtrees
    let curr = left || right;
    return curr;
  }
};