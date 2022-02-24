// 114. Flatten Binary Tree to Linked List
// Given the root of a binary tree, flatten the tree into a "linked list":
  // The "linked list" should use the same TreeNode class where the right child pointer points to the next node in the list and the left child pointer is always null.
  // The "linked list" should be in the same order as a pre-order traversal of the binary tree.


// Solution: Preorder Traversal & Reorder Pointers

// Do a preorder traversal of the tree.
  // Keep chaining on nodes as the right child of the current 'linked list'.
  // Save the pointers to the left and right child nodes of the current node.
  // Reassign the left and right child nodes of the current node to null.
  // Call preorder recursively for the left child (which was saved earlier)
  // Then call preorder for the right child.

// Time Complexity: O(n) 133ms
// Space Complexity: O(n) 44.5B
var flatten = function(root) {
  let dummy = new TreeNode(null), node = dummy;
  preorder(root);
  return dummy.right;
  
  function preorder(root) {
    if (!root) return;
    node.right = root;
    node = node.right;
    
    let left = root.left;
    let right = root.right;
    root.left = null;
    root.right = null;
    
    preorder(left);
    preorder(right);
  }
};