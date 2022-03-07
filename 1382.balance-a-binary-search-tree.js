// 1382. Balance a Binary Search Tree
// Given the root of a binary search tree, return a balanced binary search tree with the same node values. If there is more than one answer, return any of them.
// A binary search tree is balanced if the depth of the two subtrees of every node never differs by more than 1.


// Solution: Inorder Traversal, Divide & Conquer

// 1. Do inorder traversal of root and store the values in an array.
// 2. Use divide and conquer to build the tree: choose the mid index between start and end indices.

// Time Complexity: O(n) 136ms
// Space Complexity: O(n) 60.8MB
var balanceBST = function(root) {
  let values = [];
  inorder(root);
  return createTree(0, values.length - 1);
  
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    values.push(node.val);
    inorder(node.right);
  }
  
  function createTree(left, right) {
    if (left > right) return null;
    let mid = Math.floor((left + right) / 2);
    let newNode = new TreeNode(values[mid]);
    newNode.left = createTree(left, mid - 1);
    newNode.right = createTree(mid + 1, right);
    return newNode;
  }
};