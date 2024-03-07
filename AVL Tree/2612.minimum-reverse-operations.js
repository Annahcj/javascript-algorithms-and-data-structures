// 2612. Minimum Reverse Operations
// You are given an integer n and an integer p in the range [0, n - 1]. Representing a 0-indexed array arr of length n where all positions are set to 0's, except position p which is set to 1.
// You are also given an integer array banned containing some positions from the array. For the ith position in banned, arr[banned[i]] = 0, and banned[i] != p.
// You can perform multiple operations on arr. In an operation, you can choose a subarray with size k and reverse the subarray. However, the 1 in arr should never go to any of the positions in banned. In other words, after each operation arr[banned[i]] remains 0.
// Return an array ans where for each i from [0, n - 1], ans[i] is the minimum number of reverse operations needed to bring the 1 to position i in arr, or -1 if it is impossible.
  // A subarray is a contiguous non-empty sequence of elements within an array.
  // The values of ans[i] are independent for all i's.
  // The reverse of an array is an array containing the values in reverse order.


// Solution: BFS & AVL Tree

// Starting from p, use BFS to find the minimum moves for the 1 to get to each index.
// Each index will only be visited once, because the first time we reach an index is the minimum number of moves.

// Observation: All indices reachable after reversing any subarray of size k, will always have the same odd/even parity.
  // e.g: [0,1,2,3,4,5,6,7,8,9]
    // k = 4, index = 4: Indices reachable from 4 = [1,3,5,7] (notice they are all odd)
    // k = 5, index = 4: Indices reachable from 4 = [0,2,4,6,8] (notice they are all even)
// With this observation, we can split storage of available indices in two separate AVL trees (one for even indices, one for odd indices).
// From each index, visit all available indices within a range of indices (start, end), with the same odd/even parity. It's possible to reach every alternate index within this range.
// After visiting each neighboring index, remove it from the tree and add it to the queue.

// Calculating the start and end indices:
  // Start index: 
    // Normal case (index >= k - 1): index - k + 1
    // The edge case: Any indices within the leftmost subarray (0, k - 1) will get inverted within the subarray
      // Where does index go if we reverse the leftmost subarray?: k - index - 1
  // End index:
    // Normal case: index + k - 1
    // The edge case: Any indices within the rightmost subarray (n - k + 1, n - 1)
      // Where does index go if we reverse the leftmost subarray?
        // start of rightmost subarray: n - k
        // offset index: index - (n - k)
        // inversed offset index: k - offset index - 1
        // final index: start of rightmost subarray + inversed offset index

// Time Complexity: O(n log(n)) 923ms
// Space Complexity: O(n) 85.8MB
var minReverseOperations = function(n, p, banned, k) {
  let isBanned = Array(n).fill(false);
  for (let position of banned) {
    isBanned[position] = true;
  }
  let odd = new AVLTree(), even = new AVLTree();
  for (let i = 0; i < n; i++) {
    if (isBanned[i] || i === p) continue;
    if (i % 2 === 0) {
      even.insert(i);
    } else {
      odd.insert(i);
    }
  }
  let queue = [p], moves = 0;
  let ans = Array(n).fill(-1);
  while (queue.length) {
    let next = [];
    while (queue.length) {
      let index = queue.pop();
      ans[index] = moves;
      let startIndex = getStartIndex(n, k, index);
      let endIndex = getEndIndex(n, k, index);
      let tree = startIndex % 2 === 0 ? even : odd;
      
      let nextIndex = tree.lowerBound(startIndex);
      while (nextIndex && nextIndex.val <= endIndex) {
        let nextIndexVal = nextIndex.val;
        next.push(nextIndexVal);
        tree.remove(nextIndexVal);
        nextIndex = tree.lowerBound(nextIndexVal);
      }
    }
    queue = next;
    moves++;
  }
  return ans;
};

function getStartIndex(n, k, i) {
  if (i >= k - 1) return i - k + 1;
  return k - i - 1;
}

function getEndIndex(n, k, i) {
  if (i <= n - k) return i + k - 1;
  let startOfLastSubarray = n - k;
  let offsetIndex = i - startOfLastSubarray;
  let inversedOffsetIndex = k - offsetIndex - 1;
  return inversedOffsetIndex + startOfLastSubarray;
}

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

// Three test cases
console.log(minReverseOperations(4, 0, [1,2], 4)) // [0,-1,-1,1]
console.log(minReverseOperations(5, 0, [2,4], 3)) // [0,-1,-1,-1,-1]
console.log(minReverseOperations(4, 2, [0,1,3], 1)) // [-1,-1,0,-1]