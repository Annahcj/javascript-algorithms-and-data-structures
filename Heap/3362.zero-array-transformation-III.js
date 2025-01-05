// 3362. Zero Array Transformation III
// You are given an integer array nums of length n and a 2D array queries where queries[i] = [l[i], r[i]].
// Each queries[i] represents the following action on nums:
  // Decrement the value at each index in the range [l[i], r[i]] in nums by at most 1.
  // The amount by which the value is decremented can be chosen independently for each index.
// A Zero Array is an array with all its elements equal to 0.
// Return the maximum number of elements that can be removed from queries, such that nums can still be converted to a zero array using the remaining queries. If it is not possible to convert nums to a zero array, return -1.


// Solution: Greedy w/ Sorting, Heap, and Line Sweep

// Sort queries by start in asc order.
// Store the queries that cover up to index i in a max heap, and add queries to the heap while queries[i][0] <= i.
// Go through nums and while nums[i] - prefix sum of updates[i] > 0, 
  // Greedily pick the queries with the rightmost end point that covers nums[i].
  // Use line sweep on the fly to accumulate the queries.

// n = length of nums, m = number of queries
// Time Complexity: O(n log(n) + n log(m)) 157ms
// Space Complexity: O(n) 86.27MB
function maxRemoval(nums, queries) {
  queries.sort((a, b) => a[0] - b[0]);
  const heap = new Heap((a, b) => b - a);
  const n = nums.length, m = queries.length;
  const updates = Array(n + 1).fill(0);
  let queriesUsed = 0;
  for (let i = 0, j = 0; i < n; i++) {
    updates[i] += i > 0 ? updates[i - 1] : 0;
    while (j < m && queries[j][0] <= i) {
      heap.add(queries[j][1]);
      j++;
    }
    while (nums[i] - updates[i] > 0) {
      if (heap.isEmpty() || heap.top() < i) return -1;
      updates[i]++;
      updates[heap.remove() + 1]--;
      queriesUsed++;
    }
  }
  return m - queriesUsed;
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

// Three test cases
console.log(maxRemoval([2,0,2], [[0,2],[0,2],[1,1]])) // 1
console.log(maxRemoval([1,1,1,1], [[1,3],[0,2],[1,3],[1,2]])) // 2
console.log(maxRemoval([1,2,3,4], [[0,3]])) // -1