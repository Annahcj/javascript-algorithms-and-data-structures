// 106. Construct Binary Tree from Inorder and Postorder Traversal
// Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree and postorder is the postorder traversal of the same tree, construct and return the binary tree.

// LeetCode provided TreeNode
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

// Solution: Recursive DFS

// Order of nodes in postorder (back to front): Node, right, left.

// 1. Record the index of each node from the inorder array in a hashmap for quick lookup.
// 2. Set the start and end range for a node
  // right child: index of val + 1, end
  // left child: start, index of val - 1

// Time Complexity: O(n) 86ms
// Space Complexity: O(n) 42.1MB
var buildTree = function(inorder, postorder) {
  let idx = {};
  for (var i = 0; i < inorder.length; i++) idx[inorder[i]] = i;
  return recurse(0, postorder.length - 1);

  function recurse(start, end) {
    if (start > end) return null;
    let val = postorder.pop();
    let node = new TreeNode(val);
    node.right = recurse(idx[val] + 1, end);
    node.left = recurse(start, idx[val] - 1);
    return node;
  }  
};

// A test case to run function on
console.log(buildTree([9,3,15,20,7], [9,15,7,20,3])) // [3,9,20,null,null,15,7]