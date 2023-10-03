// 2869. Minimum Operations to Collect Elements
// You are given an array nums of positive integers and an integer k.
// In one operation, you can remove the last element of the array and add it to your collection.
// Return the minimum number of operations needed to collect elements 1, 2, ..., k.


// Solution: Hashset

// Process nums from right to left.
// Store numbers <= k in a hashset.
// When the size of the hashset becomes k, return the length we have processed so far.

// Time Complexity: O(n) 56ms
// Space Complexity: O(k) 43.3MB
var minOperations = function(nums, k) {
  let unique = new Set(), n = nums.length;
  for (let i = n - 1; i >= 0; i--) {
    if (nums[i] <= k) unique.add(nums[i]);
    if (unique.size === k) return n - i;
  }
};

// Three test cases
console.log(minOperations([3,1,5,4,2], 2)) // 4
console.log(minOperations([3,1,5,4,2], 5)) // 5
console.log(minOperations([3,2,5,3,1], 3)) // 4