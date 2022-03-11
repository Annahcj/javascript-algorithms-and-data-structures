// 1425. Constrained Subsequence Sum
// Given an integer array nums and an integer k, return the maximum sum of a non-empty subsequence of that array such that for every two consecutive integers in the subsequence, nums[i] and nums[j], where i < j, the condition j - i <= k is satisfied.
// A subsequence of an array is obtained by deleting some number of elements (can be zero) from the array, leaving the remaining elements in their original order.


// Solution: DP w/ Montonic Decreasing Queue

// dp[i] = sum of best subsequence ending at index i.
// Maintain a monotonic decreasing queue (queue[0] is the max), implemented with a doubly linked list.
// Keep the indices in the queue instead of the actual value so that removal is easier.

// Time Complexity: O(n) 212ms
// Space Complexity: O(n) 75.2MB
var constrainedSubsetSum = function(nums, k) {
  let queue = new Deque(), n = nums.length, dp = Array(n);
  let res = -Infinity;
  for (let i = 0; i < n; i++) {
    while (queue.size && queue.front() < i - k) queue.shift(); // remove expired
    let queueBest = queue.size ? dp[queue.front()] : 0, best = Math.max(nums[i], nums[i] + queueBest); // nums[i] by itself, or the best previous subsequence
    dp[i] = best;
    res = Math.max(res, dp[i]);
    
    while (queue.size && dp[queue.back()] <= best) queue.pop(); // pop out smaller to maintain decreasing
    queue.push(i);
  }
  return res;
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

// Two test cases to run function on
console.log(constrainedSubsetSum([10,2,-10,5,20], 2)) // 37
console.log(constrainedSubsetSum([-1,-2,-3], 1)) // -1