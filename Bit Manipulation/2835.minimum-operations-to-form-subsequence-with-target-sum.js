// 2835. Minimum Operations to Form Subsequence With Target Sum
// You are given a 0-indexed array nums consisting of non-negative powers of 2, and an integer target.
// In one operation, you must apply the following changes to the array:
  // Choose any element of the array nums[i] such that nums[i] > 1.
  // Remove nums[i] from the array.
  // Add two occurrences of nums[i] / 2 to the end of nums.
// Return the minimum number of operations you need to perform so that nums contains a subsequence whose elements sum to target. If it is impossible to obtain such a subsequence, return -1.
// A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.


// Solution: Greedy

// Go through each bit from least to most significant in the bit representation of target.
// Smaller bits can be summed up to a larger bit. If there are any left over we greedily sum these up to larger bits.
// If we don't have any occurances of the current bit in target, we need to get the nearest larger bit and split that to use for the current bit.
  // e.g: bit we need = 4, bit we have = 16.
  // Split 16 into (8, 8), then split 8 into (4, 4).
  // We use one 4 for the current bit, then we have extra (4, 8) leftover after splitting.
  // We lose one occurance of 16.

// n = length of nums, m = target
// Time Complexity: O(n + log(m)^2) 65ms
// Space Complexity: O(log(m)) 45MB
var minOperations = function(nums, target) {
  let count = Array(32).fill(0);
  for (let num of nums) {
    count[Math.log2(num)]++;
  }
  let splits = 0;
  for (let i = 0; i < 32; i++) {
    if ((target >> i) & 1) {
      if (count[i] > 0) {
        count[i]--;
      } else {
        // find the smallest larger bit that's available
        let nextLarger = i + 1;
        while (nextLarger < 32 && count[nextLarger] === 0) {
          nextLarger++;
        }
        if (nextLarger === 32) return -1;
        count[nextLarger]--;
        // update the counts for the newly split bits
        for (let j = nextLarger - 1; j >= i; j--) {
          count[j]++;
        }
        splits += nextLarger - i;
      }
    }
    count[i + 1] += Math.floor(count[i] / 2); // two smaller bits can be summed up to the next larger bit
  }
  return splits;
};

// Three test cases
console.log(minOperations([1,2,8], 7)) // 1
console.log(minOperations([1,32,1,2], 12)) // 2
console.log(minOperations([1,32,1], 35)) // -1