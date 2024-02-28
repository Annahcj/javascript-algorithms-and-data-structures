// 1825. Finding MK Average
// You are given two integers, m and k, and a stream of integers. You are tasked to implement a data structure that calculates the MKAverage for the stream.
// The MKAverage can be calculated using these steps:
  // 1. If the number of the elements in the stream is less than m you should consider the MKAverage to be -1. Otherwise, copy the last m elements of the stream to a separate container.
  // 2. Remove the smallest k elements and the largest k elements from the container.
  // 3. Calculate the average value for the rest of the elements rounded down to the nearest integer.
// Implement the MKAverage class:
  // MKAverage(int m, int k) Initializes the MKAverage object with an empty stream and the two integers m and k.
  // void addElement(int num) Inserts a new element num into the stream.
  // int calculateMKAverage() Calculates and returns the MKAverage for the current stream rounded down to the nearest integer.


// Solution: Three AVL trees

// Maintain three AVL trees:
  // For the kth smallest elements.
  // For the elements in the middle.
  // For the kth largest elements.

// When we add a new element,
  // 1. Add the new element to the smaller tree.
  // 2. Shift the values from smaller -> middle -> larger.
    // If the window size > m, the larger tree will contain k + 1 elements (will be handled after removing and re-adjusting the sizes).
  // 3. Remove the (i-m)th element: find the tree it's currently in and remove it from that tree.
  // 4. Adjust the values if any tree has a size different to what it's meant to be.

// Adjusting the tree sizes after insertion:
  // Once the new element is added, it's possible the newly added element is larger than all values in smaller and even middle.
  // To handle this, we shift the largest value from smaller -> middle. And the largest value from middle -> larger.
  // Essentially, once smaller overflows, we overflow it to middle. And once middle overflows, we overflow it to larger.
  // This way, larger values are guaranteed to "flow" to the right side.

// Adjusting the tree sizes after removal:
  // If the middle tree is larger than expected, find the tree which is missing one element and add either the smallest or largest element to it.
  // If the first tree (kth smallest) is larger than k, move the largest value to the middle tree, then if the middle tree is larger than expected, move the largest value to the third tree.
  // If the third tree (kth largest) is larger than k, move the smallest value to the middle tree, then if the middle tree is larger than expected, move the smallest value to the first tree.

// n = number of calls to addElement
// Time Complexity: 761ms
  // addElement: O(log(m)) per call
  // calculateMKAverage: O(1) per call
// Space Complexity: O(m + n) 95.5MB
var MKAverage = function(m, k) {
  this.smaller = new AVLTree();
  this.middle = new AVLTree();
  this.larger = new AVLTree();
  this.nums = [];
  this.m = m;
  this.k = k;
  this.middleSum = 0;
  this.middleCount = m - k * 2;
};

MKAverage.prototype.addElement = function(num) {
  // add the new number to the smaller tree
  this.smaller.insert(num);

  // shift values from smaller -> middle -> larger.
  // if the window size > m, the larger tree will have k + 1 elements (this will be handled after removing the (i-m)th element and adjusting)
  if (this.smaller.getSize() > this.k) {
    let maxValFromSmaller = this.smaller.getMax().val;
    this.smaller.remove(maxValFromSmaller);
    this.middle.insert(maxValFromSmaller);
    this.middleSum += maxValFromSmaller;
    if (this.middle.getSize() > this.middleCount) {
      let maxValFromMiddle = this.middle.getMax().val;
      this.middle.remove(maxValFromMiddle);
      this.middleSum -= maxValFromMiddle;
      this.larger.insert(maxValFromMiddle);
    }
  }

  // remove the (i-m)th number from the appropriate tree
  if (this.nums.length >= this.m) {
    let numToRemove = this.nums[this.nums.length - this.m];
    if (this.smaller.search(numToRemove)) {
      this.smaller.remove(numToRemove);
    } else if (this.middle.search(numToRemove)) {
      this.middle.remove(numToRemove);
      this.middleSum -= numToRemove;
    } else {
      this.larger.remove(numToRemove);
    }
  }  
  
  // rebalance the tree sizes
  if (this.middle.getSize() > this.middleCount) {
    let minVal = this.middle.getMin().val;
    this.middle.remove(minVal);
    this.middleSum -= minVal;
    if (this.smaller.getSize() < this.k) {
      this.smaller.insert(minVal);
    } else {
      this.larger.insert(minVal);
    }
  } else if (this.smaller.getSize() > this.k) {
    let maxValFromSmaller = this.smaller.getMax().val;
    this.smaller.remove(maxValFromSmaller);
    this.middle.insert(maxValFromSmaller);
    this.middleSum += maxValFromSmaller;
    if (this.middle.getSize() > this.middleCount) {
      let maxValFromMiddle = this.middle.getMax().val;
      this.middle.remove(maxValFromMiddle);
      this.middleSum -= maxValFromMiddle;
      this.larger.insert(maxValFromMiddle);
    }
  } else if (this.larger.getSize() > this.k) {
    let minValFromLarger = this.larger.getMin().val;
    this.larger.remove(minValFromLarger);
    this.middle.insert(minValFromLarger);
    this.middleSum += minValFromLarger;
    if (this.middle.getSize() > this.middleCount) {
      let minValFromMiddle = this.middle.getMin().val;
      this.middle.remove(minValFromMiddle);
      this.middleSum -= minValFromMiddle;
      this.smaller.insert(minValFromMiddle);
    }
  }

  this.nums.push(num);
};

MKAverage.prototype.calculateMKAverage = function() {
  if (this.nums.length < this.m) return -1;
  return Math.floor(this.middleSum / this.middleCount);
};

class AVLTreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.height = 1;
    this.size = 1; // number of nodes in tree rooted at this node
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }
  search(val, node = this.root) {
    if (!node) return null;
    if (node.val === val) return node;
    if (val < node.val) {
      return this.search(val, node.left);
    } else {
      return this.search(val, node.right);
    }
  }
  insert(val) {
    return this.root = this._insert(val, this.root);
  }
  _insert(val, node) {
    if (!node) return new AVLTreeNode(val);
    if (val < node.val) {
      node.left = this._insert(val, node.left);
    } else {
      node.right = this._insert(val, node.right);
    }
    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    node.size = 1 + this.getSize(node.left) + this.getSize(node.right);

    return this._rebalance(node);
  }
  remove(val, node = this.root) {
    // To ensure we don't delete all occurances of `val`, pass in the reference of one occurance.
    // To delete all nodes with value `val`, remove the check for `nodeToRemove` in _remove.
    const nodeToRemove = this.search(val, node);
    return this.root = this._remove(val, nodeToRemove, node);
  }
  // Four scenarios for deletion:
    // 1. node to delete has no children - just delete it
    // 2. node to delete only has a left child - replace it with the left child
    // 3. node to delete only has a right child - replace it with the right child
    // 4. node to delete has both left and right children - replace it with the next smallest node that is larger (use in order traversal to find the leftmost node in the right child)
  _remove(val, nodeToRemove, node) {
    if (!node) return null;
    if (val < node.val) {
      node.left = this._remove(val, nodeToRemove, node.left);
    } else if (val > node.val) {
      node.right = this._remove(val, nodeToRemove, node.right);
    } else if (val === node.val && node === nodeToRemove) {
      if (!node.left && !node.right) return null;
      if (!node.right) return node.left;
      if (!node.left) return node.right;

      // has both left and right children
      // inorder traversal on the right child to get the leftmost node
      // replace the node value with the leftmost node value and remove the leftmost node from the right subtree
      const leftmostNode = this._getLeftmost(node.right);
      node.val = leftmostNode.val;

      node.right = this._remove(leftmostNode.val, this.search(leftmostNode.val, node.right), node.right);
    } else {
      return node;
    }
    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    node.size = 1 + this.getSize(node.left) + this.getSize(node.right);

    return this._rebalance(node);
  }
  getKthLargest(k) { // 1-indexed
    let node = this.root;
    if (!node || node.size < k) return null; // there is no kth element

    while (node) {
      let rightSize = node.right?.size ?? 0;
      if (k === rightSize + 1) return node;
      if (rightSize >= k) {
        node = node.right;
      } else {
        k -= rightSize + 1;
        node = node.left;
      }
    }
    return null;
  }
  getMax() {
    return this.getKthLargest(1);
  }
  getKthSmallest(k) { // 1-indexed
    let node = this.root;
    if (!node || node.size < k) return null; // there is no kth element

    while (node) {
      let leftSize = node.left?.size ?? 0;
      if (k === leftSize + 1) return node;
      if (leftSize >= k) {
        node = node.left;
      } else {
        k -= leftSize + 1;
        node = node.right;
      }
    }
    return null;
  }
  getMin() {
    return this.getKthSmallest(1);
  }
  _getLeftmost(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }
  _getHeight(node = this.root) {
    return node ? node.height : 0;
  }
  getSize(node = this.root) {
    return node ? node.size : 0;
  }
  _getBalance(node = this.root) {
    return node ? this._getHeight(node.left) - this._getHeight(node.right) : 0;
  }
  _leftRotation(node) { 
    let rightNode = node.right;
    let rightNodeLeftChild = rightNode.left;
    rightNode.left = node;
    node.right = rightNodeLeftChild;

    // node is now below rightNode and needs to be updated first
    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    rightNode.height = 1 + Math.max(this._getHeight(rightNode.left), this._getHeight(rightNode.right));

    node.size = 1 + this.getSize(node.left) + this.getSize(node.right);
    rightNode.size = 1 + this.getSize(rightNode.left) + this.getSize(rightNode.right);

    return rightNode; // right node is the new root
  }
  _rightRotation(node) {
    let leftNode = node.left;
    let leftNodeRightChild = leftNode.right;
    leftNode.right = node;
    node.left = leftNodeRightChild;

    // node is now below leftNode and needs to be updated first
    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    leftNode.height = 1 + Math.max(this._getHeight(leftNode.left), this._getHeight(leftNode.right));

    node.size = 1 + this.getSize(node.left) + this.getSize(node.right);
    leftNode.size = 1 + this.getSize(leftNode.left) + this.getSize(leftNode.right);

    return leftNode; // left node is the new root
  }
  _rebalance(node) {
    const balance = this._getBalance(node);
    if (balance > 1 && this._getBalance(node.left) >= 0) { // left left
      return this._rightRotation(node);
    } else if (balance > 1 && this._getBalance(node.left) < 0) { // left right
      node.left = this._leftRotation(node.left);
      return this._rightRotation(node);
    } else if (balance < -1 && this._getBalance(node.right) <= 0) { // right right
      return this._leftRotation(node);
    } else if (balance < -1 && this._getBalance(node.right) > 0) { // right left
      node.right = this._rightRotation(node.right);
      return this._leftRotation(node);
    }
    return node;
  }
}

// A few test cases
let obj = new MKAverage(3, 1); 
obj.addElement(3);        // current elements are [3]
obj.addElement(1);        // current elements are [3,1]
console.log(obj.calculateMKAverage()); // return -1, because m = 3 and only 2 elements exist.
obj.addElement(10);       // current elements are [3,1,10]
console.log(obj.calculateMKAverage()); // The last 3 elements are [3,1,10].
                          // After removing smallest and largest 1 element the container will be [3].
                          // The average of [3] equals 3/1 = 3, return 3
obj.addElement(5);        // current elements are [3,1,10,5]
obj.addElement(5);        // current elements are [3,1,10,5,5]
obj.addElement(5);        // current elements are [3,1,10,5,5,5]
console.log(obj.calculateMKAverage()); // The last 3 elements are [5,5,5].
                          // After removing smallest and largest 1 element the container will be [5].
                          // The average of [5] equals 5/1 = 5, return 5