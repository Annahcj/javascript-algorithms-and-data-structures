// 915. Partition Array into Disjoint Intervals
// Given an integer array nums, partition it into two (contiguous) subarrays left and right so that:
  // Every element in left is less than or equal to every element in right.
  // left and right are non-empty.
  // left has the smallest possible size.
// Return the length of left after such a partitioning.
// Test cases are generated such that partitioning exists.


// Solution: Max Right & Min Left

// For each index i, keep track of:
  // 1. The maximum number on the left or at index i
  // 2. The minimum number on the right or at index i

// Find the first index i where maxLeft[i] <= minRight[i + 1].

// Time Complexity: O(n) 162ms
// Space Complexity: O(n) 53.9MB
var partitionDisjoint = function(nums) {
  let n = nums.length, minRight = Array(n);
  minRight[n - 1] = nums[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    minRight[i] = Math.min(nums[i], minRight[i + 1]);
  }
  
  let maxLeft = 0;
  for (let i = 0; i < n - 1; i++) {
    maxLeft = Math.max(maxLeft, nums[i]);
    if (maxLeft <= minRight[i + 1]) return i + 1;
  }
};

// Two test cases
console.log(partitionDisjoint([5,0,3,8,6])) // 3
console.log(partitionDisjoint([1,1,1,0,6,12])) // 4