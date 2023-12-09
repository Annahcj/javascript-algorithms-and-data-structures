// 94. Binary Tree Inorder Traversal
// Given the root of a binary tree, return the inorder traversal of its nodes' values.


// Solution 1: Recursive In-Order Traversal

// Go as left as possible, then take the value of the node, then go as right as possible.

// Time Complexity: O(n) 72ms
// Space Complexity: O(n) 39.1MB
var inorderTraversal = function(root) {
  let res = [];
  dfs(root);
  return res;

  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    res.push(node.val);
    dfs(node.right);
  }  
};


// Solution 2: Iterative DFS w/ Stack

// Use a stack to simulate the recursive stack.

// To start, traverse as left as possible from the root node and push those nodes into a stack.
// 1. Pop the last node off the stack.
// 2. Add that node's value to the inorder traversal.
// 3. Traverse as left as possible from the node's right child.
// 4. Repeat this until the stack becomes empty.

// Time Complexity: O(n) 53ms
// Space Complexity: O(n) 41.3MB
var inorderTraversal = function(root) {
  let stack = [], inorder = [];  
  traverseLeft(root, stack);
  while (stack.length) {
    let node = stack.pop();
    inorder.push(node.val);
    if (node.right) {
      traverseLeft(node.right, stack);
    }
  }
  return inorder;
};

function traverseLeft(node, stack) {
  while (node) {
    stack.push(node);
    node = node.left;
  }
}