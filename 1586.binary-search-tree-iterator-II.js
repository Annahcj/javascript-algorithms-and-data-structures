// 1586. Binary Search Tree Iterator II


// Solution 1: Preprocessing

// Do an inorder traversal of the tree in the intialization and record the values in an array.
// Keep track of the current index in the array.

// Time Complexity: 615ms
  // Initial: O(n)
  // all methods: O(1)
// Space Complexity: O(n) 84.2MB
var BSTIterator = function(root) {
  this.values = [];
  this.getInorder(root);
  this.index = -1;
};

BSTIterator.prototype.getInorder = function(root) {
  if (!root) return;
  this.getInorder(root.left);
  this.values.push(root.val);
  this.getInorder(root.right);
};

BSTIterator.prototype.hasNext = function() {
  return this.index < this.values.length - 1;
};

BSTIterator.prototype.next = function() {
  return this.values[++this.index];  
};

BSTIterator.prototype.hasPrev = function() {
  return this.index > 0;  
};

BSTIterator.prototype.prev = function() {
  return this.values[--this.index];  
};

// Solution 2: Traversing on the fly

// Keep the values of nodes we have been to in an array 'values'.
// Use a stack to keep track of the next nodes.

// Note: 
  // next: we may be going to a node which we have already visited in the past, 
        // so only traverse further if the index is equal to the last index in the values array.

// Time Complexity: 645ms
  // all methods: O(1)
  // next: O(h)
// Space Complexity: O(n) 83.7MB
var BSTIterator = function(root) {
  this.values = [];
  this.stack = [];
  this.traverseLeft(root);
  this.index = -1;
};

BSTIterator.prototype.traverseLeft = function(node) {
  while (node) {
    this.stack.push(node);
    node = node.left;
  }
};

BSTIterator.prototype.hasNext = function() {
  return this.stack.length > 0 || this.index < this.values.length - 1;
};

BSTIterator.prototype.next = function() {
  if (this.index === this.values.length - 1) {
    let node = this.stack.pop();
    this.values.push(node.val);
    this.traverseLeft(node.right);
  }
  return this.values[++this.index];
};


BSTIterator.prototype.hasPrev = function() {
  return this.index > 0;  
};

BSTIterator.prototype.prev = function() {
  return this.values[--this.index];  
};