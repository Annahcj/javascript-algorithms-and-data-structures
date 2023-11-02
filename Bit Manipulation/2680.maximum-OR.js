// 2680. Maximum OR
// You are given a 0-indexed integer array nums of length n and an integer k. In an operation, you can choose an element and multiply it by 2.
// Return the maximum possible value of nums[0] | nums[1] | ... | nums[n - 1] that can be obtained after applying the operation on nums at most k times.
// Note that a | b denotes the bitwise or between two integers a and b.

 
// Solution: Greedy & Prefix/Suffix OR 

// Multiplying a number by two means shifting all bits left by 1.
// It is optimal to apply all operations on one number, since that maximizes the final result.
// There are cases where applying all operations on the maximum number may not result in the maximum bitwise OR, e.g: nums = [12,9], k = 1.
// Keep a prefix and suffix OR and record the best result of applying k operations to each number.

// Time Complexity: O(n) 357ms
// Space Complexity: O(n) 95MB
var maximumOr = function(nums, k) {
  let n = nums.length, suffixOR = [...nums].map((num) => BigInt(num));
  for (let i = n - 2; i >= 0; i--) {
    suffixOR[i] = suffixOR[i] | suffixOR[i + 1];
  }
  k = BigInt(k);
  let prefixOR = 0n, maxOR = 0n;
  for (let i = 0; i < n; i++) {
    let shiftedNum = BigInt(nums[i]) << k;
    let totalOR = prefixOR | shiftedNum | (i === n - 1 ? 0n : suffixOR[i + 1]);
    maxOR = totalOR > maxOR ? totalOR : maxOR;
    prefixOR |= BigInt(nums[i]);
  }
  return Number(maxOR);
}; 

// Two test cases
console.log(maximumOr([12,9], 1)) // 30
console.log(maximumOr([8,1,2], 2)) // 35