// 2398. Maximum Number of Robots Within Budget
// You have n robots. You are given two 0-indexed integer arrays, chargeTimes and runningCosts, both of length n. The ith robot costs chargeTimes[i] units to charge and costs runningCosts[i] units to run. You are also given an integer budget.
// The total cost of running k chosen robots is equal to max(chargeTimes) + k * sum(runningCosts), where max(chargeTimes) is the largest charge cost among the k robots and sum(runningCosts) is the sum of running costs among the k robots.
// Return the maximum number of consecutive robots you can run such that the total cost does not exceed budget.


// Solution: Sliding Window & Monotonic Decreasing Queue

// Maintain a sliding window where the total cost <= budget.
// When the total cost exceeds the budget, move up the left pointer until it is within the budget.

// To get the maximum chargeTime so far, maintain a monotonic decreasing queue.
  // There is no point keeping smaller chargeTimes at earlier indexes. Remove smaller chargeTimes from the back of the queue.
  // As we move the left pointer up, remove expired indexes from the front of the queue.
  // The chargeTime at the front of the queue is the maximum chargeTime in the current window.

// Record the largest size of the sliding window.

// Time Complexity: O(n) 276ms
// Space Complexity: O(n) 58.9MB
var maximumRobots = function(chargeTimes, runningCosts, budget) {
  let n = chargeTimes.length, queue = new Deque();
  let runningCost = 0, ans = 0;
  for (let j = 0, i = 0; j < n; j++) {
    runningCost += runningCosts[j];
    while (!queue.isEmpty() && chargeTimes[queue.back()] <= chargeTimes[j]) queue.pop(); // remove smaller chargeTimes from back of queue
    queue.push(j); // add current index to queue
    while (chargeTimes[queue.front()] + (j - i + 1) * runningCost > budget) {
      while (!queue.isEmpty() && queue.front() <= i) queue.shift(); // remove expired indexes from front of queue
      runningCost -= runningCosts[i];
      i++;
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

// Two test cases
console.log(maximumRobots([3,6,1,3,4], [2,1,3,4,5], 25)) // 3
console.log(maximumRobots([11,12,19], [10,8,7], 19)) // 0