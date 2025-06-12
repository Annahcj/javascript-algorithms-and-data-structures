// 3423. Maximum Difference Between Adjacent Elements in a Circular Array
// Given a circular array nums, find the maximum absolute difference between adjacent elements.
// Note: In a circular array, the first and last elements are adjacent.


// Solution: 

// Compare each adjacent pair of numbers and record the maximum absolute difference.
// For the circular property, compare the first and last numbers.

// Time Complexity: O(n) 0ms
// Space Complexity: O(1) 55MB
function maxAdjacentDistance(nums) {
  const n = nums.length;
  let maxDiff = Math.abs(nums[0] - nums[n - 1]);
  for (let i = 1; i < n; i++) {
    maxDiff = Math.max(maxDiff, Math.abs(nums[i] - nums[i - 1]));
  }
  return maxDiff;
};

// Two test cases
console.log(maxAdjacentDistance([1,2,4])) // 3
console.log(maxAdjacentDistance([-5,-10,-5])) // 5