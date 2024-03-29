// 3066. Minimum Operations to Exceed Threshold Value II
// You are given a 0-indexed integer array nums, and an integer k.
// In one operation, you will:
  // Take the two smallest integers x and y in nums.
  // Remove x and y from nums.
  // Add min(x, y) * 2 + max(x, y) anywhere in the array.
// Note that you can only apply the described operation if nums contains at least two elements.
// Return the minimum number of operations needed so that all elements of the array are greater than or equal to k.


// Solution: Min Heap

// Add all nums to a min heap.
// Until the minimum element in the heap >= k, remove the min two elements and add min * 2 + secondMin back to the heap.

// Note: Since we are at least doubling the number at each operation, we will have at most log(k) operations per number.

// Time Complexity: O(n log(n) * log(n)) 276ms
// Space Complexity: O(n log(n)) 77MB
var minOperations = function(nums, k) {
  let heap = new Heap();
  for (let num of nums) {
    heap.add(num);
  }
  let operations = 0;
  while (!heap.isEmpty() && heap.top() < k) {
    let min = heap.remove(), secondMin = heap.remove();
    operations++;
    heap.add(min * 2 + secondMin);
  }
  return operations;
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
console.log(minOperations([2,11,10,1,3], 10)) // 2
console.log(minOperations([1,1,2,4,9], 20)) // 4