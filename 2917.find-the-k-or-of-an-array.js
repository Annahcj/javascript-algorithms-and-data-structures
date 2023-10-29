// 2917. Find the K-or of an Array
// You are given a 0-indexed integer array nums, and an integer k.
// The K-or of nums is a non-negative integer that satisfies the following:
  // The ith bit is set in the K-or if and only if there are at least k elements of nums in which bit i is set.
// Return the K-or of nums.
// Note that a bit i is set in x if (2i AND x) == 2i, where AND is the bitwise AND operator.


// Solution: Count Bits

// For each bit i, get the count of numbers where the ith bit is set.
// Based on those counts, construct the K-or.

// Time Complexity: O(n log(n)) 63ms
// Space Complexity: O(1) 44.1MB
var findKOr = function(nums, k) {
  let ans = 0;
  for (let i = 0; i < 32; i++) {
    if (atLeastK(nums, k, i)) {
      ans |= (1 << i);
    }
  }
  return ans;
};

function atLeastK(nums, k, bit) {
  let n = nums.length, count = 0;
  for (let i = 0; i < n; i++) {
    let bitIsSet = (nums[i] >> bit) & 1;
    if (bitIsSet) count++;
    if (count >= k) return true;
  }
  return false;
}

// Three test cases
console.log(findKOr([7,12,9,8,9,15], 4)) // 9
console.log(findKOr([2,12,1,11,4,5], 6)) // 0
console.log(findKOr([10,8,5,9,11,6,8], 1)) // 15