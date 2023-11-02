// 1080. Insufficient Nodes in Root to Leaf Paths
// Given the root of a binary tree and an integer limit, delete all insufficient nodes in the tree simultaneously, and return the root of the resulting binary tree.
// A node is insufficient if every root to leaf path intersecting this node has a sum strictly less than limit.
// A leaf is a node with no children.


// Solution: DFS 

// DFS from the root.
// Keep track of the current sum, and make dfs(node, sum) return the maximum path sum. 
  // By keeping track of the current sum and returning the postorder sum, we can get the sum of the full path from root to a leaf.
  // We return the maximum path sum because every path must be strictly less, and if the maximum path sum does not exceed the limit, that means the node is not insufficient.

// Mark insufficient nodes with null value so that we know we need to remove it.
  // We need to remove the entire subtree rooted at an insufficient node, not just the node itself.
  // To remove a subtree, we need to remove it from the parent node.

// Time Complexity: O(n) 171ms
// Space Complexity: O(n) 49.1MB
var sufficientSubset = function(root, limit) {
  let VALUE_TO_REMOVE = null;
  dfs(root, 0);
  return root.val === VALUE_TO_REMOVE ? null : root;
  
  function dfs(node, sum) {
    if (!node) return 0;
    sum += node.val;
    
    let leftSum = node.left ? dfs(node.left, sum) : -Infinity;
    let rightSum = node.right ? dfs(node.right, sum) : -Infinity;
    let maxSum = !node.left && !node.right ? 0 : Math.max(leftSum, rightSum);
    let val = node.val;
    if (sum + maxSum < limit) {
      node.val = VALUE_TO_REMOVE;
    }
    if (node.left?.val === VALUE_TO_REMOVE) node.left = null;
    if (node.right?.val === VALUE_TO_REMOVE) node.right = null;
    return maxSum + val;
  }
};