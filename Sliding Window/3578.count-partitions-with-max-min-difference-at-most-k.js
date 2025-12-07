// 3578. Count Partitions With Max-Min Difference at Most K
// You are given an integer array nums and an integer k. Your task is to partition nums into one or more non-empty contiguous segments such that in each segment, the difference between its maximum and minimum elements is at most k.
// Return the total number of ways to partition nums under this condition.
// Since the answer may be too large, return it modulo 10^9 + 7.


// Solution: DP, Sliding Window & Monotonic Queues

// dp[j] = number of splits up with the last subarray ending at index j.
// Each dp[j] = the sum of each dp[i] where (i, j) is a valid subarray.
// Find the leftmost index i where (i, j) is a valid subarray.
// Then, use prefix sum to get the sum of dp[i - 1] to dp[j].

// The question is, how to find the leftmost index i where (i, j) is a valid subarray?
  // Maintain a sliding window where difference between max and min element <= k.
  // Maintain two monotonic deques:
    // Monotonic decreasing deque to keep track of the maximum elements.
    // Monotonic increasing deque to keep track of the minimum elements.
  // As the right pointer moves up, move up the left pointer while max element - min element > k (leftmost element of both deques).
  // Remove elements from the deque while the index < left pointer.

// Time Complexity: O(n) 98ms
// Space Complexity: O(n) 89MB
function countPartitions(nums, k) {
  const n = nums.length, dp = Array(n + 2).fill(0);
  dp[1] = 1;
  const pSum = [...dp], MOD = 1000000007;
  const maxDeque = new DoubleEndedQueue(), minDeque = new DoubleEndedQueue();
  for (let j = 0, i = 0; j < n; j++) {
    while (!maxDeque.isEmpty() && nums[maxDeque.back()] <= nums[j]) {
      maxDeque.pop();
    }
    maxDeque.push(j);
    while (!minDeque.isEmpty() && nums[minDeque.back()] >= nums[j]) {
      minDeque.pop();
    }
    minDeque.push(j);
    while (nums[maxDeque.front()] - nums[minDeque.front()] > k) {
      if (maxDeque.front() === i) maxDeque.shift();
      if (minDeque.front() === i) minDeque.shift();
      i++;
    }
    dp[j + 2] += (pSum[j + 1] - pSum[i] + MOD) % MOD;
    pSum[j + 2] = (dp[j + 2] + pSum[j + 1]) % MOD;
  }
  return dp[n + 1];
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

// Two test cases
console.log(countPartitions([9,4,1,3,7], 4)) // 6
console.log(countPartitions([3,3,4], 0)) // 2