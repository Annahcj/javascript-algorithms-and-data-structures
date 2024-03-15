// 1755. Closest Subsequence Sum
// You are given an integer array nums and an integer goal.
// You want to choose a subsequence of nums such that the sum of its elements is the closest possible to goal. That is, if the sum of the subsequence's elements is sum, then you want to minimize the absolute difference abs(sum - goal).
// Return the minimum possible value of abs(sum - goal).
// Note that a subsequence of an array is an array formed by removing some elements (possibly all or none) of the original array.


// Solution 1: Meet in the middle w/ Arrays

// Divide nums into two halves -> left, right
// Generate all possible sums for the left half and store in an array -> left
// Generate all possible sums for the right half and store in an array -> right

// Sort the right half in asc order.
// Now we can loop through left and binary search through right to find the closest total sum to goal.

// Time Complexity: O(2^(n/2)) 1565ms
// Space Complexity: O(n) 133.3MB
var minAbsDifference = function(nums, goal) {
  let midPoint = Math.floor(nums.length / 2);
  let left = [], right = [];
  // generate all possible sums for left half
  generateSums(0, midPoint, 0, left);
  // generate all possible sums for right half
  generateSums(midPoint, nums.length, 0, right);

  // sort right half
  right.sort((a, b) => a - b);

  let ans = Infinity;
  for (let sum of left) {
    let target = goal - sum;
    // binary search to find closest possible to target
    let idx = binarySearch(right, target);
    ans = Math.min(ans, Math.abs(right[idx] - target));
    // note: the binary search returns first element larger than target, so we have to check for idx - 1 also
    if (idx > 0) ans = Math.min(ans, Math.abs(right[idx - 1] - target));
  }
  return ans;

  // binary search to find first element larger than target
  function binarySearch(arr, target) {
    let low = 0, high = arr.length - 1;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (arr[mid] > target) high = mid;
      else low = mid + 1;
    }
    return low;
  }
  // generate all possible sums from the array half
  function generateSums(i, end, currSum, arr) {
    if (i === end) {
      arr.push(currSum);
      return;
    }
    generateSums(i + 1, end, currSum, arr);
    generateSums(i + 1, end, currSum + nums[i], arr);
  } 
};

// Solution 2: Meet in the Middle w/ AVL Tree

// 1. Split nums into two halves, left and right.
// 2. Enumerate each bitmask of the left half to get each subset sum and add them to an AVL tree.
// 3. Enumerate each bitmask of the right half to get each subset sum and binary search for the sum from the left half closest to the target sum:
  // The targetLeftSum = goal - rightSum
  // Search for the lowerBound and upperBound sums closest to the targetLeftSum and take the one that results in a smaller absolute difference.

// n = length of nums
// Time Complexity: O(n * 2^(n/2)) 2687ms
// Space Complexity: O(2^(n/2)) 121.9MB
var minAbsDifference = function(nums, goal) {
  let n = nums.length, mid = Math.floor(n / 2);
  let left = nums.slice(0, mid), leftSize = left.length;
  let right = nums.slice(mid), rightSize = right.length;
  let leftSubsetSums = new AVLTree();
  for (let mask = 0; mask < (1 << leftSize); mask++) {
    let sum = 0;
    for (let i = 0; i < leftSize; i++) {
      if ((mask >> i) & 1) {
        sum += left[i];
      }
    }
    leftSubsetSums.insert(sum);
  }
  
  let ans = Infinity;
  for (let mask = 0; mask < (1 << rightSize); mask++) {
    let rightSum = 0;
    for (let i = 0; i < rightSize; i++) {
      if ((mask >> i) & 1) {
        rightSum += right[i];
      }
    }
    let targetLeftSum = goal - rightSum;
    let lowerBound = leftSubsetSums.lowerBound(targetLeftSum);
    let upperBound = leftSubsetSums.upperBound(targetLeftSum);
    let lowerBoundAbsDiff = lowerBound ? Math.abs(lowerBound.val + rightSum - goal) : Infinity;
    let upperBoundAbsDiff = upperBound ? Math.abs(upperBound.val + rightSum - goal) : Infinity;
    ans = Math.min(ans, lowerBoundAbsDiff, upperBoundAbsDiff);
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
console.log(minAbsDifference([5,-7,3,5], 6)) // 0
console.log(minAbsDifference([7,-9,15,-2], -5)) // 1
console.log(minAbsDifference([1,2,3], -7)) // 7