// 144. Binary Tree Preorder Traversal
// Given the root of a binary tree, return the preorder traversal of its nodes' values.


// Solution 1: DFS Pre-Order Iteratively

// Initialize a stack (just an array) with the root inside.
// Loop while the length of the stack is bigger than zero
  // Pop off the stack and save it in a variable curr.
  // If curr is valid, push the value of curr in the result array,
  // and if the right child of curr is valid, push it into the stack
  // if the left child of curr is valid, push it into the stack.
// When iteration is done, return result.

// Time Complexity: O(n) 76ms
// Space Complexity: O(n) 38.9MB
var preorderTraversal = function(root) {
    let stack = [root], result = [];
    while (stack.length) {
      let curr = stack.pop();
      if (curr) {
        result.push(curr.val);
        if (curr.right) stack.push(curr.right);
        if (curr.left) stack.push(curr.left);
      }
    }
    return result;
  };