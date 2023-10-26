// 426. Convert Binary Search Tree to Sorted Doubly Linked List
// Convert a Binary Search Tree to a sorted Circular Doubly-Linked List in place.
// You can think of the left and right pointers as synonymous to the predecessor and successor pointers in a doubly-linked list. For a circular doubly linked list, the predecessor of the first element is the last element, and the successor of the last element is the first element.
// We want to do the transformation in place. After the transformation, the left pointer of the tree node should point to its predecessor, and the right pointer should point to its successor. You should return the pointer to the smallest element of the linked list.


// Solution 1: Recursive Inorder Traversal

// Do a recursive inorder traversal and keep track of the previous node of the inorder traversal.
// Also keep track of the first node of the traversal so that we can connect the first and last nodes together.

// Time Complexity: O(n) 66ms
// Space Complexity: O(h) 44MB
var treeToDoublyList = function(root) {
  if (!root) return null;
  let first = null, prev = null;
  inorder(root);
  prev.right = first; 
  first.left = prev;
  return first;
  
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    if (!first) first = node;
    if (prev) {
      prev.right = node;
      node.left = prev;
    }
    prev = node;
    inorder(node.right);
  }
};


// Solution 2: Iterative Inorder Traversal

// The steps:
  // 1. Traverse as left as possible while pushing the nodes into the stack
  // 2. Set the current node to be stack.pop()
  // 3. Set the current node to be node.right
  // Repeat these steps until the stack becomes empty or the current node becomes null

// Time Complexity: O(n) 90ms
// Space Complexity: O(h) 43.6MB
var treeToDoublyList = function(root) {
  if (!root) return null;
  let stack = [], node = root;
  let first = null, prev = null;
  while (stack.length || node) {
    traverseLeft(node);
    node = stack.pop();
    if (prev) {
      prev.right = node;
      node.left = prev;
    } else {
      first = node;
    }
    prev = node;
    node = node.right;
  }
  prev.right = first;
  first.left = prev;
  return first;
  
  function traverseLeft(node) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
  }
};