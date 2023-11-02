// 2426. Number of Pairs Satisfying Inequality
// You are given two 0-indexed integer arrays nums1 and nums2, each of size n, and an integer diff. Find the number of pairs (i, j) such that:
  // 0 <= i < j <= n - 1 and
  // nums1[i] - nums1[j] <= nums2[i] - nums2[j] + diff.
// Return the number of pairs that satisfy the conditions.


// Solution: Math & Segment Tree

// The equation nums1[i] - nums1[j] <= nums2[i] - nums2[j] + diff can be converted into nums1[i] - nums2[i] <= nums1[j] - nums2[j] + diff.

// Go through each index j.
  // Record all past index i's differences (nums1[i] - nums2[i]).
  // If nums1[i] - nums2[i] <= nums1[j] - nums2[j] + diff, we have a found a pair.

// Use a segment tree to keep track of the count of each (nums1[i] - nums2[i]).
// For each index j, find the number of previous index i's with difference in the range of (min(nums1[i] - nums2[i]), nums1[j] - nums2[j] + diff).
  // Offset the segment tree by min(nums1[i] - nums2[i] so that we won't go into negative indexes.

// m = max(nums1[i] - nums2[i])
// Time Complexity: O(n log(m)) 226ms
// Space Complexity: O(m) 55.3MB
var numberOfPairs = function(nums1, nums2, diff) {
  let offset = 0, maxDiff = -Infinity, n = nums1.length;
  for (let i = 0; i < n; i++) {
    offset = Math.min(offset, nums1[i] - nums2[i]);
    maxDiff = Math.max(maxDiff, nums1[i] - nums2[i]);
  }
  offset = Math.abs(offset);
  maxDiff += offset;

  let segTree = new SegmentTree(maxDiff + 1), res = 0;
  for (let j = 0; j < n; j++) {
    let maxRange = Math.min(maxDiff, nums1[j] - nums2[j] + diff + offset);
    let pairs = segTree.sumRange(0, maxRange);
    res += pairs;
    segTree.update(nums1[j] - nums2[j] + offset, 1);
  }
  return res;
};

class SegmentTree {
  constructor(n) {
    this.size = n;
    this.segTree = Array(n * 2).fill(0);
  }
  update(index, val) {
    let n = this.size, idx = index + n;
    this.segTree[idx] += val;
    idx = Math.floor(idx / 2);

    while (idx > 0) {
      this.segTree[idx] = this.segTree[idx * 2] + this.segTree[idx * 2 + 1];
      idx = Math.floor(idx / 2);
    }
  }
  sumRange(left, right) {
    if (left > right) return 0;
    let n = this.size, sum = 0;
    let left_idx = left + n, right_idx = right + n;
    // left must be even, right must be odd
    // when left is odd or right is even, this indicates partial coverage. 
    // in other words, the parent node will be covering a range outside of the range we are looking for.
    // so, we need to take the partial sum and move the pointers so that it has full coverage.
    while (left_idx <= right_idx) {
      if (left_idx % 2 === 1) sum += this.segTree[left_idx++];
      if (right_idx % 2 === 0) sum += this.segTree[right_idx--];
      left_idx = Math.floor(left_idx / 2);
      right_idx = Math.floor(right_idx / 2);
    }
    return sum;
  }
}

// Two test cases
console.log(numberOfPairs([3,2,5], [2,2,1], 1)) // 3
console.log(numberOfPairs( [3,-1], [-2,2], -1)) // 0