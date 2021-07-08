// 53. Maximum Subarray
// Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum

// Solution 1: Kadane's Algorithm
// At any given position of an array, we decide whether to replace the sum with the current number, or add it to the current sum.
// We also continuously update our max to get the biggest sum, which we will return in the end.

// Time Complexity: O(n) 100ms
// Space Complexity: O(1) 40.2MB
var maxSubArray = function(nums) {
    let max = -Infinity, tempMax = -Infinity;
    for (var i = 0; i < nums.length; i++) {
      tempMax = Math.max(nums[i], tempMax + nums[i]);
      max = Math.max(max, tempMax);
    }
    return max;
  };
  
  // Two test cases to run function on
  console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])) // 6
  console.log(maxSubArray([5,4,-1,7,8])) // 23