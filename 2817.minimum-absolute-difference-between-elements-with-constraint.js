// 2817. Minimum Absolute Difference Between Elements With Constraint
// You are given a 0-indexed integer array nums and an integer x.
// Find the minimum absolute difference between two elements in the array that are at least x indices apart.
// In other words, find two indices i and j such that abs(i - j) >= x and abs(nums[i] - nums[j]) is minimized.
// Return an integer denoting the minimum absolute difference between two elements that are at least x indices apart.


// Solution: Segment Tree & Sorting

// Create an array of each [nums[i], i] and sort it by nums[i].
// Go through nums in sorted order, using a segment tree to efficiently query the maximum nums[i] so far in a range of the original indices.
  // Max in left range: maxRange(0, idx - x)
  // Max in right range: maxRange(idx + 1, n - 1)

// Reasoning: By getting the maximum nums[i] so far within the left and right ranges, we ensure this gets the minimum absolute difference since nums is sorted.

// Time Complexity: O(n log(n)) 485ms
// Space Complexity: O(n) 94.1MB
var minAbsoluteDifference = function(nums, x) {
  if (x === 0) return 0;
  let n = nums.length, maxSegTree = new MaxSegmentTree(n);
  let arr = nums.map((num, idx) => [num, idx]).sort((a, b) => a[0] - b[0]);
  let minDiff = Infinity;
  for (let i = 0; i < n; i++) {
    let [num, idx] = arr[i];
    let maxLeft = maxSegTree.maxRange(0, idx - x);
    let maxRight = maxSegTree.maxRange(idx + x, n - 1);
    minDiff = Math.min(minDiff, num - maxLeft, num - maxRight);
    maxSegTree.update(idx, num);
  }
  return minDiff;
};

class MaxSegmentTree {
  constructor(n) {
    this.size = n;
    this.segTree = Array(n * 2).fill(-Infinity);
  }
  update(index, value) {
    let n = this.size, idx = index + n;
    this.segTree[idx] = value;
    idx = Math.floor(idx / 2);

    while (idx > 0) {
      this.segTree[idx] = Math.max(this.segTree[idx * 2], this.segTree[idx * 2 + 1]);
      idx = Math.floor(idx / 2);
    }
  }
  maxRange(left, right) {
    if (left > right) return -Infinity;
    let n = this.size, max = -Infinity;
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

// Three test cases
console.log(minAbsoluteDifference([4,3,2,4], 2)) // 0
console.log(minAbsoluteDifference([5,3,2,10,15], 1)) // 1
console.log(minAbsoluteDifference([1,2,3,4], 3)) // 3