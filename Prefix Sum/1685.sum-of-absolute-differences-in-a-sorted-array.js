// 1685. Sum of Absolute Differences in a Sorted Array
// You are given an integer array nums sorted in non-decreasing order.
// Build and return an integer array result with the same length as nums such that result[i] is equal to the summation of absolute differences between nums[i] and all the other elements in the array.
// In other words, result[i] is equal to sum(|nums[i]-nums[j]|) where 0 <= j < nums.length and j != i (0-indexed).


// Solution 1: Prefix Sum

// Prefix sum for nums, where sum[i] = sum of the numbers [nums[0], ..., nums[i]]
// To calculate the absolute difference for nums[i] with all other numbers, split it into two sides.
  // 1. Left side sum: absolute value of -> (i + 1) * nums[i] - sum of [nums[0], ..., nums[i]] 
    // Explanation:
    // (i + 1) * nums[i] = the current number repeated (i + 1) times.
    // - sum of [nums[0], ..., nums[i]] = compare each nums[i] with each of the numbers before and up to index i.
    // We are combining this into a sum instead of comparing each number one at a time.
  // 2. Right side sum: the same as the left sum, except we need to use the sum of the numbers on the right.

// Time Complexity: O(n) 262ms
// Space Complexity: O(n) 72.8MB
var getSumAbsoluteDifferences = function(nums) {
  let n = nums.length, sum = Array(n);
  sum[0] = nums[0];
  for (let i = 1; i < n; i++) {
    sum[i] = sum[i - 1] + nums[i];
  }
  let res = Array(n);
  for (let i = 0; i < n; i++) {
    let leftSum = Math.abs((i + 1) * nums[i] - sum[i]);
    let rightSum = Math.abs((n - i - 1) * nums[i] - (sum[n - 1] - sum[i]));
    res[i] = leftSum + rightSum;
  }
  return res;
};

// Solution 2: Prefix Sum - Optimized Space

// Keep a running sum for the left and right sums to reduce O(n) space to O(1).

// Time Complexity: O(n) 269ms
// Space Complexity: O(1) 78.7MB
var getSumAbsoluteDifferences = function(nums) {
  let n = nums.length, res = Array(n), leftSum = 0;
  let rightSum = nums.reduce((acc, num) => acc + num);
  for (let i = 0; i < n; i++) {
    let left = Math.abs(i * nums[i] - leftSum);
    let right = Math.abs((n - i) * nums[i] - rightSum);
    res[i] = left + right;
    
    leftSum += nums[i];
    rightSum -= nums[i];
  }
  return res;
};

// Two test cases
console.log(getSumAbsoluteDifferences([2,3,5])) // [4,3,5]
console.log(getSumAbsoluteDifferences([1,4,6,8,10])) // [24,15,13,15,21]