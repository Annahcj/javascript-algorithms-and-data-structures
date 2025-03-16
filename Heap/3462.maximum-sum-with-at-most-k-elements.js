// 3462. Maximum Sum With at Most K Elements
// You are given a 2D integer matrix grid of size n x m, an integer array limits of length n, and an integer k. The task is to find the maximum sum of at most k elements from the matrix grid such that:
  // The number of elements taken from the ith row of grid does not exceed limits[i].
// Return the maximum sum.


// Solution: Heap

// Use a min heap to store the maximum k elements.
// Sort every row in desc order, and add at most limits[i] elements to the heap.
// If the size of the heap exceeds k, remove the minimum value.
// At the end, return the sum of values in the heap.

// m = number of rows, n = number of columns
// Time Complexity: O(mn * log(n + k)) 252ms
// Space Complexity: O(k) 84.9MB
function maxSum(grid, limits, k) {
  const m = grid.length, n = grid[0].length;
  const minHeap = new Heap((a, b) => a - b);
  for (let i = 0; i < m; i++) {
    grid[i].sort((a, b) => b - a);
    for (let j = 0; j < Math.min(n, limits[i]); j++) {
      minHeap.add(grid[i][j]);
      if (minHeap.size > k) {
        minHeap.remove();
      }
    }
  }
  return minHeap.values.reduce((sum, val) => sum + val, 0);
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

// Two test cases
console.log(maxSum([[1,2],[3,4]], [1,2], 2)) // 7
console.log(maxSum([[5,3,7],[8,2,6]], [2,2], 3)) // 21