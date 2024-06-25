// 1038. Binary Search Tree to Greater Sum Tree
// Given the root of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus the sum of all keys greater than the original key in BST.
// As a reminder, a binary search tree is a tree that satisfies these constraints:
  // The left subtree of a node contains only nodes with keys less than the node's key.
  // The right subtree of a node contains only nodes with keys greater than the node's key.
  // Both the left and right subtrees must also be binary search trees.


// Solution 1: Reversed In-order Traversal - Recursion

// In-order traversal visits the leftmost node first, then the current node, before finally visiting the right node.
// For this problem we need in-order traversal, but reversed - right to left.
// Accumulate the suffix sum as we traverse through each node in reversed sorted order and replace the node value.

// Time Complexity: O(n) 47ms
// Space Complexity: O(n) 49MB
function bstToGst(root) {
  let sum = 0;
  inorder(root);
  return root;
  
  function inorder(node) {
    if (!node) return;
    inorder(node.right);
    sum += node.val;
    node.val = sum;
    inorder(node.left);
  }
};


// Solution 2: Reversed In-order Traversal - Iteration w/ Stack

// An iterative approach using a stack.
// Starting from the root, traverse as right as possible, adding the nodes to a stack.
// Then perform the following sequence until the stack becomes empty:
  // 1. Pop out the rightmost node in the stack.
  // 2. If the node has a left node, visit that and traverse as right as possible adding nodes onto the stack.
  // 3. The node we just popped from the stack is the node in reversed sorted order, so we update the suffix sum and update the node value with the sum.

// Time Complexity: O(n) 56ms
// Space Complexity: O(n) 48.9MB
function bstToGst(root) {
  let sum = 0, stack = [];
  traverseRight(root);
  while (stack.length) {
    let node = stack.pop();
    if (node.left) {
      traverseRight(node.left);
    }
    sum += node.val;
    node.val = sum;
  }
  return root;
  
  function traverseRight(node) {
    while (node) {
      stack.push(node);
      node = node.right;
    }
  }
};