// 703. Kth Largest Element in a Stream
// Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.
// Implement KthLargest class:
  // KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of integers nums.
  // int add(int val) Appends the integer val to the stream and returns the element representing the kth largest element in the stream.


// Solution: Min Heap

// Runtime on LeetCode: 148ms
// Memory Usage on LeetCode: 49.8MB

// Time Complexity: O(n log(k))
// Space Complexity: O(k)

// Create a new min heap
// Add each number to the min heap,
  // if the size goes over k, remove the smallest item (then we will only have the biggest elements remaining)


// add: 
// Time Complexity: O(log(k))
// Space Complexity: O(1)
  // Add val to the min heap
  // If the size goes over k, remove the smallest item.
  // Return the first item in the min heap.

var KthLargest = function(k, nums) {
  this.k = k;
  this.heap = new Heap((a, b) => a - b);
  for (var num of nums) {
    this.heap.add(num);
    if (this.heap.size() > k) this.heap.remove();
  }
};

KthLargest.prototype.add = function(val) {
  this.heap.add(val);
  if (this.heap.size() > this.k) this.heap.remove();
  return this.heap.values[0];
};

class Heap {
  constructor(comparator = (a, b) => a - b) {
    this.values = [];
    this.comparator = comparator;
  }
  add(val) {
    this.values.push(val);
    let idx = this.values.length - 1;
    let parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.comparator(this.values[idx], this.values[parentIdx]) < 0) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
    return val;
  }
  remove() {
    if (!this.values.length) return -1;
    if (this.values.length === 1) return this.values.pop();
    let value = this.values[0];
    let popped = this.values.pop();
    this.values[0] = popped;
    let idx = 0;
    let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
    let childIdx = getChild(this.values, leftIdx, rightIdx, this.comparator);
    function getChild(vals, leftIdx, rightIdx, comparator) {
      let end = vals.length - 1;
      if (leftIdx > end && rightIdx > end) return -1;
      if (rightIdx > end) return leftIdx;
      if (comparator(vals[leftIdx], vals[rightIdx]) < 0) return leftIdx;
      return rightIdx;
    }
    while (childIdx > -1 && this.comparator(this.values[idx], this.values[childIdx]) > 0) {
      [this.values[idx], this.values[childIdx]] = [this.values[childIdx], this.values[idx]];
      idx = childIdx;
      leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      childIdx = getChild(this.values, leftIdx, rightIdx, this.comparator);
    }
    return value;
  }
  isEmpty() {
    return this.values.length === 0;
  }
  size() {
    return this.values.length;
  }
}

// A few test cases
let kthLargest = new KthLargest(3, [4, 5, 8, 2]);
console.log(kthLargest.add(3));   // return 4
console.log(kthLargest.add(5));   // return 5
console.log(kthLargest.add(10));  // return 5
console.log(kthLargest.add(9));   // return 8
console.log(kthLargest.add(4));   // return 8