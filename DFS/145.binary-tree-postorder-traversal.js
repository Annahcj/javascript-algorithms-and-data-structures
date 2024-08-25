// 145. Binary Tree Postorder Traversal
// Given the root of a binary tree, return the postorder traversal of its nodes' values.


// Solution 1: Recursion

// Time Complexity: O(n) 51ms
// Space Complexity: O(n) 49.1MB
var postorderTraversal = function(root) {
  let values = [];
  dfs(root);
  return values;
  
  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    dfs(node.right);
    values.push(node.val);
  }
};


// Solution 2: Iteration w/ Stack

// Post order DFS = Left subtree, right subtree, then finally the root.

// Simulate the recursive call stack from the recursive solution.
// Use a stack to simulate the recursive call stack.
// We visit each node twice - first to visit the left and right subtrees, and the second time to collect the node value.

// Time Complexity: O(n) 42ms
// Space Complexity: O(n) 49.2MB
var postorderTraversal = function(root) {
  if (!root) return [];
  let stack = [{childrenVisited: false, node: root}], values = [];
  while (stack.length) {
    let {childrenVisited, node} = stack.pop();
    if (!childrenVisited) {
      stack.push({childrenVisited: true, node});
      if (node.right) stack.push({childrenVisited: false, node: node.right});
      if (node.left) stack.push({childrenVisited: false, node: node.left});
    } else {
      values.push(node.val);
    }
  }
  return values;
};