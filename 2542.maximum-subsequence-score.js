// 2542. Maximum Subsequence Score
// You are given two 0-indexed integer arrays nums1 and nums2 of equal length n and a positive integer k. You must choose a subsequence of indices from nums1 of length k.
// For chosen indices i0, i1, ..., ik - 1, your score is defined as:
  // The sum of the selected elements from nums1 multiplied with the minimum of the selected elements from nums2.
  // It can defined simply as: (nums1[i0] + nums1[i1] +...+ nums1[ik - 1]) * min(nums2[i0] , nums2[i1], ... ,nums2[ik - 1]).
// Return the maximum possible score.
// A subsequence of indices of an array is a set that can be derived from the set {0, 1, ..., n-1} by deleting some or no elements.


// Solution: Sorting & Max Heap

// Collect each [nums1[i], nums2[i]] in an array nums, then sort by nums2[i] in desc order.
// Go through nums starting from index k onwards.
  // Since we sort nums by nums2[i] in desc order, we know that all nums2[i] so far are greater than or equal to the current nums2[i], so we can take the current nums2[i] as the minimum number.
  // Use a min heap to keep track of the k largest nums1[i] so far (when heap exceeds size k, remove the smallest number).
  // Record the maximum (sum of nums1[i] * minimum nums2[i]).

// Time Complexity: O(n log(n)) 487ms
// Space Complexity: O(k) 104.1MB
var maxScore = function(nums1, nums2, k) {
  let nums = [], n = nums1.length;
  for (let i = 0; i < n; i++) {
    nums.push([nums1[i], nums2[i]]);
  }
  nums.sort((a, b) => b[1] - a[1]);
  let heap = new Heap((a, b) => a - b), sum = 0;
  for (let i = 0; i < k; i++) {
    heap.add(nums[i][0]);
    sum += nums[i][0];
  }
  let maxScore = sum * nums[k - 1][1];
  for (let i = k; i < n; i++) {
    heap.add(nums[i][0]);
    sum += nums[i][0];
    let min = heap.remove();
    sum -= min;
    maxScore = Math.max(maxScore, sum * nums[i][1]);
  }
  return maxScore;
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
console.log(maxScore([1,3,3,2], [2,1,3,4], 3)) // 12
console.log(maxScore([4,2,3,1,1], [7,5,10,9,6], 1)) // 30