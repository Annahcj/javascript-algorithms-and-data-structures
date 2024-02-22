// 3013. Divide an Array Into Subarrays With Minimum Cost II
// You are given a 0-indexed array of integers nums of length n, and two positive integers k and dist.
// The cost of an array is the value of its first element. For example, the cost of [1,2,3] is 1 while the cost of [3,4,1] is 3.
// You need to divide nums into k disjoint contiguous subarrays, such that the difference between the starting index of the second subarray and the starting index of the kth subarray should be less than or equal to dist. In other words, if you divide nums into the subarrays nums[0..(i1 - 1)], nums[i1..(i2 - 1)], ..., nums[ik-1..(n - 1)], then ik-1 - i1 <= dist.
// Return the minimum possible sum of the cost of these subarrays.


// Solution: Sliding Window & AVL Tree

// Find the k-1 maximum numbers within a window smaller than or equal to dist.
// (nums[0] is always included by default as the first subarray).

// Maintain a sliding window of size dist + 1.
// Use an AVL tree to retrieve, insert, and delete items in O(log(n)) time complexity.
// As we move the window,
  // Add nums[i] to the tree. 
    // If nums[i] is smaller than the kth smallest number in the tree, then add it to the sum.
    // If we have more than k elements in the tree, subtract the kth element before nums[i] was added in.
  // Remove nums[i - k] from the tree. 
    // If the removed element is smaller than the kth smallest number in the tree, 
      // Subtract it from the sum.
      // Add the kth smallest number to the sum since it's now in the top k after the removal.

// Time Complexity: O(n log(dist)) 545ms
// Space Complexity: O(dist) 77MB
var minimumCost = function(nums, k, dist) {
  dist++, k--;
  let avlTree = new AVLTree();
  let n = nums.length, sum = 0, maxSum = Infinity;
  for (let i = 1; i < n; i++) {
    let kthSmallest = avlTree.getKthSmallest(k);
    if (!kthSmallest || nums[i] < kthSmallest.val) {
      sum += nums[i];
      sum -= kthSmallest?.val ?? 0;
    }
    avlTree.insert(nums[i]);
    if (i >= dist + 1) {
      avlTree.remove(nums[i - dist]);
      kthSmallest = avlTree.getKthSmallest(k).val;
      if (nums[i - dist] < kthSmallest) {
        sum -= nums[i - dist];
        sum += kthSmallest;
      }
    }
    if (i >= dist) maxSum = Math.min(maxSum, sum);
  }
  return maxSum + nums[0];
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
console.log(minimumCost([1,3,2,6,4,2], 3, 3)) // 5
console.log(minimumCost([10,1,2,2,2,1], 4, 3)) // 15
console.log(minimumCost([10,8,18,9], 3, 1)) // 36