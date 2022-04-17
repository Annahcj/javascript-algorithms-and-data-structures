// 897. Increasing Order Search Tree
// Given the root of a binary search tree, rearrange the tree in in-order so that the leftmost node in the tree is now the root of the tree, and every node has no left child and only one right child.


// Solution 1: Inorder Traversal 

// 1. Do an inorder traversal to get the values
// 2. Build a new tree based on those values

// Time Complexity: O(n) 58ms
// Space Complexity: O(n) 43.7MB
var increasingBST = function(root) {
  let stack = [], values = [];
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    values.push(root.val);
    root = root.right;
  }
  
  let dummy = new TreeNode(0), node = dummy;
  for (let val of values) {
    node.right = new TreeNode(val);
    node = node.right;
  }
  return dummy.right;
};


// Solution 2: Inorder Traversal & Relinking

// h = height of the tree
// Time Complexity: O(n) 72ms
// Space Complexity: O(h) 42.4MB
var increasingBST = function(root) {
  let stack = [];
  let dummy = new TreeNode(0), node = dummy;
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    node.right = root;
    node = node.right;
    node.left = null; // cut off left connection
    root = root.right;
  }
  return dummy.right;
};