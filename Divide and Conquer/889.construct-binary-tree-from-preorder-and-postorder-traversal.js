// 889. Construct Binary Tree from Preorder and Postorder Traversal
// Given two integer arrays, preorder and postorder where preorder is the preorder traversal of a binary tree of distinct values and postorder is the postorder traversal of the same tree, reconstruct and return the binary tree.
// If there exist multiple answers, you can return any of them.


// Solution: Divide & Conquer

// Preorder: [root (left subtree) (right subtree)]
// Postorder: [(left subtree) (right subtree) root] 

// Iterate through each node value in preorder and keep track of the start and end indexes in postorder.
// For each iteration, we can take preorder[index + 1] as the left child of the current node because if there was no left subtree (and only the right subtree), we wouldn't be able to tell the difference from the pre and postorder
// Find the index of preorder[index + 1] in postorder.
  // The left subtree values will be in range (start, postorderIndex)
  // The right subtree values will be in range (postorderIndex + 1, end - 1)

// If start > end, then that means we have gone out of range in postorder and there are no nodes on this side of the tree.

// Time Complexity: O(n) 83ms
// Space Complexity: O(n) 45.3MB
var constructFromPrePost = function(preorder, postorder) {
  let indexes = {}, n = preorder.length;
  for (let i = 0; i < n; i++) indexes[postorder[i]] = i;
  let index = 0;
  return dfs(0, n - 1);
  
  function dfs(start, end) { // (start, end) = range in postorder
    if (start > end || index === n) return null;
    if (start === end) return new TreeNode(preorder[index++]);
    let value = preorder[index++], node = new TreeNode(value);
    let postorderIndex = indexes[preorder[index]];
    node.left = dfs(start, postorderIndex);
    node.right = dfs(postorderIndex + 1, end - 1);
    return node;
  }  
};