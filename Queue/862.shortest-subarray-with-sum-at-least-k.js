// 862. Shortest Subarray with Sum at Least K
// Given an integer array nums and an integer k, return the length of the shortest non-empty subarray of nums with a sum of at least k. If there is no such subarray, return -1.
// A subarray is a contiguous part of an array.


// Solution: Deque w/ Prefix Sum

// Store prefix sums in a deque with monotonic increasing order.
// Pop sums off the top of the deque while the sum is larger than the current sum. 
  // This means the sum of the subarray is negative, so there is no point making a longer subarray for that, the current starting index is better.
// Remove sums from the left of the deque while current prefix sum - pSum[left of deque] > k.
// Record the shortest subarray length out of every pSum[i] - pSum[left of deque].

// Time Complexity: O(n) 82ms
// Space Complexity: O(n) 76.8MB
function shortestSubarray(nums, k) {
  let n = nums.length, deque = new DoubleEndedQueue();
  let pSum = [...nums], minLen = Infinity;
  for (let i = 0; i < n; i++) {
    if (i > 0) pSum[i] += pSum[i - 1];
    if (pSum[i] >= k) minLen = Math.min(minLen, i + 1);
    while (!deque.isEmpty() && pSum[deque.back()] >= pSum[i]) {
      deque.pop();
    }
    while (!deque.isEmpty() && pSum[i] - pSum[deque.front()] >= k) {
      // it's fine to remove the only valid index from the deque as the current index will guarantee the shortest possible subarray length, don't need it for any other subarray.
      minLen = Math.min(minLen, i - deque.shift());
    }
    deque.push(i);
  }
  return minLen === Infinity ? -1 : minLen;
};

class DoubleEndedQueue {
  constructor() {
    this.head = new Node(null);
    this.tail = new Node(null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }
  unshift(val) {
    let node = new Node(val);
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
    this.size++;
  }
  push(val) {
    let node = new Node(val);
    node.prev = this.tail.prev;
    node.next = this.tail;
    this.tail.prev.next = node;
    this.tail.prev = node;
    this.size++;
  }
  shift() {
    let head = this.head.next;
    this.removeNode(head);
    this.size--;
    return head.val;
  }
  pop() {
    let tail = this.tail.prev;
    this.removeNode(tail);
    this.size--;
    return tail.val;
  }
  removeNode(node) {
    if (!node.prev && !node.next) return;
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.prev = null;
    node.next = null;
  }
  front() {
    return this.head.next.val;
  }
  back() {
    return this.tail.prev.val;
  }
  isEmpty() {
    return this.size === 0;
  }
  toArray() {
    const values = [];
    let node = this.head.next;
    while (node !== this.tail) {
      values.push(node.val);
      node = node.next;
    }
    return values;
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

// Three test cases
console.log(shortestSubarray([1], 1)) // 1
console.log(shortestSubarray([1, 2], 4)) // -1
console.log(shortestSubarray([2,-1,2], 3)) // 3