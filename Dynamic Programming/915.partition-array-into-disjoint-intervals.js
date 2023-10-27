// 915. Partition Array into Disjoint Intervals
// Given an integer array nums, partition it into two (contiguous) subarrays left and right so that:
  // Every element in left is less than or equal to every element in right.
  // left and right are non-empty.
  // left has the smallest possible size.
// Return the length of left after such a partitioning.
// Test cases are generated such that partitioning exists.


// Solution 1: Max Right & Min Left

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

// Solution 2: O(1) space

// Keep track of:
  // 1. currMax: the maximum number in the left side of the current partition
  // 2. max: the current maximum of all numbers from 0 to the current index

// When nums[i] < currMax, the current partition is invalid.
// Otherwise, we don't need to update currMax because the order of numbers don't matter unless numbers on the right < maximum on the left.

// Time Complexity: O(n) 136ms
// Space Complexity: O(1)  52.6MB
var partitionDisjoint = function(nums) {
  let n = nums.length, currMax = nums[0], max = currMax;
  let left = 1;
  for (let i = 1; i < n; i++) {
    max = Math.max(max, nums[i]);
    if (nums[i] < currMax) {
      currMax = max;
      left = i + 1;
    }
  }
  return left;
};

// Two test cases
console.log(partitionDisjoint([5,0,3,8,6])) // 3
console.log(partitionDisjoint([1,1,1,0,6,12])) // 4