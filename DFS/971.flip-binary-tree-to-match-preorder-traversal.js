// 971. Flip Binary Tree To Match Preorder Traversal
// You are given the root of a binary tree with n nodes, where each node is uniquely assigned a value from 1 to n. You are also given a sequence of n values voyage, which is the desired pre-order traversal of the binary tree.
// Any node in the binary tree can be flipped by swapping its left and right subtrees. For example, flipping node 1 will have the following effect:
// Flip the smallest number of nodes so that the pre-order traversal of the tree matches voyage.
// Return a list of the values of all flipped nodes. You may return the answer in any order. If it is impossible to flip the nodes in the tree to make the pre-order traversal match voyage, return the list [-1].


// Solution: Pre-Order DFS

// Perform a pre-order DFS on the tree, keeping track of the current index in voyage as we visit each node.
// If the left node value doesn't match the next value in voyage, we must flip the current node.
// Edge case: If there is no left child, then treat it as if the right node is the left child.

// Time Complexity: O(n) 0ms
// Space Complexity: O(n) 57.25MB
function flipMatchVoyage(root, voyage) {
  const flipped = [];
  let i = 0;
  return dfs(root) ? flipped : [-1];

  function dfs(node) {
    if (!node) return true;
    if (node.val !== voyage[i++]) return false;
    if (node.left && node.left.val !== voyage[i]) {
      flipped.push(node.val);
      return dfs(node.right) && dfs(node.left);
    }
    return dfs(node.left) && dfs(node.right);
  }
};