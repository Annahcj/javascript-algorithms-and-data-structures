// 731. My Calendar II
// You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a triple booking.
// A triple booking happens when three events have some non-empty intersection (i.e., some moment is common to all the three events.).
// The event can be represented as a pair of integers start and end that represents a booking on the half-open interval [start, end), the range of real numbers x such that start <= x < end.
// Implement the MyCalendarTwo class:
  // MyCalendarTwo() Initializes the calendar object.
  // boolean book(int start, int end) Returns true if the event can be added to the calendar successfully without causing a triple booking. Otherwise, return false and do not add the event to the calendar.


// Solution: Two AVL Trees

// Keep track of two AVL trees of intervals.
  // singleBooking: intervals representing all intervals
  // doubleBooking: intervals representing intervals that strictly overlap

// When booking, check whether the interval (start, end) overlaps with any intervals in doubleBooking. If so, it's a triple booking.
// Otherwise, check whether (start, end) overlaps with any booking in singleBooking, and add the overlapping segment to doubleBooking, and the non-overlapping segments to singleBooking.
  // Find overlapping intervals in doubleBooking
    // If there is at least one overlapping interval, return false.
    // If there are no overlapping intervals, find overlapping intervals in singleBooking
      // There will be at most 3 split intervals after this:
        // 1. The left outer interval (no overlap)
        // 2. The overlapping interval
        // 3. The right outer interval (no overlap)

// Time Complexity: O(n log(n)) 176ms
// Space Complexity: O(n) 58.9MB
var MyCalendarTwo = function() {
  // a = [start, end], b = {val: [start, end]}
  this.singleBooking = new AVLTree((a, b) => {
    if (hasOverlap(a, b.val)) return 0;
    return b.val[0] > a[1] ? -1 : 1;
  });
  this.doubleBooking = new AVLTree((a, b) => {
    if (hasOverlap(a, b.val)) return 0;
    return b.val[0] > a[1] ? -1 : 1;
  });
};

MyCalendarTwo.prototype.book = function(start, end) {
  end--; // make end inclusive
  
  let hasTripleBooking = this.doubleBooking.search([start, end]);
  if (hasTripleBooking) {
    return false;
  } else {
    // leftmost overlapping interval
    let singleBooking = this.singleBooking.lowerBound([start, end]);
    let nonOverlapping = [], overlapping = [];
    if (!singleBooking || !hasOverlap([start, end], singleBooking.val)) {
      this.singleBooking.insert([start, end]);
      return true;
    }
    
    let currStart = start, lastEnd = end;
    while (singleBooking && hasOverlap([currStart, end], singleBooking.val)) {
      let [l, r] = singleBooking.val;
      if (currStart !== l) {
        let nonOverlappingStart = Math.min(currStart, l);
        let nonOverlappingEnd = Math.max(currStart, l) - 1;
        if (nonOverlappingStart <= nonOverlappingEnd) nonOverlapping.push([nonOverlappingStart, nonOverlappingEnd]);
      }
      overlapping.push([Math.max(currStart, l), Math.min(r, end)]);
      currStart = Math.min(end, r) + 1;
      lastEnd = Math.max(lastEnd, r);
      this.singleBooking.remove([l, r]);
      singleBooking = this.singleBooking.lowerBound([start, end]);
    }
    if (currStart <= lastEnd) {
      nonOverlapping.push([currStart, lastEnd]);
    }
    
    // add nonOverlapping intervals to singleBooking
    // add overlapping interval to doubleBooking
    for (let interval of nonOverlapping) {
      if (interval[0] <= interval[1]) {
        this.singleBooking.insert(interval); 
      }
    }
    for (let interval of overlapping) {
      this.doubleBooking.insert(interval);
    }
    return true;
  }
};

function hasOverlap(int1, int2) {
  return int1[0] <= int2[1] && int1[1] >= int2[0];
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

// A few test cases
let myCalendarTwo = new MyCalendarTwo();
console.log(myCalendarTwo.book(10, 20)); // return True, The event can be booked. 
console.log(myCalendarTwo.book(50, 60)); // return True, The event can be booked. 
console.log(myCalendarTwo.book(10, 40)); // return True, The event can be double booked. 
console.log(myCalendarTwo.book(5, 15));  // return False, The event cannot be booked, because it would result in a triple booking.
console.log(myCalendarTwo.book(5, 10)); // return True, The event can be booked, as it does not use time 10 which is already double booked.
console.log(myCalendarTwo.book(25, 55)); // return True, The event can be booked, as the time in [25, 40) will be double booked with the third event, the time [40, 50) will be single booked, and the time [50, 55) will be double booked with the second event.