// 3636. Threshold Majority Queries
// You are given an integer array nums of length n and an array queries, where queries[i] = [li, ri, thresholdi].
// Return an array of integers ans where ans[i] is equal to the element in the subarray nums[li...ri] that appears at least thresholdi times, selecting the element with the highest frequency (choosing the smallest in case of a tie), or -1 if no such element exists.


// Solution: Mo's Algorithm

// Split nums into sqrt(n) buckets, and sort queries by l/blockSize, where blockSize = sqrt(n).
// Within each block (l/blockSize), sort queries by r in asc order.

// Process the queries in sorted order, using a sliding window keeping track of:
  // Hashmap storing the current counts of each number within the window
  // AVL tree storing the counts of the counts of each number within the window

// Keep track of the left and right indices in the current window.
// As we process each query, move the indices up and down according to the query and update the AVL trees.
// The right index will increment linearly within a block.
// The left index will at worst case change O(sqrt(n)) per query since that is the size of each block.

// Note: This solution is TLE - passes 556/559 test cases
// Time Complexity: O((n + q) sqrt(n) * log(n))
// Space Complexity: O(n + q)
function subarrayMajority(nums, queries) {
  const n = nums.length, blockSize = Math.ceil(Math.sqrt(n));
  queries = queries.map((query, i) => [...query, i]).sort((a, b) => {
    const blockA = Math.floor(a[0] / blockSize);
    const blockB = Math.floor(b[0] / blockSize);
    if (blockA !== blockB) return blockA - blockB;
    return a[1] - b[1];
  });
  const count = {};
  const freqCount = new AVLTree((a, b) => { // [num, freq]
    if (a[1] !== b[1]) return b[1] - a[1];
    return a[0] - b[0];
  });
  const res = Array(queries.length);
  let currL = 0, currR = -1;
  for (let [l, r, threshold, index] of queries) {
    // order matters, moving l must come after moving r
    while (currR < r) {
      currR++;
      add(currR);
    }
    while (currR > r) {
      remove(currR);
      currR--;
    }
    while (currL < l) {
      remove(currL);
      currL++;
    }
    while (currL > l) {
      currL--;
      add(currL);
    }
    res[index] = getAnswer(threshold);
  }
  return res;

  function add(i) {
    const newCount = (count[nums[i]] || 0) + 1;
    count[nums[i]] = newCount;
    freqCount.insert([nums[i], newCount]);
    if (newCount > 1) {
      freqCount.remove([nums[i], newCount - 1]);
    }
  };

  function remove(i) {
    const newCount = count[nums[i]] - 1;
    count[nums[i]]--;
    freqCount.remove([nums[i], newCount + 1]);
    if (newCount > 0) {
      freqCount.insert([nums[i], newCount]);
    }
  };

  function getAnswer(threshold) {
    const max = freqCount.getKthSmallest(1);
    if (!max || max[1] < threshold) {
      return -1;
    }
    return max[0];
  };
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
console.log(subarrayMajority([1,1,2,2,1,1], [[0,5,4],[0,3,3],[2,3,2]])) // [1,-1,2]
console.log(subarrayMajority([3,2,3,2,3,2,3], [[0,6,4],[1,5,2],[2,4,1],[3,3,1]])) // [3,2,3,2]