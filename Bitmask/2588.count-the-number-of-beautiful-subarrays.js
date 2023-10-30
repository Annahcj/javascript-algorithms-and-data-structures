// 2588. Count the Number of Beautiful Subarrays
// You are given a 0-indexed integer array nums. In one operation, you can:
  // Choose two different indices i and j such that 0 <= i, j < nums.length.
  // Choose a non-negative integer k such that the kth bit (0-indexed) in the binary representation of nums[i] and nums[j] is 1.
  // Subtract 2k from nums[i] and nums[j].
// A subarray is beautiful if it is possible to make all of its elements equal to 0 after applying the above operation any number of times.
// Return the number of beautiful subarrays in the array nums.
// A subarray is a contiguous non-empty sequence of elements within an array.


// Solution: Prefix Bitmasks & Hashmap 

// Keep track of the running prefix bitmask as we go through nums.
// Since we only need to know whether the number of 1 bits at each position is even or odd, we can use 0 to represent an even number of bits, and 1 to represent an odd number of bits.
// For each index i, count the number of previous prefix bitmasks with the exact same state as the current bitmask.
// If the bitmasks are the same, that means each bit has an even count for the subarray between index i and the previous bitmask.
// Use a hashmap to count the occurances of each bitmask.

// Time Complexity: O(n) 142ms
// Space Complexity: O(n) 74.7MB
var beautifulSubarrays = function(nums) {
  let mask = 0, count = new Map(), ans = 0;
  count.set(0, 1);
  for (let i = 0; i < nums.length; i++) {
    mask = mask ^ nums[i];
    ans += (count.get(mask) || 0);
    count.set(mask, (count.get(mask) || 0) + 1);
  }
  return ans;
};

// Two test cases
console.log(beautifulSubarrays([4,3,1,2,4])) // 2
console.log(beautifulSubarrays([1,10,4])) // 0