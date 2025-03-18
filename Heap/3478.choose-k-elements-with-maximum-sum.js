// 3478. Choose K Elements With Maximum Sum
// You are given two integer arrays, nums1 and nums2, both of length n, along with a positive integer k.
// For each index i from 0 to n - 1, perform the following:
  // Find all indices j where nums1[j] is less than nums1[i].
  // Choose at most k values of nums2[j] at these indices to maximize the total sum.
// Return an array answer of size n, where answer[i] represents the result for the corresponding index i.


// Solution: Sorting & Min Heap

// Since nums1 in asc order, while keeping the original indices as a reference.
// Go through the nums1 in sorted order, and store the maximum nums2 values in a min heap of size k.

// Because only smaller elements should be part of the sum, we need to group nums1 by the same value and process them as a group.
// Only add the values to the heap after the whole group is processed.

// For each index, the answer is the current sum of the values in the heap.

// Time Complexity: O(n log(n) + n log(k)) 393ms
// Space Complexity: O(n + k) 102.4MB
function findMaxSum(nums1, nums2, k) {
  nums1 = nums1.map((val, idx) => [val, idx]).sort((a, b) => a[0] - b[0]);
  const n = nums1.length, minHeap = new Heap((a, b) => a - b);
  const ans = Array(n);
  let sum = 0;
  for (let i = 0; i < n; i++) {
    let j = i;
    while (j < n - 1 && nums1[j + 1][0] === nums1[i][0]) j++;
    const prevSum = sum;
    for (let l = i; l <= j; l++) { // process all equal numbers as a group
      const index = nums1[l][1];
      ans[index] = prevSum;
      minHeap.add(nums2[index]);
      sum += nums2[index];
      if (minHeap.size > k) {
        sum -= minHeap.remove();
      }
    }
    i = j;
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
console.log(findMaxSum([4,2,1,5,3], [10,20,30,40,50], 2)) // [80,30,0,80,50]
console.log(findMaxSum([2,2,2,2], [3,1,2,3], 1)) // [0,0,0,0]