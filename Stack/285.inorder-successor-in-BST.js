// 285. Inorder Successor in BST
// Given the root of a binary search tree and a node p in it, return the in-order successor of that node in the BST. If the given node has no in-order successor in the tree, return null.
// The successor of a node p is the node with the smallest key greater than p.val.


// Solution 1: Iterative Inorder Traversal

// Do an iterative inorder traversal, keeping track of the nodes.
// When the last node of 'inorder' is p, return the current node.

// Time Complexity: O(n) 118ms
// Space Complexity: O(n) 52.3MB
var inorderSuccessor = function(root, p) {
  if (root === p) return root.right;
  let inorder = [], stack = [];
  let node = root;
  while (node || stack.length) {
    if (!node) {
      // backtrack to the previous node and go right.
      node = stack.pop();
      if (inorder.length && inorder[inorder.length - 1] === p) return node;
      inorder.push(node);
      node = node.right;
    } else {
      // process all left nodes
      while (node) {
        stack.push(node);
        node = node.left;
      }
    }
  }
  return null;
}; 

// Solution 2: Use BST property

// When node.val <= p.val, discard the left subtree (both p and its successor will not be in the left subtree).
// Otherwise, update successor to be the current node, and go left.

// Time Complexity: O(n) 88ms
  // O(log(n)) on average
// Space Complexity: O(1) 52.2MB
var inorderSuccessor = function(root, p) {
  if (root === p) return root.right;
  let successor = null;
  while (root) {
    if (root.val <= p.val) root = root.right;
    else {
      successor = root;
      root = root.left;
    } 
  }
  return successor;
}; 