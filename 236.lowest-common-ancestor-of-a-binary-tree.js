// 236. Lowest Common Ancestor of a Binary Tree
// Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.


// Solution 1: Recursive DFS

// Create a recursive dfs function.
// dfs: 
// Searches through the tree in a post-order manner, depth first all the way down to the left before going right.
// If we have found either p or q, we return true in the function. This acts as a flag so we know one of the nodes are inside whatever node we are on.
// When both left and right is true, this means that both p and q are children of the current node, so the first time we see this, we should save the reference to this node and return true.
// Note: Since a node can be an ancestor to itself, we will need to deal with the edge cases: if a node is equal to either p or q and contains the other (p or q).

// If the root is null, return false.
// Otherwise 
// call dfs for the left child of the root.
// call dfs for the right child of the root.
// Set a 'curr' variable that will be true is the root is equal to either p or q.
// If we have found both p and q (using curr flag to check if current node is equal to p or equal to q), save the current node and return out of the dfs function, we have our answer.
// Otherwise, return true if we have found either p or q.

// Time Complexity: O(n) 88ms
// Space Complexity: O(n) 49.3MB
var lowestCommonAncestor = function(root, p, q) {
    let lca = null;
    dfs(root);
    return lca;
    function dfs(root) {
      if (!root) return false;
      let left = dfs(root.left, p, q);
      let right = dfs(root.right, p, q);
      let curr = root === p || root === q;
      if ((left && right) || (curr && left) || (curr && right)) lca = root;
      if (lca) return;
      return left || right || curr;
    }
  };