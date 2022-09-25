// 2419. Longest Subarray With Maximum Bitwise AND
// You are given an integer array nums of size n.
// Consider a non-empty subarray from nums that has the maximum possible bitwise AND.
  // In other words, let k be the maximum value of the bitwise AND of any subarray of nums. Then, only subarrays with a bitwise AND equal to k should be considered.
// Return the length of the longest such subarray.
// The bitwise AND of an array is the bitwise AND of all the numbers in it.
// A subarray is a contiguous sequence of elements within an array.


// Solution: Longest Consecutive Max Number

// The maximum bitwise AND is the maximum number in the array.
// Find the length of the longest subarray consisting of the max number.

// Time Complexity: O(n) 156ms
// Space Complexity: O(1) 54.2MB
var longestSubarray = function(nums) {
  let n = nums.length, max = Math.max(...nums);
  let len = 0, maxLen = 0;
  for (let i = 0; i < n; i++) {
    if (nums[i] === max) len++;
    else len = 0;
    maxLen = Math.max(maxLen, len);
  }
  return maxLen;
};

// Two test cases to run function on
console.log(longestSubarray([1,2,3,3,2,2])) // 2
console.log(longestSubarray([1,2,3,4])) // 1