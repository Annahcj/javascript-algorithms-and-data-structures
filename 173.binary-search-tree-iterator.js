// 173. Binary Search Tree Iterator
// Implement the BSTIterator class that represents an iterator over the in-order traversal of a binary search tree (BST):
  // BSTIterator(TreeNode root) Initializes an object of the BSTIterator class. The root of the BST is given as part of the constructor. The pointer should be initialized to a non-existent number smaller than any element in the BST.
  // boolean hasNext() Returns true if there exists a number in the traversal to the right of the pointer, otherwise returns false.
  // int next() Moves the pointer to the right, then returns the number at the pointer.


// Solution: Iterative In-order Traversal

// Use a stack to keep nodes for an in-order traversal.


// First, push all left-most nodes into the stack.

// Time Complexity: O(h)
// Space Complexity: O(n)
var BSTIterator = function(root) {
  this.stack = [];
  let node = root;
  while (node) {
    this.stack.push(node);
    node = node.left;
  }
};

// 1. Pop out the last node in the stack
// 2. Go to the right node (this is already the leftmost node, so we must explore the right node)
// 3. From the right node, traverse as left as possible and push the nodes into the stack.

// Time Complexity: O(1) (on avg)
// Space Complexity: O(1)
BSTIterator.prototype.next = function() {
  let node = this.stack.pop(), nextNode = node;
  node = node.right;
  while (node) {
    this.stack.push(node);
    node = node.left;
  }
  return nextNode.val;
};

// Simply check whether the stack is empty or not.

// Time Complexity: O(1)
// Space Complexity: O(1)
BSTIterator.prototype.hasNext = function() {
  return this.stack.length > 0;  
};