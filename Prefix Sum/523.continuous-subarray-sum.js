// 523. Continuous Subarray Sum
// Given an integer array nums and an integer k, return true if nums has a continuous subarray of size at least two whose elements sum up to a multiple of k, or false otherwise.
// An integer x is a multiple of k if there exists an integer n such that x = n * k. 0 is always a multiple of k.


// Solution: Prefix Sum w/ Modulo

// Keep track of the previous modulo prefix sums.
// For a valid subarray, there should be a previous modulo prefix sum with the same modulo as the current prefix sum. 
  // This is because the sum of the subarray % k should be equal to 0.

// Since the subarray size must be at least two, we can try to find the longest subarray possible.
// To get the longest subarray, we only need to keep track of the earliest index of a prefix sum.

// Time Complexity: O(n) 104ms
// Space Complexity: O(n) 64.3MB
var checkSubarraySum = function(nums, k) {
  let map = new Map(), n = nums.length, sum = 0;
  map.set(0, -1);
  for (let i = 0; i < n; i++) {
    sum = (sum + nums[i]) % k;
    if (map.has(sum)) {
      let prevIndex = map.get(sum);
      if (i - prevIndex >= 2) return true;
    } else {
      map.set(sum, i);
    }
  }
  return false;
};

// Three test cases to run function on
console.log(checkSubarraySum([23,2,4,6,7], 6)) // true
console.log(checkSubarraySum([23,2,6,4,7], 6)) // true
console.log(checkSubarraySum([23,2,6,4,7], 13)) // false