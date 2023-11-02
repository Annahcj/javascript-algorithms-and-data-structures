// 2567. Minimum Score by Changing Two Elements
// You are given a 0-indexed integer array nums.
  // The low score of nums is the minimum value of |nums[i] - nums[j]| over all 0 <= i < j < nums.length.
  // The high score of nums is the maximum value of |nums[i] - nums[j]| over all 0 <= i < j < nums.length.
  // The score of nums is the sum of the high and low scores of nums.
// To minimize the score of nums, we can change the value of at most two elements of nums.
// Return the minimum possible score after changing the value of at most two elements of nums.
// Note that |x| denotes the absolute value of x.


// Solution: Greedy w/ Sorting 

// Sort nums in asc order.
// Sliding window of n - 2 elements. There will be 3 windows in total.
// It is optimal to take consecutive windows of n - 2 elements because we will be minimizing differences between elements.
// For each window,
  // Imagine we are changing one number that is outside the window to be equal to the minimum element in the window. This makes the low score always equal to 0.
  // Since low score will always be 0, we just calculate the high score: max element - min element in the window.

// Time Complexity: O(n log(n)) 144ms
// Space Complexity: O(log(n)) (space for sorting) 51.7MB
var minimizeSum = function(nums) {
  nums.sort((a, b) => a - b);
  let n = nums.length;
  return Math.min(nums[n - 3] - nums[0], nums[n - 2] - nums[1], nums[n - 1] - nums[2]);
};

// Two test cases
console.log(minimizeSum([1,4,3])) // 0
console.log(minimizeSum([1,4,7,8,5])) // 3