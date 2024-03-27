// 3092. Most Frequent IDs
// The problem involves tracking the frequency of IDs in a collection that changes over time. You have two integer arrays, nums and freq, of equal length n. Each element in nums represents an ID, and the corresponding element in freq indicates how many times that ID should be added to or removed from the collection at each step.
  // Addition of IDs: If freq[i] is positive, it means freq[i] IDs with the value nums[i] are added to the collection at step i.
  // Removal of IDs: If freq[i] is negative, it means -freq[i] IDs with the value nums[i] are removed from the collection at step i.
// Return an array ans of length n, where ans[i] represents the count of the most frequent ID in the collection after the ith step. If the collection is empty at any step, ans[i] should be 0 for that step.


// Solution 1: Segment Tree

// Use a max segment tree to efficiently find and update the maximum frequency in the range (0, 10^5).

// n = length of nums, m = max(nums[i])
// Time Complexity: O(m + n log(m)) 317ms
// Space Complexity: O(m) (excluding output) 87.4MB
var mostFrequentIDs = function(nums, freq) {
  let n = nums.length, m = Math.max(...nums), tree = new MaxSegmentTree(m);
  let ans = Array(n);
  for (let i = 0; i < n; i++) {
    let id = nums[i] - 1;
    tree.add(id, freq[i]);
    ans[i] = tree.maxRange(0, m - 1);
  }
  return ans;
};

class MaxSegmentTree {
  constructor(n) {
    this.size = n;
    this.segTree = Array(n * 2).fill(0);
  }
  add(index, value) {
    let n = this.size, idx = index + n;
    this.segTree[idx] += value;
    idx = Math.floor(idx / 2);

    while (idx > 0) {
      this.segTree[idx] = Math.max(this.segTree[idx * 2], this.segTree[idx * 2 + 1]);
      idx = Math.floor(idx / 2);
    }
  }
  maxRange(left, right) {
    if (left > right) return 0;
    let n = this.size, max = 0;
    let left_idx = left + n, right_idx = right + n;
    while (left_idx <= right_idx) {
      if (left_idx % 2 === 1) max = Math.max(max, this.segTree[left_idx++]);
      if (right_idx % 2 === 0) max = Math.max(max, this.segTree[right_idx--]);
      left_idx = Math.floor(left_idx / 2);
      right_idx = Math.floor(right_idx / 2);
    }
    return max;
  }
}


// Solution 2: Max Heap w/ Lazy Removal

// 1. Use an array `value` to keep track of the current value of each number.
// 2. Use a max heap with lazy removal to get the maximum value with constant updates.
  // When we update a value, don't remove from the heap immediately, but remove it from the top of the heap when we need it, and discard expired values (value that is different from current value).

// n = length of nums, m = max(nums[i])
// Time Complexity: O(n log(n) + m) 362ms
// Space Complexity: O(n + m) 85.5MB
var mostFrequentIDs = function(nums, freq) {
  let n = nums.length, value = Array(Math.max(...nums) + 1).fill(0);
  let heap = new Heap((a, b) => b[1] - a[1]); // [id, value]
  let ans = Array(n);
  for (let i = 0; i < n; i++) {
    value[nums[i]] += freq[i];
    heap.add([nums[i], value[nums[i]]]);
    while (!heap.isEmpty() && heap.top()[1] !== value[heap.top()[0]]) {
      heap.remove();
    }
    if (heap.isEmpty()) {
      ans[i] = 0;
    } else {
      ans[i] = heap.top()[1];
    }
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
console.log(mostFrequentIDs([2,3,2,1], [3,2,-3,1])) // [3,3,2,2]
console.log(mostFrequentIDs([5,5,3], [2,-2,1])) // [2,0,1]