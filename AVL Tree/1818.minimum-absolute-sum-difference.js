// 1818. Minimum Absolute Sum Difference
// You are given two positive integer arrays nums1 and nums2, both of length n.
// The absolute sum difference of arrays nums1 and nums2 is defined as the sum of |nums1[i] - nums2[i]| for each 0 <= i < n (0-indexed).
// You can replace at most one element of nums1 with any other element in nums1 to minimize the absolute sum difference.
// Return the minimum absolute sum difference after replacing at most one element in the array nums1. Since the answer may be large, return it modulo 10^9 + 7.
// |x| is defined as:
  // x if x >= 0, or
  // -x if x < 0.


// Solution: AVL Tree

// Add all numbers in nums1 to an AVL tree.

// For each index i, try to replace nums1[i] with one of two choices:
  // The number in nums1 closest to nums2[i], which is smaller than or equal to nums2[i]: binary search for the upper bound
  // The number in nums1 closest to nums2[i], which is larger than or equal to nums2[i]: binary search for the lower bound
// Take the number that results in the smallest absolute difference with nums2[i].

// Keep track of the total absolute sum difference, and calculate the difference after replacing nums1[i] with the better number.
// Record the minimum absolute sum difference.

// Time Complexity: O(n log(n)) 372ms
// Space Complexity: O(n) 79.3MB
var minAbsoluteSumDiff = function(nums1, nums2) {
  let n = nums1.length, avlTree = new AVLTree();
  let absoluteSumDiff = 0n;
  for (let i = 0; i < n; i++) {
    avlTree.insert(nums1[i]);
    absoluteSumDiff += BigInt(Math.abs(nums1[i] - nums2[i]));
  }
  let ans = absoluteSumDiff;
  for (let i = 0; i < n; i++) {
    let upperBound = avlTree.upperBound(nums2[i]);
    let lowerBound = avlTree.lowerBound(nums2[i]);
    let upperBoundDiff = upperBound ? nums2[i] - upperBound.val : Infinity;
    let lowerBoundDiff = lowerBound ? lowerBound.val - nums2[i] : Infinity;
    let minDiff = Math.min(upperBoundDiff, lowerBoundDiff);
    let newAbsoluteSumDiff = absoluteSumDiff - BigInt(Math.abs(nums1[i] - nums2[i])) + BigInt(minDiff);
    ans = newAbsoluteSumDiff < ans ? newAbsoluteSumDiff : ans;
  }
  return ans % 1000000007n;
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
    node.size = 1 + this._getSize(node.left) + this._getSize(node.right);

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
    node.size = 1 + this._getSize(node.left) + this._getSize(node.right);

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
  lowerBound(val, node = this.root) { // find node with the smallest value, where the value >= val
    if (!node) return null;
    if (node.val === val) return node;
    if (val < node.val) {
      const res = this.lowerBound(val, node.left);
      return res ? res : node;
    } else {
      return this.lowerBound(val, node.right);
    }
  }
  upperBound(val, node = this.root) { // find node with the largest value, where the value <= val
    if (!node) return null;
    if (node.val === val) return node;
    if (val > node.val) {
      const res = this.upperBound(val, node.right);
      return res ? res : node;
    } else {
      return this.upperBound(val, node.left);
    }
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
  _getSize(node = this.root) {
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

    node.size = 1 + this._getSize(node.left) + this._getSize(node.right);
    rightNode.size = 1 + this._getSize(rightNode.left) + this._getSize(rightNode.right);

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

    node.size = 1 + this._getSize(node.left) + this._getSize(node.right);
    leftNode.size = 1 + this._getSize(leftNode.left) + this._getSize(leftNode.right);

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

// Two test cases
console.log(minAbsoluteSumDiff([1,7,5], [2,3,5])) // 3
console.log(minAbsoluteSumDiff([1,10,4,4,2,7], [9,3,5,1,7,4])) // 20