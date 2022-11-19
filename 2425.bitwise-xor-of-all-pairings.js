// 2425. Bitwise XOR of All Pairings
// You are given two 0-indexed arrays, nums1 and nums2, consisting of non-negative integers. There exists another array, nums3, which contains the bitwise XOR of all pairings of integers between nums1 and nums2 (every integer in nums1 is paired with every integer in nums2 exactly once).
// Return the bitwise XOR of all integers in nums3.


// Solution: Greedy

// It doesn't matter what order we XOR the numbers together.
// Each nums1[i] will be included in the XOR nums2.length number of times.
// Each nums2[i] will be included in the XOR nums1.length number of times.

// When XORing a number with itself, there are two possibilities:
  // 1. If you XOR an even number of times, the number becomes 0 (e.g: 2 ^ 2 ^ 2 ^ 2 = 0)
  // 2. If you XOR an odd number of times, the number stays in its original state (e.g: 2 ^ 2 ^ 2 = 2)
// For this reason, we already know the final value of XORing a number with itself and can compute the answer efficiently.

// Time Complexity: O(n + m) 137ms
// Space Complexity: O(1) 52.6MB
var xorAllNums = function(nums1, nums2) {
  let xor = 0;
  for (let i = 0; i < nums1.length; i++) {
    let xorNums1 = nums2.length % 2 === 0 ? 0 : nums1[i];
    xor ^= xorNums1;
  }
  for (let i = 0; i < nums2.length; i++) {
    let xorNums2 = nums1.length % 2 === 0 ? 0 : nums2[i];
    xor ^= xorNums2;
  }
  return xor;
};

// Two test cases
console.log(xorAllNums([2,1,3], [10,2,5,0])) // 13
console.log(xorAllNums([1,2], [3,4])) // 0