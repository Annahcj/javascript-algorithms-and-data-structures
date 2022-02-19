// 2163. Minimum Difference in Sums After Removal of Elements
// You are given a 0-indexed integer array nums consisting of 3 * n elements.
// You are allowed to remove any subsequence of elements of size exactly n from nums. The remaining 2 * n elements will be divided into two equal parts:
  // The first n elements belonging to the first part and their sum is sumfirst.
  // The next n elements belonging to the second part and their sum is sumsecond.
// The difference in sums of the two parts is denoted as sumfirst - sumsecond.
  // For example, if sumfirst = 3 and sumsecond = 2, their difference is 1.
  // Similarly, if sumfirst = 2 and sumsecond = 3, their difference is -1.
// Return the minimum difference possible between the sums of the two parts after the removal of n elements.


// Solution: Dynamic Programming & Priority Queue

// To get the minimum difference, always get the 
  // 1. The n smallest numbers from the left (don't take from the right n numbers)
    // left[i] = sum of the n biggest numbers between [0, i]
  // 2. The n biggest numbers from the right (don't take from the left n numbers)

// Use a max heap to keep the n smallest numbers from the left, and store the results in an array.
// Use a min heap to keep the n biggest numbers from the right, 
  // calculate the best combination of numbers from left and numbers from the right: left[j - 1] - current right sum

// The sum can only be used if there are at least n numbers (from the left and from the right).

// Time Complexity: O(n log(n)) 599ms
// Space Complexity: O(n) 100.4MB
var minimumDifference = function(nums) {
  let m = nums.length, n = m / 3;
  let left = Array(n + 1), maxHeap = new PriorityQueue((a, b) => b - a), sum = 0;
  
  // take the smallest n numbers for each i
  for (let i = 0; i < m - n; i++) {
    sum += nums[i];
    maxHeap.add(nums[i]);
    if (maxHeap.size > n) {
      sum -= maxHeap.remove();
    }
    if (maxHeap.size >= n) left[i - n + 1] = sum;
  }
  
  // take the biggest n numbers for each j
  let minHeap = new PriorityQueue(), minDiff = Infinity;
  sum = 0;
  for (let j = m - 1; j > n - 1; j--) {
    sum += nums[j];
    minHeap.add(nums[j]);
    if (minHeap.size > n) {
      sum -= minHeap.remove();
    }
    if (minHeap.size >= n) {
      minDiff = Math.min(minDiff, left[j - n] - sum);
    }
  }
  return minDiff;
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
console.log(minimumDifference([3,1,2])) // -1
console.log(minimumDifference([7,9,5,8,1,3])) // 1