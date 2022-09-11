// 2407. Longest Increasing Subsequence II
// You are given an integer array nums and an integer k.
// Find the longest subsequence of nums that meets the following requirements:
  // The subsequence is strictly increasing and
  // The difference between adjacent elements in the subsequence is at most k.
// Return the length of the longest subsequence that meets the requirements.
// A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.


// Solution: Segment Tree

// Use a segment tree to keep track of the longest subsequence ending with each number.
// For each nums[i], take the maximum subsequence length ending within range (nums[i] - k, nums[i] - 1).

// n = length of nums, m = max(nums[i])
// Time Complexity: O(n log(m)) 300ms
// Space Complexity: O(m) 55.4MB
var lengthOfLIS = function(nums, k) {
  let max = Math.max(...nums), segTree = new SegmentTree(max + 1), ans = 0;
  for (let num of nums) {
    let maxLength = segTree.maxInRange(Math.max(num - k, 0), num - 1);
    segTree.update(num, maxLength + 1);
    ans = Math.max(ans, maxLength + 1);
  }
  return ans;
};

class SegmentTree {
  constructor(n) {
    this.size = n;
    this.segTree = Array(n * 2).fill(0);
  }
  update(index, val) {
    let n = this.size, idx = index + n;
    this.segTree[idx] = Math.max(this.segTree[idx], val);
    idx = Math.floor(idx / 2);

    while (idx > 0) {
      this.segTree[idx] = Math.max(this.segTree[idx * 2], this.segTree[idx * 2 + 1]);
      idx = Math.floor(idx / 2);
    }
  }
  maxInRange(left, right) {
    let n = this.size, max = 0;
    let left_idx = left + n, right_idx = right + n;
    // left must be even, right must be odd
    // when left is odd or right is even, this indicates partial coverage. 
    // in other words, the parent node will be covering a range outside of the range we are looking for.
    // so, we need to take the partial sum and move the pointers so that it has full coverage.
    while (left_idx <= right_idx) {
      if (left_idx % 2 === 1) {
        max = Math.max(max, this.segTree[left_idx]);
        left_idx++;
      }
      if (right_idx % 2 === 0) {
        max = Math.max(max, this.segTree[right_idx]);
        right_idx--;
      }
      left_idx = Math.floor(left_idx / 2);
      right_idx = Math.floor(right_idx / 2);
    }
    return max;
  }
}

// Three test cases to run function on
console.log(lengthOfLIS([4,2,1,4,3,4,5,8,15], 3)) // 5
console.log(lengthOfLIS([7,4,5,1,8,12,4,7], 5)) // 4
console.log(lengthOfLIS([1,5], 1)) // 1