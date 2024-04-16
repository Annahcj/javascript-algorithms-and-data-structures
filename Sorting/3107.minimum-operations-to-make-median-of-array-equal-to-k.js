// 3107. Minimum Operations to Make Median of Array Equal to K
// You are given an integer array nums and a non-negative integer k. In one operation, you can increase or decrease any element by 1.
// Return the minimum number of operations needed to make the median of nums equal to k.
// The median of an array is defined as the middle element of the array when it is sorted in non-decreasing order. If there are two choices for a median, the larger of the two values is taken.


// Solution: Sorting

// Sort nums in asc order to find the median.
// If n is even, pick the higher median: n / 2.
// In order to change the median to k, 
  // all numbers to the left of the median must be smaller than or equal to k.
  // all numbers to the right of the median must be larger than or equal to k.

// Time Complexity: O(n log(n)) 191ms
// Space Complexity: O(log(n)) (space for sorting) 68.3MB
var minOperationsToMakeMedianK = function(nums, k) {
  nums.sort((a, b) => a - b);
  let n = nums.length, mid = Math.floor(n / 2);
  let operations = Math.abs(nums[mid] - k);
  for (let i = mid - 1; i >= 0 && nums[i] > k; i--) {
    operations += nums[i] - k;
  }
  for (let i = mid + 1; i < n && nums[i] < k; i++) {
    operations += k - nums[i];
  }
  return operations;
};

// Three test cases
console.log(minOperationsToMakeMedianK([2,5,6,8,5], 4)) // 2
console.log(minOperationsToMakeMedianK([2,5,6,8,5], 7)) // 3
console.log(minOperationsToMakeMedianK([1,2,3,4,5,6], 4)) // 0