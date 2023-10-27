// 1261. Find Elements in a Contaminated Binary Tree
// Given a binary tree with the following rules:
  // 1. root.val == 0
  // 2. If treeNode.val == x and treeNode.left != null, then treeNode.left.val == 2 * x + 1
  // 3. If treeNode.val == x and treeNode.right != null, then treeNode.right.val == 2 * x + 2
// Now the binary tree is contaminated, which means all treeNode.val have been changed to -1.
// Implement the FindElements class:
  // FindElements(TreeNode* root) Initializes the object with a contaminated binary tree and recovers it.
  // bool find(int target) Returns true if the target value exists in the recovered binary tree.


// Solution:

// Use recursive DFS to recover the node values of the tree.
// As we recover the values, add the new values in a hashset for quick lookup.
// When find(target) is called, check whether the hashset contains target.

// Time Complexity: 113ms
  // init: O(n)
  // find: O(1)
// Space Complexity: O(n) 51.7MB
var FindElements = function(root) {
  this.values = new Set([0]);
  root.val = 0;
  this.recover(root);
};

FindElements.prototype.recover = function(node) {
  if (node.left) {
    node.left.val = node.val * 2 + 1;
    this.values.add(node.val * 2 + 1);
    this.recover(node.left);
  }  
  if (node.right) {
    node.right.val = node.val * 2 + 2;
    this.values.add(node.val * 2 + 2);
    this.recover(node.right);
  }
};

FindElements.prototype.find = function(target) {
  return this.values.has(target);  
};