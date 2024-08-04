// 1508. Range Sum of Sorted Subarray Sums
// You are given the array nums consisting of n positive integers. You computed the sum of all non-empty continuous subarrays from the array and then sorted them in non-decreasing order, creating a new array of n * (n + 1) / 2 numbers.
// Return the sum of the numbers from index left to index right (indexed from 1), inclusive, in the new array. Since the answer can be a huge number return it modulo 10^9 + 7.


// Solution 1: Brute Force w/ Sorting

// Generate each subarray sum and store them in an array.
// Sort the array of sums in asc order and return the sum of sums from indices left to right.

// Time Complexity: O(n^2 log(n^2)) 298ms
// Space Complexity: O(n^2) 84.9MB
var rangeSum = function(nums, n, left, right) {
  let sums = [];
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = i; j < n; j++) {
      sum += nums[j];
      sums.push(sum);
    }
  }
  sums.sort((a, b) => a - b);
  let ans = 0, MOD = 1000000007;
  for (let i = left - 1; i <= right - 1; i++) {
    ans = (ans + sums[i]) % MOD;
  }
  return ans;
};


// Solution 2: Heap

// Use a heap to process each subarray sum in ascending order.
// Store each [current sum, index] and poll the current smallest sum and increment the index to generate a new subarray sum.
// Initialize the heap with each [nums[i], index] - the heap will always contain at most n subarrays, one starting from each index.

// Time Complexity: O(max(right, n) * log(n)) 191ms
// Space Complexity: O(n) 58.4MB
var rangeSum = function(nums, n, left, right) {
  let heap = new Heap((a, b) => a[0] - b[0]);
  for (let i = 0; i < n; i++) {
    heap.add([nums[i], i]);
  }
  let ans = 0, MOD = 1000000007;
  for (let i = 1; i <= right; i++) {
    let [sum, index] = heap.remove();
    if (i >= left) {
      ans = (ans + sum) % MOD; 
    }
    if (index < n - 1) {
      heap.add([sum + nums[index + 1], index + 1]);
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

// Three test cases
console.log(rangeSum([1,2,3,4], 4, 1, 5)) // 13
console.log(rangeSum([1,2,3,4], 4, 3, 4)) // 6
console.log(rangeSum([1,2,3,4], 4, 1, 10)) // 50