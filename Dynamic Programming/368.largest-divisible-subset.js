// 368. Largest Divisible Subset
// Given a set of distinct positive integers nums, return the largest subset answer such that every pair (answer[i], answer[j]) of elements in this subset satisfies:
//   answer[i] % answer[j] == 0, or
//   answer[j] % answer[i] == 0
// If there are multiple solutions, return any of them.


// Solution: DP

// Sort nums in asc order.
// Build up the subset taking the numbers in sorted order.
// When we take a new number, it must be a multiple of the last number (the largest number) in the subset so far.
// Reasoning: Because every number is a multiple of the last, it will always be a multiple of all numbers in the subset so far.

// Use DP to find the longest subset ending at each nums[i], after sorting.
// dp[i] = longest subset ending at nums[i], where nums[i] is the largest number in the subset.
// For each dp[i], go through all possible previous numbers and take the dp[j] with the maximum length.

// Since we need to return the numbers in the subset, additionally keep track of the previous index in the subset.
// At the end, we can use the chain of previous indices to find the result array.

// n = length of nums
// Time Complexity: O(n^2) 74ms
// Space Complexity: O(n) 51.4MB
var largestDivisibleSubset = function(nums) {
  nums.sort((a, b) => a - b);
  let n = nums.length, dp = Array(n).fill(1);
  let resultIndex = 0, prev = Array(n).fill(-1);
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] % nums[j] === 0) {
        if (dp[j] + 1 > dp[i]) {
          dp[i] = dp[j] + 1;
          prev[i] = j;
        }
      }
    }
    if (dp[i] > dp[resultIndex]) {
      resultIndex = i;
    }
  }
  let subset = [];
  while (resultIndex !== -1) {
    subset.push(nums[resultIndex]);
    resultIndex = prev[resultIndex];
  }
  return subset.reverse();
};

// Three test cases
console.log(largestDivisibleSubset([2,3,4,8])) // [2,4,8]
console.log(largestDivisibleSubset([1,2,3])) // [1,2]
console.log(largestDivisibleSubset([1,2,4,8])) // [1,2,4,8]