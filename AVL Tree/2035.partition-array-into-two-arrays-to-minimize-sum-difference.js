// 2035. Partition Array Into Two Arrays to Minimize Sum Difference
// You are given an integer array nums of 2 * n integers. You need to partition nums into two arrays of length n to minimize the absolute difference of the sums of the arrays. To partition nums, put each element of nums into one of the two arrays.
// Return the minimum possible absolute difference.


// Solution: Meet in the Middle w/ AVL Tree

// Note: The brute force solution going through each subset of 15 numbers out of the 30 numbers is too slow, because the number of combinations is 155,117,520.

// Split nums into two parts (cut in half).
// Because n <= 15, we can enumerate every subset.
// Use enumeration of bitmasks on the left half to get the subset sums for each subset size in an array `left`, where left[i] = an AVL tree of subset sums where the subset has size `i`.
// The aim is to select numbers from the left half and right half to form one array, such that the absolute difference between the sums of the 'selected' array and the 'unselected' array is minimized.

// Enumerate over each bitmask in the right half:
  // For a subset sum with size `i` and sum `sum`, 
    // In the AVL tree at left[n - i], binary search for the lowerBound and upperBound sums nearest to the desired sum: 
      // The best possible sum for one array is totalSum / 2, because the absolute difference will be 0.
      // The desired sum in the left half will be: (totalSum / 2) - sum
    // Take the minimum absolute difference out of lowerBound and upperBound.
      // lowerBound: The absolute difference between the following:
        // The numbers we have picked: (sum + lowerBound.val)
        // The numbers we have not picked: (totalSum - (sum + lowerBound.val))
      // upperBound: Same as the lowerBound.

// n = (length of nums) / 2
// Time Complexity: O(n * 2^n) 1547ms
// Space Complexity: O(2^n) 58.3MB
var minimumDifference = function(nums) {
  let n = nums.length / 2, totalSum = nums.reduce((sum, num) => sum + num);
  let left = Array(n + 1).fill(0).map(() => new AVLTree());
  for (let mask = 0; mask < (1 << n); mask++) {
    let sum = 0, size = 0;
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) {
        sum += nums[i];
        size++;
      }
    }
    left[size].insert(sum);
  }
  
  let desiredSum = totalSum / 2;
  let ans = Infinity;
  for (let mask = 0; mask < (1 << n); mask++) {
    let sum = 0, size = 0;
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) {
        sum += nums[i + n];
        size++;
      }
    }
    let desiredLeftSum = desiredSum - sum;
    let lowerBound = left[n - size].lowerBound(desiredLeftSum);
    let upperBound = left[n - size].upperBound(desiredLeftSum);
    let lowerBoundDiff = lowerBound ? Math.abs((totalSum - (sum + lowerBound.val)) - (sum + lowerBound.val)) : Infinity;
    let upperBoundDiff = upperBound ? Math.abs((totalSum - (sum + upperBound.val)) - (sum + upperBound.val)) : Infinity;
    ans = Math.min(ans, lowerBoundDiff, upperBoundDiff);
  }
  return ans;
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
  constructor(comparator = (a, b) => a - b.val) {
    this.root = null;
    this.comparator = comparator;
  }
  search(val, node = this.root) {
    if (!node) return null;

    const comparedResult = this.comparator(val, node);
    if (comparedResult === 0) return node;
    if (comparedResult < 0) {
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

    const comparedResult = this.comparator(val, node);
    if (comparedResult < 0) {
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

    const comparedResult = this.comparator(val, node);
    if (comparedResult < 0) {
      node.left = this._remove(val, nodeToRemove, node.left);
    } else if (comparedResult > 0) {
      node.right = this._remove(val, nodeToRemove, node.right);
    } else if (comparedResult === 0 && node === nodeToRemove) {
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
  lowerBound(val, node = this.root) { // find leftmost node, where the value >= val, or comparator result >= 0
    if (!node) return null;

    const comparedResult = this.comparator(val, node);
    if (comparedResult <= 0) {
      const res = this.lowerBound(val, node.left);
      return res ? res : node;
    } else {
      return this.lowerBound(val, node.right);
    }
  }
  upperBound(val, node = this.root) { // find rightmost node, where the value <= val, or comparator result <= 0
    if (!node) return null;

    const comparedResult = this.comparator(val, node);
    if (comparedResult >= 0) {
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

// Three test cases
console.log(minimumDifference([3,9,7,3])) // 2
console.log(minimumDifference([-36,36])) // 72
console.log(minimumDifference([2,-1,0,4,-2,-9])) // 0