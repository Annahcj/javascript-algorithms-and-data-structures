// 1851. Minimum Interval to Include Each Query
// You are given a 2D integer array intervals, where intervals[i] = [lefti, righti] describes the ith interval starting at lefti and ending at righti (inclusive). The size of an interval is defined as the number of integers it contains, or more formally righti - lefti + 1.
// You are also given an integer array queries. The answer to the jth query is the size of the smallest interval i such that lefti <= queries[j] <= righti. If no such interval exists, the answer is -1.
// Return an array containing the answers to the queries.


// Solution: Sorting & Priority Queue

// 1. Sort queries in asc order so we can process the intervals in increasing order.
// 2. Sort intervals by left in asc order.
// 3. Process queries in sorted order,
  // Process intervals in sorted order.
  // Add each interval within range to a min heap order by interval size.
  // Lazy removal - remove intervals no longer in range from the top of the heap.

// Time Complexity: O(n log(n) + m log(m)) 1044ms
// Space Complexity: O(n + m) 117.3MB
var minInterval = function(intervals, queries) {
  intervals.sort((a, b) => a[0] - b[0]);
  queries = queries.map((query, i) => [query, i]).sort((a, b) => a[0] - b[0]);
  let heap = new PriorityQueue((a, b) => (a[1] - a[0]) - (b[1] - b[0]));
  
  let n = intervals.length, m = queries.length;
  let i = 0, ans = Array(m).fill(-1);
  for (let j = 0; j < m; j++) {
    while (i < n && intervals[i][0] <= queries[j][0]) heap.add(intervals[i++]);
    while (!heap.isEmpty() && heap.top()[1] < queries[j][0]) heap.remove();
    if (!heap.isEmpty()) {
      ans[queries[j][1]] = heap.top()[1] - heap.top()[0] + 1;
    }
  }
  return ans;
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

// Two test cases to run function on
console.log(minInterval([[1,4],[2,4],[3,6],[4,4]], [2,3,4,5])) // [3,3,1,4]
console.log(minInterval([[2,3],[2,5],[1,8],[20,25]], [2,19,5,22])) // [2,-1,4,6]