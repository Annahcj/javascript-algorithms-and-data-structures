// 99. Recover Binary Search Tree
// You are given the root of a binary search tree (BST), where the values of exactly two nodes of the tree were swapped by mistake. Recover the tree without changing its structure.


// Solution: Recursion

// Perform a recursive inorder traversal of the tree.
// How to get the two swapped values:
  // When previous node value > current node value, we know that the previous node is the first node to be swapped.
  // The second node can be a bit ambiguous because it could be behind the first node, 
  // so we should override it with the current node each time previous node value > current node value.

// e.g: node values -> [1,4,3,2,5]
// swapped nodes: 4, 2
// 4 > 3, first node = 4, second node = 3 (see how the second node is incorrect here?)
// 3 > 2, first node stays the same, second node = 2 (this time the second node is correct)
// the result -> first node: 4, second node: 2

// Time Complexity: O(n) 160ms
// Space Complexity: O(n) 52MB
var recoverTree = function(root) {
  let prev = null, first = null, second = null;
  inorder(root);
  let temp = first.val;
  first.val = second.val;
  second.val = temp;
  return root;
  
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    if (prev && prev.val > node.val) {
      if (!first) first = prev;
      second = node;
    }
    prev = node;
    inorder(node.right);
  }
};

// Solution 2: Iterative 

// The same as solution 1, but an iterative version.
// The iterative version simulates with a stack what is happening in the recursive version.

// Time Complexity: O(n) 130ms
// Space Complexity: O(n) 52.3MB
var recoverTree = function(root) {
  let prev = null, first = null, second = null;
  let node = root, stack = [];
  while (node || stack.length) {
    while (node) { // traverse left
      stack.push(node);
      node = node.left;
    }
    node = stack.pop(); 
    if (prev && prev.val > node.val) {
      if (!first) first = prev;
      second = node;
    }
    prev = node;
    node = node.right; // move right
  }
  
  let temp = first.val;
  first.val = second.val;
  second.val = temp;
  return root;
};