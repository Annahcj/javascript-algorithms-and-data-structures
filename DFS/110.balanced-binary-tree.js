// 110. Balanced Binary Tree
// Given a binary tree, determine if it is height-balanced.


// Solution: Post-order DFS

// Post-order DFS to recursively find the depth of each subtree.
// If at any node, the height of the left subtree and right subtree differs by more than one, it is not balanced.

// Time Complexity: O(n) 1ms
// Space Complexity: O(n) 60MB
function isBalanced(root) {
  let balanced = true;
  dfs(root);
  return balanced;

  function dfs(node) {
    if (!node) return 0;
    const heightLeft = dfs(node.left);
    const heightRight = dfs(node.right);
    if (Math.abs(heightLeft - heightRight) > 1) {
      balanced = false;
    }
    return Math.max(heightLeft, heightRight) + 1;
  } 
};