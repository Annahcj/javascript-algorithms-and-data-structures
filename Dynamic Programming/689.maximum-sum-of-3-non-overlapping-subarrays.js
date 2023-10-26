// 689. Maximum Sum of 3 Non-Overlapping Subarrays
// Given an integer array nums and an integer k, find three non-overlapping subarrays of length k with maximum sum and return them.
// Return the result as a list of indices representing the starting position of each interval (0-indexed). If there are multiple answers, return the lexicographically smallest one.


// Solution: DP & Sliding Window

// 1. Use sliding window to count the sum of each subarray of length k. 
  // Fill each start[i], where start[i] = subarray sum starting at i
  // Fill each end[i], where end[i] = subarray sum ending at i
// 2. Loop from right to left and fill each rightStart[i], where rightStart[i] = starting index of max sum subarray starting at index >= i
// 3. Loop from left to right and keep track of the end index of the max sum subarray on the left.
  // Find the best three starting indexes with the maximum total subarray sum.

// Time Complexity: O(n) 169ms
// Space Complexity: O(n) 47.7MB
var maxSumOfThreeSubarrays = function(nums, k) {
  let n = nums.length; 
  let start = Array(n).fill(0), end = Array(n).fill(0); // start[i] = subarray sum starting at i
  let sum = 0;
  for (let j = 0, i = 0; j < n; j++) {
    // move i up when j - i > k
    sum += nums[j];
    if (j - i + 1 > k) {
      sum -= nums[i++];
    }
    if (j >= k - 1) {
      start[i] = sum;
      end[j] = sum;
    }
  }
  // dp for max sum on left and max sum on right
  let rightStart = Array(n); // rightStart[i] = starting index of max sum subarray
  rightStart[n - 1] = n - 1;
  for (let i = n - 2; i >= 0; i--) {
    if (start[i] >= start[rightStart[i + 1]]) rightStart[i] = i;
    else rightStart[i] = rightStart[i + 1];
  }
  
  let leftEnd = 0;
  let max = 0, res = Array(3);
  for (let i = 0; i < n; i++) {
    // i = end index of subarray
    let rightStartIdx = rightStart[i + k + 1];
    if (rightStartIdx > n - k) break;
    
    if (end[i] > end[leftEnd]) leftEnd = i;
    
    let sum = end[leftEnd] + start[i + 1] + start[rightStartIdx];
    if (sum > max) {
      res = [leftEnd - k + 1, i + 1, rightStartIdx];
      max = sum;
    }
  }
  return res;
};

// Two test cases to run function on
console.log(maxSumOfThreeSubarrays([1,2,1,2,6,7,5,1], 2)) // [0,3,5]
console.log(maxSumOfThreeSubarrays([1,2,1,2,1,2,1,2,1], 2)) // [0,2,4]