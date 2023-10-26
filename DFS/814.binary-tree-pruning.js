// 814. Binary Tree Pruning
// Given the root of a binary tree, return the same tree where every subtree (of the given tree) not containing a 1 has been removed.


// Solution: DFS Recursively

// Thoughts:
// What we need to do is go all the way down to the bottom of the tree, and check if there are subtrees with a value of 1 from bottom up.
// If there aren't any ones in a particular subtree, set it equal to null (pruning).

// Create a helper function 'dfs'
// dfs:
// If node is equal to null: return false (this subtree is empty)
// recursively call dfs for left child of current node, and store the boolean in a variable 'leftContains'
// recursively call dfs for right child of currrent node, and store the boolean in a variable 'rightContains'
// (these two calls indicate whether the left subtree and right subtree contains a one)
// If leftContains is false (doesn't contain a one): Set current node's left child to null (prune left subtree)
// If rightContains is false: Set right child to null (prune right subtree)
// Return true if value of node is 1, or leftContains is true, or rightContains is true.
// If dfs(root) is true: return root, otherwise return null.

// Time Complexity: O(n) 60ms
// Space Complexity: O(n) (call stack) 40.3MB
var pruneTree = function(root) {
  return dfs(root) ? root : null;
  function dfs(node) {
    if (!node) return false;
    let leftContains = dfs(node.left);
    let rightContains = dfs(node.right);
    if (!leftContains) node.left = null;
    if (!rightContains) node.right = null;
    return node.val === 1 || leftContains || rightContains;
  }
};