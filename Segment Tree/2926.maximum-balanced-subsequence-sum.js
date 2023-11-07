// 2926. Maximum Balanced Subsequence Sum
// You are given a 0-indexed integer array nums.
// A subsequence of nums having length k and consisting of indices i[0] < i[1] < ... < i[k-1] is balanced if the following holds:
  // nums[ij] - nums[ij-1] >= ij - ij-1, for every j in the range [1, k - 1].
// A subsequence of nums having length 1 is considered balanced.
// Return an integer denoting the maximum possible sum of elements in a balanced subsequence of nums.
// A subsequence of an array is a new non-empty array that is formed from the original array by deleting some (possibly none) of the elements without disturbing the relative positions of the remaining elements.


// Solution: Segment Tree

// nums[i] - nums[j] >= i - j is equal to nums[i] - i >= nums[j] - j.
// Get the transformed value for each nums[i]: nums[i] - i.
// Sort the transformed values in asc order, while ensuring we still keep track of the original indices.

// Use a segment tree to keep track of the maximum sum of subsequences ending with each nums[original index].
// Go through the sorted values, find the maximum sum ending with an index in the range (0, index), and add it to nums[index].

// Time Complexity: O(n log(n)) 400ms
// Space Complexity: O(n) 97.7MB
var maxBalancedSubsequenceSum = function(nums) {
  let n = nums.length, values = [];
  for (let i = 0; i < n; i++) {
    values.push([nums[i] - i, i]);
  }
  values.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
  
  let segTree = new MaxSegmentTree(n), ans = -Infinity;
  for (let [value, index] of values) {
    let maxSum = Math.max(0, segTree.maxRange(0, index));
    let newMaxSum = maxSum + nums[index];
    segTree.update(index, newMaxSum);
    ans = Math.max(ans, newMaxSum);
  }
  return ans;
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
console.log(maxBalancedSubsequenceSum([3,3,5,6])) // 14
console.log(maxBalancedSubsequenceSum([5,-1,-3,8])) // 13
console.log(maxBalancedSubsequenceSum([-2,-1])) // -1