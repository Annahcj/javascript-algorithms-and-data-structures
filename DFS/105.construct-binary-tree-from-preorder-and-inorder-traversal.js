// 105. Construct Binary Tree from Preorder and Inorder Traversal
// Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

// LeetCode provided TreeNode
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

// Solution: Recursive DFS

// 1. Record the index of each node from the inorder array in a hashmap for quick lookup.
// 2. Set the start and end range for a node
  // left child: start, index of val - 1
  // right child: index of val + 1, end

// Time Complexity: O(n) 126ms
// Space Complexity: O(n) 42MB
var buildTree = function(preorder, inorder) {
  let idx = {};
  for (var i = 0; i < inorder.length; i++) idx[inorder[i]] = i;
  let index = 0;
  return recurse(0, preorder.length - 1);

  function recurse(start, end) {
    if (start > end) return null; // if there are no more nodes in the range, return null.
    let val = preorder[index++]; // get the next value
    let node = new TreeNode(val); 
    node.left = recurse(start, idx[val] - 1);
    node.right = recurse(idx[val] + 1, end);
    return node;
  }
};

// A test case to run function on
console.log(buildTree([3,9,20,15,7], [9,3,15,20,7])) // [3,9,20,null,null,15,7]