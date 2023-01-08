// 2530. Maximal Score After Applying K Operations
// You are given a 0-indexed integer array nums and an integer k. You have a starting score of 0.
// In one operation:
  // 1. choose an index i such that 0 <= i < nums.length,
  // 2. increase your score by nums[i], and
  // 3. replace nums[i] with ceil(nums[i] / 3).
// Return the maximum possible score you can attain after applying exactly k operations.
// The ceiling function ceil(val) is the least integer greater than or equal to val.


// Solution: Max Heap

// Keep track of the current maximum number in a max heap.
// When we choose the maximum number, add back the updated number Math.ceil(max / 3).
// Repeat this k times.

// n = length of nums
// Time Complexity: O(n log(n) + n log(k)) 282ms
// Space Complexity: O(n) 67.6MB
var maxKelements = function(nums, k) {
  let heap = new Heap((a, b) => b - a);
  for (let num of nums) {
    heap.add(num);
  }
  
  let ans = 0;
  for (let i = 0; i < k; i++) {
    let max = heap.remove();
    ans += max;
    heap.add(Math.ceil(max / 3));
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
console.log(maxKelements([10,10,10,10,10], 5)) // 50
console.log(maxKelements([1,10,3,3,3], 3)) // 17