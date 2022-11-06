// 2462. Total Cost to Hire K Workers
// You are given a 0-indexed integer array costs where costs[i] is the cost of hiring the ith worker.
// You are also given two integers k and candidates. We want to hire exactly k workers according to the following rules:
  // You will run k sessions and hire exactly one worker in each session.
  // In each hiring session, choose the worker with the lowest cost from either the first candidates workers or the last candidates workers. Break the tie by the smallest index.
    // For example, if costs = [3,2,7,7,1,2] and candidates = 2, then in the first hiring session, we will choose the 4th worker because they have the lowest cost [3,2,7,7,1,2].
    // In the second hiring session, we will choose 1st worker because they have the same lowest cost as 4th worker but they have the smallest index [3,2,7,7,2]. Please note that the indexing may be changed in the process.
  // If there are fewer than candidates workers remaining, choose the worker with the lowest cost among them. Break the tie by the smallest index.
  // A worker can only be chosen once.
// Return the total cost to hire exactly k workers.


// Solution: Two Heaps

// Two min heaps, left and right.
// Keep up to <candidates> number of candidates in each heap.
// For each hire, pick the smallest candidate out of both heaps.
  // Remove the candidate from its heap.
  // Add the next worker into the heap.

// k = number of workers to hire, m = candidates
// Time Complexity: O(m log(m) + k log(m)) 1048ms
// Space Complexity: O(m) 97.7MB
var totalCost = function(costs, k, candidates) {
  let n = costs.length;
  let left = new PriorityQueue((a, b) => a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]); // [index, cost]  
  let right = new PriorityQueue((a, b) => a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]); // [index, cost]
  let l, r;
  for (l = 0; l < Math.min(n, candidates); l++) {
    left.add([l, costs[l]]);
  }
  for (r = n - 1; r >= Math.max(0, n - candidates) && r > l; r--) {
    right.add([r, costs[r]]);
  }
  
  let totalCost = 0;
  for (let i = 0; i < k; i++) {
    let [leftIndex, leftCost] = left.size > 0 ? left.top() : [Infinity, Infinity];
    let [rightIndex, rightCost] = right.size > 0 ? right.top() : [Infinity, Infinity];
    let pickFromLeft = leftCost === rightCost ? leftIndex < rightIndex : leftCost < rightCost;
    if (pickFromLeft) { // pick from left heap
      left.remove();
      if (l <= r) left.add([l, costs[l]]), l++;
      totalCost += leftCost;
    } else { // pick from right heap
      right.remove();
      if (r >= l) right.add([r, costs[r]]), r--;
      totalCost += rightCost;
    } 
  }
  return totalCost;
};

class PriorityQueue {
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

// Two test cases
console.log(totalCost([17,12,10,2,7,2,11,20,8], 3, 4)) // 11
console.log(totalCost([1,2,4,1], 3, 3)) // 4