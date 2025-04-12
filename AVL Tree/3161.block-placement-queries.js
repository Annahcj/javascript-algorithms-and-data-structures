// 3161. Block Placement Queries
// There exists an infinite number line, with its origin at 0 and extending towards the positive x-axis.
// You are given a 2D array queries, which contains two types of queries:
  // 1. For a query of type 1, queries[i] = [1, x]. Build an obstacle at distance x from the origin. It is guaranteed that there is no obstacle at distance x when the query is asked.
  // 2. For a query of type 2, queries[i] = [2, x, sz]. Check if it is possible to place a block of size sz anywhere in the range [0, x] on the line, such that the block entirely lies in the range [0, x]. A block cannot be placed if it intersects with any obstacle, but it may touch it. Note that you do not actually place the block. Queries are separate.
// Return a boolean array results, where results[i] is true if you can place the block specified in the ith query of type 2, and false otherwise.


// Solution: Segment Tree & AVL Tree

// Another way to approach this is to process the queries in reverse.
// Instead of making gaps smaller as obstacles are added, process all obstacles first, then remove them one-by-one increasing the gaps.

// First, get all the gaps between the obstacles and store the gaps in a segment tree.
  // index = x
  // value = gap between x and previous obstacle
// Note: It's important that the segment tree tracks the gap between x and the previous obstacle, not x and the next obstacle, because that gap is only valid for indices at x or right of x, but not on the left.
// Store the obstacles in an AVL tree in order to store and query them in sorted order.

// Process queries in reverse,
  // If an obstacle, remove the obstacle from the AVL tree and update the segment tree entry of the next obstacle to next obstacle - obstacle left of x.
  // If a query, check if sz >= maximum gap in the range (0, x) OR sz >= x - rightmost obstacle on the left of x.

// n = number of queries, m = max(x)
// Time Complexity: O(n log(m)) 809ms
// Space Complexity: O(m) 113.3MB
function getResults(queries) {
  const avlTree = new AVLTree();
  let obstacles = new Set([0]), max = 0;
  avlTree.insert(0);
  for (let [type, x] of queries) {
    if (type === 1) {
      obstacles.add(x);
      avlTree.insert(x);
    }
    max = Math.max(max, x);
  }
  if (!obstacles.has(max)) {
    obstacles.add(max);
    avlTree.insert(max);
  }
  obstacles = [...obstacles].sort((a, b) => a - b);
  const segTree = new SegmentTree(max + 1), n = obstacles.length;
  for (let i = 1; i < n; i++) {
    segTree.update(obstacles[i], obstacles[i] - obstacles[i - 1]);
  }
  const results = [];
  for (let i = queries.length - 1; i >= 0; i--) {
    const [type, x] = queries[i];
    if (type === 1) {
      avlTree.remove(x);
      const rightmostOnLeft = avlTree.upperBound(x);
      const leftmostOnRight = avlTree.lowerBound(x);
      segTree.update(leftmostOnRight, leftmostOnRight - rightmostOnLeft);
    } else {
      const sz = queries[i][2];
      const rightmostOnLeft = avlTree.upperBound(x);
      results.push(segTree.maxRange(0, x) >= sz || x - rightmostOnLeft >= sz);
    }
  }
  return results.reverse();
};

class SegmentTree {
  constructor(n) {
    this.size = n;
    this.segTree = Array(n * 2).fill(0);
  }
  update(index, value) {
    let n = this.size, idx = index + n;
    this.segTree[idx] = value;
    idx = Math.floor(idx / 2);

    while (idx > 0) {
      this.segTree[idx] = Math.max(this.segTree[idx * 2], this.segTree[idx * 2 + 1]);
      idx = Math.floor(idx / 2);
    }
  }
  maxRange(left, right) {
    if (left > right) return 0;
    let n = this.size, max = 0;
    let left_idx = left + n, right_idx = right + n;
    while (left_idx <= right_idx) {
      if (left_idx % 2 === 1) max = Math.max(max, this.segTree[left_idx++]);
      if (right_idx % 2 === 0) max = Math.max(max, this.segTree[right_idx--]);
      left_idx = Math.floor(left_idx / 2);
      right_idx = Math.floor(right_idx / 2);
    }
    return max;
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
  lowerBoundNode(val, node = this.root) { // find leftmost node, where the value >= val, or comparator result >= 0
    if (!node) return null;

    const comparedResult = this.comparator(val, node);
    if (comparedResult <= 0) {
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
  upperBoundNode(val, node = this.root) { // find rightmost node, where the value <= val, or comparator result <= 0
    if (!node) return null;

    const comparedResult = this.comparator(val, node);
    if (comparedResult >= 0) {
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
console.log(getResults([[1,2],[2,3,3],[2,3,1],[2,2,2]])) // [false,true,true]
console.log(getResults([[1,7],[2,7,6],[1,2],[2,7,5],[2,7,6]])) // [true,true,false]