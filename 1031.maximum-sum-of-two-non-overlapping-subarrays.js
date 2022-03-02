// 1031. Maximum Sum of Two Non-Overlapping Subarrays
// Given an integer array nums and two integers firstLen and secondLen, return the maximum sum of elements in two non-overlapping subarrays with lengths firstLen and secondLen.
// The array with length firstLen could occur before or after the array with length secondLen, but they have to be non-overlapping.
// A subarray is a contiguous part of an array.


// Solution: Prefix Sum & Sliding Window

// Use prefix sum and sliding window to populate an array 'bestSum'.
// bestSum[i] = best sum of a subarray of length secondLen starting at index i or above.

// We could do the same for the left subarray but it seems unnecessary, we only need that for one side.
// Use a sliding window to find the best sum of the first subarray and the second subarray (bestSum[current index + 1]).

// Time Complexity: O(n) 71ms
// Space Complexity: O(n) 43.1MB
var maxSumTwoNoOverlap = function(nums, firstLen, secondLen) {
  return Math.max(getMaxSum(firstLen, secondLen), getMaxSum(secondLen, firstLen));
  
  function getMaxSum(firstLen, secondLen) {
    let n = nums.length, bestSum = Array(n).fill(0);
    let sum = 0;
    for (let i = n - 1; i >= firstLen; i--) {
      sum += nums[i];
      if (i < n - secondLen) sum -= nums[i + secondLen];
      if (i <= n - secondLen) {
        // when subarray length is 1
        bestSum[i] = i < n - 1 ? Math.max(bestSum[i + 1], sum) : sum;
      }
    }
    sum = 0;
    let res = 0;
    for (let i = 0; i < n - secondLen; i++) {
      sum += nums[i];
      if (i >= firstLen) sum -= nums[i - firstLen];
      if (i >= firstLen - 1) {
        res = Math.max(res, sum + bestSum[i + 1]);
      }
    }
    return res;
  }
};

// Two test cases to run function on
console.log(maxSumTwoNoOverlap([0,6,5,2,2,5,1,9,4], 1, 2)) // 20
console.log(maxSumTwoNoOverlap([3,8,1,3,2,1,8,9,0], 3, 2)) // 29