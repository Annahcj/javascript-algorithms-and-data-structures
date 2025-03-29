// 891. Sum of Subsequence Widths
// The width of a sequence is the difference between the maximum and minimum elements in the sequence.
// Given an array of integers nums, return the sum of the widths of all the non-empty subsequences of nums. Since the answer may be very large, return it modulo 10^9 + 7.
// A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. For example, [3,6,2,7] is a subsequence of the array [0,3,1,6,2,2,7].


// Solution: Math

// In a subsequence, finding the maximum and minimum elements means the order of numbers does not matter.
// Hence, sort nums in asc order.

// Count the number of subsequences every nums[i] appears as the maximum and minimum.
// In the sorted array, every nums[i] is the maximum in 2^i subsequences and the minimum in 2^(n-i-1) subsequences.
// At the end, return the maximum sum - minimum sum.

// Time Complexity: O(n log(n)) 109ms
// Space Complexity: O(log(n)) (space for sorting) 69.4MB
function sumSubseqWidths(nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length, MOD = 1000000007n;
  let maxSum = 0n, subsequencesLeft = 1n;
  for (let i = 0; i < n; i++) {
    maxSum = (maxSum + BigInt(nums[i]) * subsequencesLeft) % MOD;
    subsequencesLeft = (subsequencesLeft * 2n) % MOD;
  } 
  let minSum = 0n, subsequencesRight = 1n; 
  for (let i = n - 1; i >= 0; i--) {
    minSum = (minSum + BigInt(nums[i]) * subsequencesRight) % MOD;
    subsequencesRight = (subsequencesRight * 2n) % MOD;
  }
  return Number((maxSum - minSum + MOD) % MOD);
};

// Two test cases
console.log(sumSubseqWidths([2,1,3])) // 6
console.log(sumSubseqWidths([2])) // 0