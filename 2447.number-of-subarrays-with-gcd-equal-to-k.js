// 2447. Number of Subarrays With GCD Equal to K
// Given an integer array nums and an integer k, return the number of subarrays of nums where the greatest common divisor of the subarray's elements is k.
// A subarray is a contiguous non-empty sequence of elements within an array.
// The greatest common divisor of an array is the largest integer that evenly divides all the array elements.


// Solution: Brute Force

// To get the GCD of an array of elements, keep the running GCD starting from arr[0].
  // For each arr[i], gcd = getGCD(gcd, arr[i]).

// Take each nums[i] as the start of the subarray.
  // Keep the running GCD from index i.
  // Go through each index j as the end of the subarray.

// Time Complexity: O(n^2 * log(n)) 123ms
// Space Complexity: O(1) 41.6MB
var subarrayGCD = function(nums, k) {
  let n = nums.length, ans = 0;
  for (let i = 0; i < n; i++) {
    let gcd = nums[i];
    for (let j = i; j < n; j++) {
      gcd = getGCD(gcd, nums[j]);
      if (gcd === k) ans++;
    }
  }
  return ans;  
};

function getGCD(a, b) {
  if (b === 0) return a;
  return getGCD(b, a % b);
}

// Two test cases
console.log(subarrayGCD([9,3,1,2,6,3], 3)) // 4
console.log(subarrayGCD([4], 7)) // 0