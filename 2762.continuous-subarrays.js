// 2762. Continuous Subarrays
// You are given a 0-indexed integer array nums. A subarray of nums is called continuous if:
  // Let i, i + 1, ..., j be the indices in the subarray. Then, for each pair of indices i <= i1, i2 <= j, 0 <= |nums[i1] - nums[i2]| <= 2.
// Return the total number of continuous subarrays.
// A subarray is a contiguous non-empty sequence of elements within an array.


// Solution: Two Monotonic Queues

// Use two deques to keep track of the indices of the maximum and minimum numbers so far.
// queueDec: monotonic decreasing queue of numbers so far
// queueInc: monotonic increasing queue of numbers so far

// For each nums[i], count the number of subarrays that end with nums[i].
  // 1. Pop out elements from the back of the queues to maintain the monotonic decreasing and increasing properties.
  // 2. Pop out elements from the front of the queue that have gone out of range (difference between nums[queue.front()] and nums[i] is greater than 2).
  // 3. Between the two indexes at the front of the both queues, we take the maximum index. The number of subarrays ending at nums[i] = i - Math.max(decIndex, incIndex) + 1
  // Note: 
    // Instead of taking the indexes from the front of the queues, we maintain two separate pointers and update them as we remove elements from the front of the queues. 
    // This is because even if the queue is empty, there can be valid indexes.
    // e.g: in queueDec, all elements between nums[i] and nums[queueDec.back()] are guaranteed to be smaller than nums[i]. And if the queue becomes empty, such elements may still exist. Therefore we need to update the pointers to be queue.front() + 1 as we remove elements.

// Time Complexity: O(n) 198ms
// Space Complexity: O(n) 91MB
var continuousSubarrays = function(nums) {
  let n = nums.length, queueDec = new Deque(), queueInc = new Deque();
  let ans = 0, decIndex = 0, incIndex = 0;
  for (let i = 0; i < n; i++) {
    // pop out elements from the back of the queues to maintain the monotonic decreasing and increasing properties
    while (!queueDec.isEmpty() && nums[queueDec.back()] < nums[i]) queueDec.pop();
    while (!queueInc.isEmpty() && nums[queueInc.back()] > nums[i]) queueInc.pop();
    // pop out elements from the front of the queue that are out of range
    while (!queueDec.isEmpty() && nums[queueDec.front()] > nums[i] + 2) {
      decIndex = queueDec.front() + 1;
      queueDec.popLeft();
    }
    while (!queueInc.isEmpty() && nums[queueInc.front()] < nums[i] - 2) {
      incIndex = queueInc.front() + 1;
      queueInc.popLeft();
    }
    let count = i - Math.max(incIndex, decIndex) + 1;
    ans += count;
    queueDec.push(i), queueInc.push(i);
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
  push(val) {
    let node = new Node(val);
    node.prev = this.tail.prev;
    node.next = this.tail;
    this.tail.prev.next = node;
    this.tail.prev = node;
    this.size++;
  }
  popLeft() {
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
console.log(continuousSubarrays([5,4,2,4])) // 8
console.log(continuousSubarrays([1,2,3])) // 6