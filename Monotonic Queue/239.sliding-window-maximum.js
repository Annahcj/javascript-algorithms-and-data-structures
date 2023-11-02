// 239. Sliding Window Maximum
// You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.
// Return the max sliding window.


// Solution: Monotonic Decreasing Deque

// Maintain a monotonic decreasing deque.
// For each nums[i], 
  // Remove expired elements (gone outside the window) from the start of the deque (gone outside the window).
  // Remove elements from the end of the deque that are smaller than nums[i] (there is no point keeping smaller elements that have a higher chance of leaving the window sooner)
  // Push nums[i] to the end of the deque.
  // The element at the start of the deque is the maximum element in the current window.

// Time Complexity: O(n) 258ms
// Space Complexity: O(k) (excluding output) 85.8MB
var maxSlidingWindow = function(nums, k) {
  let n = nums.length, deque = new Deque(), ans = Array(n - k + 1);
  for (let i = 0; i < n; i++) {
    while (!deque.isEmpty() && i - deque.front() >= k) deque.shift();
    while (!deque.isEmpty() && nums[deque.back()] <= nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) ans[i - k + 1] = nums[deque.front()];
  }
  return ans;
};

class Deque {
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
}

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}
  
// Two test cases 
console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)) // [3,3,5,5,6,7]
console.log(maxSlidingWindow([1,-1], 1)) // [1, -1]