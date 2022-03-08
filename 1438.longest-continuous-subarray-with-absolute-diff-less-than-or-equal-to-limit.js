// 1438. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit
// Given an array of integers nums and an integer limit, return the size of the longest non-empty subarray such that the absolute difference between any two elements of this subarray is less than or equal to limit.


// Solution: Sliding Window & Montonic Increasing/Decreasing Queue

// Since JS doesn't have a deque, I implemented my own with a doubly linked list structure.
// Insertion/deletion from the front and back is O(1).

// Use two deques to keep track of the minimum and maximum within the window.
  // min_queue: monotonic increasing queue (min_queue[0] is min)
  // max_queue: monotonic decreasing queue (max_queue[0] is max)
// Instead of storing the values of nums in the queues, store the indices. 

// Maintain two pointers for a sliding window where max - min is within the limit.
// Record the length of the longest window.

// Time Complexity: O(n) 149ms
// Space Complexity: O(n) 54.2MB
var longestSubarray = function(nums, limit) {
  let min_queue = new Deque(), max_queue = new Deque();
  let ans = 0;
  for (let j = 0, i = 0; j < nums.length; j++) {
    while (min_queue.size && nums[min_queue.back()] >= nums[j]) min_queue.pop(); // pop out larger elements
    while (max_queue.size && nums[max_queue.back()] <= nums[j]) max_queue.pop(); // pop out smaller elements
    min_queue.push(j), max_queue.push(j);
    
    while (nums[max_queue.front()] - nums[min_queue.front()] > limit) { // move up the left pointer until max - min is within the limit
      i++;
      // remove invalid
      while (min_queue.front() < i) min_queue.shift(); 
      while (max_queue.front() < i) max_queue.shift(); 
    }
    ans = Math.max(ans, j - i + 1);
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

// Two test cases to run function on
console.log(longestSubarray([8,2,4,7], 4)) // 2
console.log(longestSubarray([10,1,2,4,7,2], 5)) // 4