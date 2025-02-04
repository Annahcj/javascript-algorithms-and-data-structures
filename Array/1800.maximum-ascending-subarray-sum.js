// 1800.maximum-ascending-subarray-sum.js
// 1800. Maximum Ascending Subarray Sum
// Given an array of positive integers nums, return the maximum possible sum of an ascending subarray in nums.
// A subarray is defined as a contiguous sequence of numbers in an array.
// A subarray [nums[l], nums[l+1], ..., nums[r-1], nums[r]] is ascending if for all i where l <= i < r, nums[i]  < nums[i+1]. Note that a subarray of size 1 is ascending.


// Solution: Greedy

// Record the current longest ascending sequence.
// Reset the sequence when nums[i] >= nums[i + 1].
// Record the maximum sum of a sequence.

// Time Complexity: O(n) 0ms
// Space Complexity: O(1) 49.08MB
function maxAscendingSum(nums) {
  const n = nums.length
  let sum = nums[0], maxSum = nums[0];
  for (let i = 1; i < n; i++) {
    if (nums[i - 1] >= nums[i]) {
      sum = nums[i];
    } else {
      sum += nums[i];
    }
    maxSum = Math.max(maxSum, sum);
  }
  return maxSum;
};

// Three test cases
console.log(maxAscendingSum([10,20,30,5,10,50])) // 65
console.log(maxAscendingSum([10,20,30,40,50])) // 150
console.log(maxAscendingSum([12,17,15,13,10,11,12])) // 33