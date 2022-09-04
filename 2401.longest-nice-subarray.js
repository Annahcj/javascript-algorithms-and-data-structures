// 2401. Longest Nice Subarray
// You are given an array nums consisting of positive integers.
// We call a subarray of nums nice if the bitwise AND of every pair of elements that are in different positions in the subarray is equal to 0.
// Return the length of the longest nice subarray.
// A subarray is a contiguous part of an array.
// Note that subarrays of length 1 are always considered nice.


// Solution: Sliding Window

// A nice subarray will not share the same bits.
// Use a sliding window and use a bitmask to keep track of the bits that we have.
// If at any point we have overlapping bits, move the left pointer up until they don't overlap.
  // To remove a number from the bitmask, use XOR: mask ^ nums[i]
  // To add a number to the bitmask, use OR: mask | nums[j]

// Time Complexity: O(n) 123ms
// Space Complexity: O(1) 52MB
var longestNiceSubarray = function(nums) {
  let n = nums.length, mask = 0, maxLen = 1;
  for (let j = 0, i = 0; j < n; j++) {
    while ((mask & nums[j]) !== 0) {
      mask ^= nums[i++];
    }
    mask |= nums[j];
    maxLen = Math.max(maxLen, j - i + 1);
  }  
  return maxLen;
};

// Two test cases to run function on
console.log(longestNiceSubarray([1,3,8,48,10])) // 3
console.log(longestNiceSubarray([3,1,5,11,13])) // 1