// 3392. Count Subarrays of Length Three With a Condition
// Given an integer array nums, return the number of subarrays of length 3 such that the sum of the first and third numbers equals exactly half of the second number.


// Solution: Enumeration

// Check every subarray by iterating over every index and checking the sum.

// Time Complexity: O(n) 2ms
// Space Complexity: O(1) 55.8MB
function countSubarrays(nums) {
  const n = nums.length;
  let count = 0;
  for (let i = 0; i < n - 2; i++) {
    if (nums[i] + nums[i + 2] === nums[i + 1] / 2) {
      count++;
    }
  }
  return count;
};

// Two test cases
console.log(countSubarrays([1,2,1,4,1])) // 1
console.log(countSubarrays([1,1,1])) // 0