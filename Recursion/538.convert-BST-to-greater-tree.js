// 538. Convert BST to Greater Tree
// Given the root of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus the sum of all keys greater than the original key in BST.


// Solution 1: Recursive

// Do a reverse in-order traversal.
// By traversing in reverse order, we can keep track of the sum of nodes we have been to so far.

// Time Complexity: O(n) 100ms
// Space Complexity: O(n) 51.9MB
var convertBST = function(root) {
  let sum = 0;
  traverse(root);
  return root;
  
  function traverse(node) {
    if (!node) return 0;
    traverse(node.right);
    sum += node.val;
    node.val = sum;
    traverse(node.left);
    return sum;
  }
};


// Solution 2: Iterative 

// The same concept, but an iterative version using a stack.

// Time Complexity: O(n) 100ms
// Space Complexity: O(n) 52MB
var convertBST = function(root) {
  let stack = [], sum = 0, node = root;
  while (node || stack.length) {
    while (node) {
      stack.push(node);
      node = node.right;
    }
    node = stack.pop();
    sum += node.val;
    node.val = sum;
    node = node.left;
  }
  return root;
};