// 1696. Jump Game VI
// You are given a 0-indexed integer array nums and an integer k.
// You are initially standing at index 0. In one move, you can jump at most k steps forward without going outside the boundaries of the array. That is, you can jump from index i to any index in the range [i + 1, min(n - 1, i + k)] inclusive.
// You want to reach the last index of the array (index n - 1). Your score is the sum of all nums[j] for each index j you visited in the array.
// Return the maximum score you can get.


// Solution 1: DP w/ Max Heap

// Use an array 'dp' to keep track of the maximum score from each position to n - 1. 
// Set dp[n - 1] to nums[n - 1], since we must end up there.
// Maintain a heap of indices and initialize the heap with n - 1.
// The heap is sorted in descending order by the values in dp.

// Loop from n - 2 to 0,
  // 1. Remove the expired indices from the top of the heap (indices greater than i + k)
  // 2. Set the value of dp[i] to nums[i] + the best option in the range of [i + 1, i + k] (top of the heap)
  // 3. Add the current index to the heap.
// The answer is dp[0].

// Time Complexity: O(n log(n)) 305ms
// Space Complexity: O(n) 91.8MB
var maxResult = function(nums, k) {
  let n = nums.length, dp = Array(n);
  let heap = new Heap((a, b) => dp[b] - dp[a]);
  dp[n - 1] = nums[n - 1];
  heap.add(n - 1);
  
  for (let i = n - 2; i >= 0; i--) {
    while (heap.top() > i + k) heap.remove(); // remove expired 
    dp[i] = nums[i] + dp[heap.top()];
    heap.add(i);
  }
  return dp[0];
};
  
class Heap {
  constructor(comparator = ((a, b) => a - b)) {
    this.values = [];
    this.comparator = comparator;
    this.size = 0;
  }
  add(val) {
    this.size++;
    this.values.push(val);
    let idx = this.size - 1, parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.comparator(this.values[parentIdx], this.values[idx]) > 0) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
  }
  remove() {
    if (this.size === 0) return -1;
    this.size--;
    if (this.size === 0) return this.values.pop();
    let removedVal = this.values[0];
    this.values[0] = this.values.pop();
    let idx = 0;
    while (idx < this.size && idx < Math.floor(this.size / 2)) {
      let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      if (rightIdx === this.size) {
        if (this.comparator(this.values[leftIdx], this.values[idx]) > 0) break;
        [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
        idx = leftIdx;
      } else if (this.comparator(this.values[leftIdx], this.values[idx]) < 0 || this.comparator(this.values[rightIdx], this.values[idx]) < 0) {
        if (this.comparator(this.values[leftIdx], this.values[rightIdx]) <= 0) {
          [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
          idx = leftIdx;
        } else {
          [this.values[rightIdx], this.values[idx]] = [this.values[idx], this.values[rightIdx]];
          idx = rightIdx;
        }
      } else {
        break;
      }
    }
    return removedVal;
  }
  top() {
    return this.values[0];
  }
  isEmpty() {
    return this.size === 0;
  }
}


// Solution 2: DP w/ Montonic Decreasing Queue

// Implemented a deque using a doubly linked list, insertion and deletion from the front and back are O(1).
// Maintain a monotonic decreasing queue, where queue[0] is the maximum.
// This is optimal because we want the latest maximum values. Once a bigger value comes in, we can discard all older smaller values.
// Like solution 1, set dp[n - 1] to nums[n - 1] and initialize the queue with n - 1.

// Loop from n - 2 to 0
  // 1. Remove the expired indices from the front (indices greater than i + k)
  // 2. Set the value of dp[i] to nums[i] + the best option in the range of [i + 1, i + k] (front of the queue)
  // 3. Pop out smaller values from the back of the queue to maintain the decreasing property.
  // 4. Push the current index to the back of the queue.
// The answer is dp[0].

// Time Complexity: O(n) 158ms
// Space Complexity: O(n) 66.4MB
var maxResult = function(nums, k) {
  let queue = new Deque(), n = nums.length, dp = Array(n);
  dp[n - 1] = nums[n - 1];
  queue.push(n - 1);
  
  for (let i = n - 2; i >= 0; i--) {
    while (queue.front() > i + k) queue.shift(); // remove expired
    let best = nums[i] + dp[queue.front()];
    dp[i] = best;
    
    while (queue.size && dp[queue.back()] <= best) queue.pop(); // pop out smaller to maintain decreasing
    queue.push(i);
  }
  return dp[0];
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

// Three test cases 
console.log(maxResult([1,-1,-2,4,-7,3], 2)) // 7
console.log(maxResult([10,-5,-2,4,0,3], 3)) // 17
console.log(maxResult([1,-5,-20,4,-1,3,-6,-3], 2)) // 0