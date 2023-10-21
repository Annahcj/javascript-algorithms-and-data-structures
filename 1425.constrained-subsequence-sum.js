// 1425. Constrained Subsequence Sum
// Given an integer array nums and an integer k, return the maximum sum of a non-empty subsequence of that array such that for every two consecutive integers in the subsequence, nums[i] and nums[j], where i < j, the condition j - i <= k is satisfied.
// A subsequence of an array is obtained by deleting some number of elements (can be zero) from the array, leaving the remaining elements in their original order.


// Solution: Monotonic Decreasing Deque

// Maintain a monotonic decreasing deque of indices and maximum sums ([index, maximum sum]).

// For each nums[i], 
  // 1. Remove from the front of the deque while i - queue.front()'s index > k.
  // 2. The maximum sum up to nums[i] = nums[i] + queue.front()'s max sum.
  // 3. Remove from the back of the deque while queue.back()'s max sum <= dp[i].
  // 4. Push the current index i to the back of the deque.

// Time Complexity: O(n) 115ms
// Space Complexity: O(k) 71.6MB
var constrainedSubsetSum = function(nums, k) {
  let n = nums.length, deque = new Deque(), ans = -Infinity;
  for (let i = 0; i < n; i++) {
    while (!deque.isEmpty() && i - deque.front()[0] > k) deque.shift();
    let maxSum = deque.isEmpty() ? nums[i] : Math.max(nums[i], nums[i] + deque.front()[1]);
    while (!deque.isEmpty() && deque.back()[1] <= maxSum) deque.pop();
    deque.push([i, maxSum]);
    ans = Math.max(ans, maxSum);
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
console.log(constrainedSubsetSum([10,2,-10,5,20], 2)) // 37
console.log(constrainedSubsetSum([-1,-2,-3], 1)) // -1