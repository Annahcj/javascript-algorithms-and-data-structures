// 523. Continuous Subarray Sum
// Given an integer array nums and an integer k, return true if nums has a continuous subarray of size at least two whose elements sum up to a multiple of k, or false otherwise.
// An integer x is a multiple of k if there exists an integer n such that x = n * k. 0 is always a multiple of k.


// Solution: Prefix Sum & Hashmap

// Pretend k is 6.
// Let's say we have two prefix sums: 4,5,10
// 10 - 4 = 6. 6 is a multiple of 6.
// Let's consider another set of prefix sums: 1,5,25
// 25 - 1 = 24. 24 is a multiple of 6. But how do we check for this?
// One way is using mods:

// Notice that 10 % 6 = 4, 4 % 6 = 4.
// Also: 25 % 6 = 1, 1 % 6 = 1.

// The key here is that when two prefix sums modular k are equal, that means we have found a subarray with a sum that is a multiple of k.

// Note: Since the subarray must have a length >= 2, AND we only have to return true or false, 
// we can store the index of the FIRST prefix sum in mods[prefix sum % k].

// mods[i] = index of first prefix sum where prefix sum % k = i.

// Time Complexity: O(n)
// Space Complexity: O(n)
var checkSubarraySum = function(nums, k) {
  let mods = Array(k);
  mods[0] = -1;
  let sum = 0;
  for (var i = 0; i < nums.length; i++) {
    sum += nums[i];
    let mod = sum % k;
    if (mods[mod] !== undefined && mods[mod] !== i - 1) return true; // if we have a prefix sum with the same mod value AND the index is less than i - 1.
    if (mods[mod] === undefined) mods[mod] = i;
  }
  return false;
};

// Three test cases to run function on
console.log(checkSubarraySum([23,2,4,6,7], 6)) // true
console.log(checkSubarraySum([23,2,6,4,7], 6)) // true
console.log(checkSubarraySum([23,2,6,4,7], 13)) // false