// 3072. Distribute Elements Into Two Arrays II
// You are given a 1-indexed array of integers nums of length n.
// We define a function greaterCount such that greaterCount(arr, val) returns the number of elements in arr that are strictly greater than val.
// You need to distribute all the elements of nums between two arrays arr1 and arr2 using n operations. In the first operation, append nums[1] to arr1. In the second operation, append nums[2] to arr2. Afterwards, in the ith operation:
  // If greaterCount(arr1, nums[i]) > greaterCount(arr2, nums[i]), append nums[i] to arr1.
  // If greaterCount(arr1, nums[i]) < greaterCount(arr2, nums[i]), append nums[i] to arr2.
  // If greaterCount(arr1, nums[i]) == greaterCount(arr2, nums[i]), append nums[i] to the array with a lesser number of elements.
  // If there is still a tie, append nums[i] to arr1.
// The array result is formed by concatenating the arrays arr1 and arr2. For example, if arr1 == [1,2,3] and arr2 == [4,5,6], then result = [1,2,3,4,5,6].
// Return the integer array result.


// Solution: AVL Tree

// Use an AVL tree to find the number of greater elements in O(log(n)) time complexity.

// Note: AVL Tree is implemented from scratch since JS doesn't have a built-in self balancing BST.

// Time Complexity: O(n log(n)) 561ms
// Space Complexity: O(n) 86.1MB
var resultArray = function(nums) {
  let n = nums.length, left = new AVLTree(), right = new AVLTree();
  let arr1 = [nums[0]], arr2 = [nums[1]];
  left.insert(nums[0]), right.insert(nums[1]);
  for (let i = 2; i < n; i++) {
    let greaterLeft = left.countGreater(nums[i]);
    let greaterRight = right.countGreater(nums[i]);
    if (greaterLeft > greaterRight) {
      left.insert(nums[i]);
      arr1.push(nums[i]);
    } else if (greaterRight > greaterLeft) {
      right.insert(nums[i]);
      arr2.push(nums[i]);
    } else {
      if (left.getSize() <= right.getSize()) {
        left.insert(nums[i]);
        arr1.push(nums[i]);
      } else {
        right.insert(nums[i]);
        arr2.push(nums[i]);
      }
    }
  }
  return [...arr1, ...arr2];
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
  countGreater(val, node = this.root) {
    if (!node) return 0;

    if (node.val > val) {
      return 1 + this.getSize(node.right) + this.countGreater(val, node.left);
    } else {
      return this.countGreater(val, node.right);
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

// Three test cases
console.log(resultArray([2,1,3,3])) // [2,3,1,3]
console.log(resultArray([5,14,3,1,2])) // [5,3,1,2,14]
console.log(resultArray([3,3,3,3])) // [3,3,3,3]