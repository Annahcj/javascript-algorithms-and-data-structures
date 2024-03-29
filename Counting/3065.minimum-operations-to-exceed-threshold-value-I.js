// 3065. Minimum Operations to Exceed Threshold Value I
// You are given a 0-indexed integer array nums, and an integer k.
// In one operation, you can remove one occurrence of the smallest element of nums.
// Return the minimum number of operations needed so that all elements of the array are greater than or equal to k.


// Solution: Sorting

// Count the number of elements that are smaller than k.

// Time Complexity: O(n) 69ms
// Space Complexity: O(1) 50.4MB
var minOperations = function(nums, k) {
  let count = 0;
  for (let num of nums) {
    if (num < k) count++;
  }  
  return count;
};