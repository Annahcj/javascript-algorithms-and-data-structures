// 701. Insert into a Binary Search Tree
// You are given the root node of a binary search tree (BST) and a value to insert into the tree. Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST.
// Notice that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return any of them.


// Solution 1: Iterative

// Iteratively find the position for the val.

// Time Complexity: O(h) 143ms
// Space Complexity: O(1) 51MB
var insertIntoBST = function(root, val) {
  if (!root) return new TreeNode(val);
  let node = root;
  while (node) {
    if (node.val < val) {
      if (!node.right) {
        node.right = new TreeNode(val);
        break;
      } 
      node = node.right;
    } else {
      if (!node.left) {
        node.left = new TreeNode(val);
        break;
      }
      node = node.left;
    }
  }
  return root;
};

// Solution 2: Recursive

// The recursive solution is simple, but it occupies more space than the iterative solution.

// Time Complexity: O(h) 128ms
// Space Complexity: O(h) 47.1MB
var insertIntoBST = function(root, val) {
  if (!root) return new TreeNode(val);
  if (node.val < val) node.right = insertIntoBST(node.right, val);
  else node.left = insertIntoBST(node.left, val);
  return root;
};