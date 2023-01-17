// 919. Complete Binary Tree Inserter
// A complete binary tree is a binary tree in which every level, except possibly the last, is completely filled, and all nodes are as far left as possible.
// Design an algorithm to insert a new node to a complete binary tree keeping it complete after the insertion.
// Implement the CBTInserter class:
  // CBTInserter(TreeNode root) Initializes the data structure with the root of the complete binary tree.
  // int insert(int v) Inserts a TreeNode into the tree with value Node.val == val so that the tree remains complete, and returns the value of the parent of the inserted TreeNode.
  // TreeNode get_root() Returns the root node of the tree.


// Solution: BFS & Queue

// Use BFS to traverse the tree level by level and left to right, populating a queue with parent nodes that don't have two children yet.
// The node at the front of the queue is the earliest parent node.

// Time Complexity: 98ms
  // initial: O(n)
  // insert: O(1)
  // get_root: O(1)
// Space ComplexitY: O(n) 47.2MB
var CBTInserter = function(root) {
  this.queue = new Queue();
  this.root = root;
  let queue = new Queue([root]);
  while (!queue.isEmpty()) {
    let node = queue.dequeue();
    if (!node.right) this.queue.enqueue(node); // parent node with less than 2 children
    if (node.left) queue.enqueue(node.left);
    if (node.right) queue.enqueue(node.right);
  }
};

CBTInserter.prototype.insert = function(val) {
  let newNode = new TreeNode(val);
  let parentNode = this.queue.front();
  if (!parentNode.left) {
    parentNode.left = newNode;
  } else {
    parentNode.right = newNode;
    this.queue.dequeue();
  }
  this.queue.enqueue(newNode);
  return parentNode.val;
};

CBTInserter.prototype.get_root = function() {
  return this.root;
};