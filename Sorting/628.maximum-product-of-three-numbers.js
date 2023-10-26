// 628. Maximum Product of Three Numbers
// Given an integer array nums, find three numbers whose product is maximum and return the maximum product.


// Solution: Sorting

// Take the max of two options:
  // 1. The 3 biggest numbers
    // Three biggest positives
  // 2. The biggest number & the two smallest numbers (considering negative values)
    // Biggest positive & two smallest negatives = Positive

// Note: The time complexity can be improved to O(n) by using a heap (O(k), where k is 3).

// Time Complexity: O(n log(n)) 112ms
// Space Complexity: O(log(n)) (space for sorting) 47.3MB
var maximumProduct = function(nums) {
  nums.sort((a, b) => b - a);
  return Math.max(nums[0] * nums[1] * nums[2], nums[0] * nums[nums.length - 1] * nums[nums.length - 2]);
};

// Three test cases to run function on
console.log(maximumProduct([1,2,3])) // 6
console.log(maximumProduct([1,2,3,4])) // 24
console.log(maximumProduct([2,-1,-2,-3])) // 12