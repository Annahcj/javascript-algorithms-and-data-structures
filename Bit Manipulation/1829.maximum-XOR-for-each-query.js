// 1829. Maximum XOR for Each Query
// You are given a sorted array nums of n non-negative integers and an integer maximumBit. You want to perform the following query n times:
  // 1. Find a non-negative integer k < 2^maximumBit such that nums[0] XOR nums[1] XOR ... XOR nums[nums.length-1] XOR k is maximized. k is the answer to the ith query.
  // 2. Remove the last element from the current array nums.
// Return an array answer, where answer[i] is the answer to the ith query.


// Solution: Greedy

// Get the total XOR of nums.
// For every index i, remove the n-i-1th number from the total XOR by XORing with itself (x ^ x = 0).
// Then, greedily find the maximum possible k by flipping the most significant 0 bits in the total XOR while k < 2^maximumBit.

// n = length of nums, k = maximumBit
// Time Complexity: O(nk) 74ms
// Space Complexity: O(1) (not including output) 74.4MB
function getMaximumXor(nums, maximumBit) {
  let n = nums.length, xor = 0;
  for (let num of nums) {
    xor = xor ^ num;
  }
  let ans = Array(n);
  for (let i = 0; i < n; i++) {
    let k = 0;
    for (let j = maximumBit - 1; j >= 0; j--) {
      let bit = (xor >> j) & 1;
      let newK = k ^ (1 << j);
      if (bit === 0 && (newK ^ xor) < 2 ** maximumBit) {
         k = newK;
      }
    }
    ans[i] = k;
    xor = xor ^ nums[n - i - 1];
  }
  return ans;
};

// Three test cases
console.log(getMaximumXor([0,1,1,3], 2)) // [0,3,2,3]
console.log(getMaximumXor([2,3,4,7], 3)) // [5,2,6,5]
console.log(getMaximumXor([0,1,2,2,5,7], 3)) // [4,3,6,4,6,7]