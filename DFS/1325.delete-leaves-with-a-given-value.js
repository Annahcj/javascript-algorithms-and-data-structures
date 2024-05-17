// 1325.delete-leaves-with-a-given-value.js
// 1325. Delete Leaves With a Given Value
// Given a binary tree root and an integer target, delete all the leaf nodes with value target.
// Note that once you delete a leaf node with value target, if its parent node becomes a leaf node and has the value target, it should also be deleted (you need to continue doing that until you cannot).


// Solution: Post-Order DFS

// Traverse the tree using post-order DFS.
// If we reach a leaf node with the target value, return null.
// Later on, we use the post order DFS results rather than referring to the actual node.left and node.right. If both of these results are null and it's the target value, return null.

// Time Complexity: O(n) 61ms
// Space Complexity: O(h) 52.9MB
function removeLeafNodes(node, target) {
  if (!node) return null;
  let left = removeLeafNodes(node.left, target);
  let right = removeLeafNodes(node.right, target);
  node.left = left;
  node.right = right;
  if (!left && !right) {
    return node.val === target ? null : node;
  } 
  return node;
};