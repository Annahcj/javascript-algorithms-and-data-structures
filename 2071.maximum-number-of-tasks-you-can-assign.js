// 2071. Maximum Number of Tasks You Can Assign
// You have n tasks and m workers. Each task has a strength requirement stored in a 0-indexed integer array tasks, with the ith task requiring tasks[i] strength to complete. The strength of each worker is stored in a 0-indexed integer array workers, with the jth worker having workers[j] strength. Each worker can only be assigned to a single task and must have a strength greater than or equal to the task's strength requirement (i.e., workers[j] >= tasks[i]).
// Additionally, you have pills magical pills that will increase a worker's strength by strength. You can decide which workers receive the magical pills, however, you may only give each worker at most one magical pill.
// Given the 0-indexed integer arrays tasks and workers and the integers pills and strength, return the maximum number of tasks that can be completed.


// Solution: Binary Search & Deque

// Binary search for the largest number of tasks that can be completed.
// How to check whether we can complete k tasks:
  // Try to assign the k weakest tasks to the k strongest workers.
  // Sort tasks in asc order and workers in desc order.
  // Go through the workers from weakest to strongest,
    // Try to assign the easiest task to the worker (without using a pill).
      // If it can be assigned, assign it. (If the easiest task can be done by the worker, that means all following workers will be able to do it without a pill. Therefore, it is optimal for the current task to complete the easiest task)
      // Otherwise, try to do the hardest tasks possible after using a pill.
    // Keep track of the tasks that are assignable after using a pill in a deque so that we can remove tasks both on the left and right.
    // If we can't assign any task to the worker, return false (we can't complete k tasks).

// n = number of tasks, m = number of workers
// Time Complexity: O(n log(n) + m log(m)) 479ms
// Space Complexity: O(m) 65.7MB
var maxTaskAssign = function(tasks, workers, pills, strength) {
  let m = workers.length;
  tasks.sort((a, b) => a - b);
  workers.sort((a, b) => b - a);
  let low = 0, high = m;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (canAssign(mid)) low = mid;
    else high = mid - 1;
  }
  return low;
  
  function canAssign(k) {
    let queue = new Deque(), pillsUsed = 0;
    for (let j = k - 1, i = 0; j >= 0; j--) {
      while (i < k && workers[j] + strength >= tasks[i]) {
        queue.push(tasks[i++]);
      }
      if (queue.isEmpty()) return false; // no do-able tasks
      if (queue.front() <= workers[j]) { // do the easiest task without using pill
        queue.shift();
      } else if (pillsUsed === pills) { 
        return false;
      } else { // do the hardest task after using a pill
        pillsUsed++;
        queue.pop();
      }
    }
    return true;
  }
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
console.log(maxTaskAssign([3,2,1], [0,3,3], 1, 1)) // 3
console.log(maxTaskAssign([5,4], [0,0,0], 1, 5)) // 1