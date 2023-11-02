// 713. Subarray Product Less Than K
// Given an array of integers nums and an integer k, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than k.


// Solution: Sliding Window

// Maintain a sliding window ending at each index j, where the product of each element in the window is less than k.
// Move the left pointer (i) up when the product becomes bigger than or equal to k.
// Then, add j - i + 1 to our answer.
// This represents each subarray ending at index j.

// Time Complexity: O(n) 144ms
// Space Complexity: O(1) 48MB
var numSubarrayProductLessThanK = function(nums, k) {
  if (k <= 1) return 0;
  let ans = 0, prod = 1;
  for (let j = 0, i = 0; j < nums.length; j++) {
    prod *= nums[j];
    while (prod >= k) prod /= nums[i++];
    ans += j - i + 1;
  }
  return ans;
};

// Two test cases to run function on
console.log(numSubarrayProductLessThanK([10,5,2,6], 100)) // 8
console.log(numSubarrayProductLessThanK([1,2,3], 0)) // 0