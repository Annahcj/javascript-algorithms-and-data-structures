// 3080. Mark Elements on Array by Performing Queries
// You are given a 0-indexed array nums of size n consisting of positive integers.
// You are also given a 2D array queries of size m where queries[i] = [index[i], k[i]].
// Initially all elements of the array are unmarked.
// You need to apply m queries on the array in order, where on the ith query you do the following:
  // Mark the element at index index[i] if it is not already marked.
  // Then mark k[i] unmarked elements in the array with the smallest values. If multiple such elements exist, mark the ones with the smallest indices. And if less than k[i] unmarked elements exist, then mark all of them.
// Return an array answer of size m where answer[i] is the sum of unmarked elements in the array after the ith query.


// Solution: Min Heap

// Maintain a min heap of unmarked indices, sorted by value, then index.
// Note: The heap can contain marked indices, we just need to lazily remove them (remove when we encounter it).

// Use a boolean array to keep track of unmarked/marked elements.
// Keep track of a running sum of unmarked elements.
// For each query [index, k], 
  // If the current element is unmarked, subtract the value from the unmarked sum and mark it as marked.
  // Remove k unmarked values from the top of the min heap, subtract the value from the unmarked sum, and mark as marked.

// n = length of nums, m = number of queries
// Time Complexity: O(n log(n) + m) 361ms
// Space Complexity: O(n) (excluding output) 77.8MB
var unmarkedSumArray = function(nums, queries) {
  let n = nums.length, heap = new Heap((a, b) => nums[a] === nums[b] ? a - b : nums[a] - nums[b]);
  for (let i = 0; i < n; i++) {
    heap.add(i);
  }
  let ans = [], unmarkedSum = nums.reduce((sum, num) => sum + num), marked = Array(n).fill(false);
  for (let [index, k] of queries) {
    if (!marked[index]) {
      unmarkedSum -= nums[index];
      marked[index] = true;
    }
    let unmarkedElements = 0;
    while (!heap.isEmpty() && unmarkedElements < k) {
      let i = heap.remove();
      if (!marked[i]) {
        marked[i] = true;
        unmarkedElements++;
        unmarkedSum -= nums[i];
      }
    }
    ans.push(unmarkedSum);
  }
  return ans;
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
console.log(unmarkedSumArray([1,2,2,1,2,3,1], [[1,2],[3,3],[4,2]])) // [8,3,0]
console.log(unmarkedSumArray([1,4,2,3], [[0,1]])) // [7]