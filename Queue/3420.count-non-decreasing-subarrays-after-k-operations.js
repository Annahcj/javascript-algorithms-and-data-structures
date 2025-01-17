// 3420. Count Non-Decreasing Subarrays After K Operations
// You are given an array nums of n integers and an integer k.
// For each subarray of nums, you can apply up to k operations on it. In each operation, you increment any element of the subarray by 1.
// Note that each subarray is considered independently, meaning changes made to one subarray do not persist to another.
// Return the number of subarrays that you can make non-decreasing ​​​​​after performing at most k operations.
// An array is said to be non-decreasing if each element is greater than or equal to its previous element, if it exists.


// Solution: Sliding Window w/ Deque

// Maintain a sliding window from right-to-left, anchored at the left pointer, where the window can be made non-decreasing with at most k moves.
// Move the right pointer down while it takes more than k moves.
// The window must be from right-to-left and not left-to-right because elements can be removed from the right side without affecting the left - because the right is dependent on the left.
// To elaborate, elements on the right must be made at least equal to the elements on the left.

// Maintain a monotonic decreasing deque.
// When adding nums[i] to the deque, pop off elements from the top of the stack while nums[top of stack] >= nums[i] and add to the number of moves.
// Since there may be a gap between two indices in the deque, we must multiply the difference between nums[i] and nums[top of stack] by the difference in indices between the popped index and the second last index in the stack.
// If the number of moves > k, move the left pointer until the number of moves is less than or equal to k.

// For every starting index, the size of the window is the number of subarrays that would take at most k moves.
// Return the sum of sizes for each window.

// Time Complexity: O(n) 59ms
// Space Complexity: O(n) 82.6MB
function countNonDecreasingSubarrays(nums, k) {
  const n = nums.length, deque = new DoubleEndedQueue();
  let moves = 0, subarrays = 0;
  for (let i = n - 1, j = n - 1; i >= 0; i--) {
    while (!deque.isEmpty() && nums[deque.back()] <= nums[i]) {
      const back = deque.pop();
      const prevIndex = !deque.isEmpty() ? deque.back() : j + 1;
      moves += (prevIndex - back) * (nums[i] - nums[back]);
    }
    deque.push(i);
    // reduce the window until moves <= k by removing elements from the right side one-by-one
    while (moves > k) {
      // all numbers on the right of deque.front() would have been made equal if it wasn't already larger
      moves -= nums[deque.front()] - nums[j];
      if (deque.front() === j) {
        deque.shift();
      }
      j--;
    }
    subarrays += j - i + 1;
  }
  return subarrays;
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
console.log(countNonDecreasingSubarrays([6,3,1,2,4,4], 7)) // 17
console.log(countNonDecreasingSubarrays([6,3,1,3,6], 4)) // 12