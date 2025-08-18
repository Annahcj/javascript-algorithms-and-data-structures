// 3569. Maximize Count of Distinct Primes After Split
// You are given an integer array nums having length n and a 2D integer array queries where queries[i] = [idx, val].
// For each query:
  // 1. Update nums[idx] = val.
  // 2. Choose an integer k with 1 <= k < n to split the array into the non-empty prefix nums[0..k-1] and suffix nums[k..n-1] such that the sum of the counts of distinct prime values in each part is maximum.
// Note: The changes made to the array in one query persist into the next query.
// Return an array containing the result for each query, in the order they are given.


// Solution: Segment Tree w/ Range Updates

// Each distinct prime number in nums can either be included in the prefix OR suffix array, or it can be in both.
  // If there is only 1 occurrance, it will only be included on one side.
  // If there are 2+ occurrances, any cuts in between the leftmost and rightmost index of that prime number will cotribute to both sides.
// The goal is to make a cut such that we maximize the number of overlapping cuts.

// To keep track of the maximum count of an overlapping cut, while dynamically updating them, we can use a segment tree with range updates.

// Keep track of:
  // The indices of occurrances of each prime number in nums. 
    // Store these in an AVL tree for each prime number as we need to find the smallest and largest after removals and insertions.
  // Count of distinct primes in nums.
  // Segment tree where range query tells us the maximum count of an overlapping cut.

// On each query,
  // Add the index for the new number to the AVL tree, if it's prime.
  // Remove the index for the old number from the AVL tree, if it was prime.
  // Then, update the segment tree to reflect the new range counts for the new and old number.

// n = length of nums, m = number of queries
// Time Complexity: O(n + m log(n)) 1381ms
// Space Complexity: O(n + m) 108MB
function maximumCount(nums, queries) {
  const n = nums.length, primeIndices = {};
  const isPrime = sieve(Math.max(...nums, ...queries.map(([_, val]) => val)));
  let distinctPrimes = 0;
  for (let i = 0; i < n; i++) {
    if (!isPrime[nums[i]]) continue;
    if (!primeIndices[nums[i]]) {
      primeIndices[nums[i]] = new AVLTree();
      primeIndices[nums[i]].insert(i);
      distinctPrimes++;
    } else {
      primeIndices[nums[i]].insert(i);
    }
  }
  const segTree = new SegmentTree(n);
  for (let prime in primeIndices) {
    if (primeIndices[prime].getSize() > 1) {
      const leftmost = primeIndices[prime].getKthSmallest(1);
      const rightmost = primeIndices[prime].getKthLargest(1);
      segTree.updateRange(1, leftmost + 1, rightmost);
    }
  }
  const result = [];
  for (let [idx, val] of queries) {
    if (isPrime[nums[idx]]) {
      const indices = primeIndices[nums[idx]];
      const leftmost = indices.getKthSmallest(1);
      const rightmost = indices.getKthLargest(1);
      indices.remove(idx);
      if (indices.getSize() === 0) {
        distinctPrimes--;
      }
      if (idx === leftmost || idx === rightmost) {
        // update the segment tree if the range for the old value has changed
        const newLeftmost = indices.getKthSmallest(1);
        const newRightmost = indices.getKthLargest(1);
        segTree.updateRange(-1, leftmost + 1, rightmost);
        segTree.updateRange(1, newLeftmost + 1, newRightmost);
      }
    }
    if (isPrime[val]) {
      const indices = primeIndices[val];
      if (!indices || indices.getSize() === 0) { // new prime, doesn't go into segment tree
        distinctPrimes++;
        primeIndices[val] = new AVLTree();
        primeIndices[val].insert(idx);
      } else { // another occurrance of an existing prime, update segment tree removing the old range and adding the new range
        const leftmost = indices.getKthSmallest(1);
        const rightmost = indices.getKthLargest(1);
        if (leftmost !== rightmost) {
          segTree.updateRange(-1, leftmost + 1, rightmost);
        }
        const newLeftmost = Math.min(idx, leftmost);
        const newRightmost = Math.max(idx, rightmost);
        segTree.updateRange(1, newLeftmost + 1, newRightmost);
        indices.insert(idx);
      }
    }
    result.push(distinctPrimes + segTree.maxRange(1, n - 1));
    nums[idx] = val;
  }
  return result;
};

function sieve(n) {
  const isPrime = Array(n + 1).fill(true); 
  for (let i = 2; i <= n; i++) {
    if (!isPrime[i]) continue;
    for (let j = i * i; j <= n; j += i) { // we start from i * i instead of 2 * i since all smaller primes have already been covered
      isPrime[j] = false;
    }
  }
  isPrime[0] = false, isPrime[1] = false;
  return isPrime;
}

// Max range + add value to range
class SegmentTree {
  constructor(size) {
    this.size = size;
    this.tree = Array(size * 4).fill(0);
    this.lazy = Array(size * 4).fill(0);
  }

  // propagate lazy updates
  push(node) {
    this.tree[node * 2] += this.lazy[node];
    this.lazy[node * 2] += this.lazy[node];
    this.tree[node * 2 + 1] += this.lazy[node];
    this.lazy[node * 2 + 1] += this.lazy[node];
    this.lazy[node] = 0;
  }

  // add val to range
  updateRange(val, left, right, node = 1, start = 0, end = this.size - 1) { // start and end is range tree[node] represents, left and right is update range
    if (left > right) return;
    if (start === left && end === right) {
      this.tree[node] += val;
      this.lazy[node] += val;
      return;
    }
    this.push(node);
    const mid = Math.floor((start + end) / 2);
    this.updateRange(val, left, Math.min(right, mid), node * 2, start, mid);
    this.updateRange(val, Math.max(left, mid + 1), right, node * 2 + 1, mid + 1, end);
    this.tree[node] = Math.max(this.tree[node * 2], this.tree[node * 2 + 1]);
  }

  maxRange(left, right, node = 1, start = 0, end = this.size - 1) { // start and end is range tree[node] represents, left and right is query range
    if (left > right) return -Infinity;
    if (start === left && end === right) return this.tree[node];
    this.push(node);
    const mid = Math.floor((start + end) / 2);
    const leftMax = this.maxRange(left, Math.min(right, mid), node * 2, start, mid);
    const rightMax = this.maxRange(Math.max(left, mid + 1), right, node * 2 + 1, mid + 1, end);
    return Math.max(leftMax, rightMax);
  }
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
  constructor(comparator = (a, b) => a - b) {
    this.root = null;
    this.comparator = comparator;
  }

  find(val, node = this.root) {
    if (!node) return null;

    const comparedResult = this.comparator(val, node.val);
    if (comparedResult === 0) return node;
    if (comparedResult < 0) {
      return this.find(val, node.left);
    } else {
      return this.find(val, node.right);
    }
  }

  has(val) {
    const node = this.find(val);
    return !!node;
  }

  insert(val) {
    return (this.root = this._insert(val, this.root));
  }
  _insert(val, node) {
    if (!node) return new AVLTreeNode(val);

    const comparedResult = this.comparator(val, node.val);
    if (comparedResult < 0) {
      node.left = this._insert(val, node.left);
    } else {
      node.right = this._insert(val, node.right);
    }
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    node.size = 1 + this.getSize(node.left) + this.getSize(node.right);

    return this._rebalance(node);
  }

  remove(val, node = this.root) {
    // To ensure we don't delete all occurances of nodes with the given value, pass in the reference of one occurance.
    const nodeToRemove = this.find(val, node);
    if (!nodeToRemove) {
      return this.root;
    }

    return (this.root = this._remove(val, nodeToRemove, node));
  }
  _remove(val, nodeToRemove, node) {
    if (!node) return null;

    const comparedResult = this.comparator(val, node.val);
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

      node.right = this._remove(
        leftmostNode.val,
        this.find(leftmostNode.val, node.right),
        node.right
      );
    } else {
      return node;
    }
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    node.size = 1 + this.getSize(node.left) + this.getSize(node.right);

    return this._rebalance(node);
  }

  getKthLargestNode(k) {
    let node = this.root;
    if (!node || node.size <= 0 || node.size < k) return null; // there is no kth element

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

  getKthLargest(k) {
    const kthLargest = this.getKthLargestNode(k);
    return kthLargest?.val ?? null;
  }

  getKthSmallestNode(k) {
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

  getKthSmallest(k) {
    const kthSmallest = this.getKthSmallestNode(k);
    return kthSmallest?.val ?? null;
  }

  lowerBoundNode(val, node = this.root) {
    if (!node) return null;

    const comparedResult = this.comparator(node.val, val);
    if (comparedResult >= 0) {
      const res = this.lowerBoundNode(val, node.left);
      return res ? res : node;
    } else {
      return this.lowerBoundNode(val, node.right);
    }
  }

  lowerBound(val) {
    const lowerBoundNode = this.lowerBoundNode(val);
    return lowerBoundNode?.val ?? null;
  }

  upperBoundNode(val, node = this.root) {
    if (!node) return null;

    const comparedResult = this.comparator(node.val, val);
    if (comparedResult <= 0) {
      const res = this.upperBoundNode(val, node.right);
      return res ? res : node;
    } else {
      return this.upperBoundNode(val, node.left);
    }
  }

  upperBound(val) {
    const upperBoundNode = this.upperBoundNode(val);
    return upperBoundNode?.val ?? null;
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
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    rightNode.height =
      1 +
      Math.max(
        this._getHeight(rightNode.left),
        this._getHeight(rightNode.right)
      );

    node.size = 1 + this.getSize(node.left) + this.getSize(node.right);
    rightNode.size =
      1 + this.getSize(rightNode.left) + this.getSize(rightNode.right);

    return rightNode; // right node is the new root
  }

  _rightRotation(node) {
    let leftNode = node.left;
    let leftNodeRightChild = leftNode.right;
    leftNode.right = node;
    node.left = leftNodeRightChild;

    // node is now below leftNode and needs to be updated first
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    leftNode.height =
      1 +
      Math.max(this._getHeight(leftNode.left), this._getHeight(leftNode.right));

    node.size = 1 + this.getSize(node.left) + this.getSize(node.right);
    leftNode.size =
      1 + this.getSize(leftNode.left) + this.getSize(leftNode.right);

    return leftNode; // left node is the new root
  }

  _rebalance(node) {
    const balance = this._getBalance(node);
    if (balance > 1 && this._getBalance(node.left) >= 0) {
      // left left
      return this._rightRotation(node);
    } else if (balance > 1 && this._getBalance(node.left) < 0) {
      // left right
      node.left = this._leftRotation(node.left);
      return this._rightRotation(node);
    } else if (balance < -1 && this._getBalance(node.right) <= 0) {
      // right right
      return this._leftRotation(node);
    } else if (balance < -1 && this._getBalance(node.right) > 0) {
      // right left
      node.right = this._rightRotation(node.right);
      return this._leftRotation(node);
    }
    return node;
  }
}

// Two test cases
console.log(maximumCount([2,1,3,1,2], [[1,2],[3,3]])) // [3,4]
console.log(maximumCount([2,1,4], [[0,1]])) // [0]