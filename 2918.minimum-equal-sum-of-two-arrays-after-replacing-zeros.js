// 2918. Minimum Equal Sum of Two Arrays After Replacing Zeros
// You are given two arrays nums1 and nums2 consisting of positive integers.
// You have to replace all the 0's in both arrays with strictly positive integers such that the sum of elements of both arrays becomes equal.
// Return the minimum equal sum you can obtain, or -1 if it is impossible.


// Solution: Greedy Logic

// Count the sum and number of zeros in nums1 and nums2.
// Get the base sum for both arrays, which is turning all the zeros into 1's, since that is the minimum.
// From there, we can take the maximum sum, because the smaller side can always increase their zeros to a higher number to make the sums equal.
// The only case where this is impossible, is if one side is less than the other, but there is no zero present that we can turn into a larger number.

// n = length of nums1, m = length of nums2
// Time Complexity: O(n + m) 74ms
// Space Complexity: O(1) 54.6MB
var minSum = function(nums1, nums2) {
  let n = nums1.length, m = nums2.length;
  let sum1 = 0, zeros1 = 0;
  for (let i = 0; i < n; i++) {
    sum1 += nums1[i];
    zeros1 += nums1[i] === 0 ? 1 : 0;
  }
  let sum2 = 0, zeros2 = 0;
  for (let i = 0; i < m; i++) {
    sum2 += nums2[i];
    zeros2 += nums2[i] === 0 ? 1 : 0;
  }
  let baseSum1 = sum1 + zeros1, baseSum2 = sum2 + zeros2;
  if (baseSum1 > baseSum2 && zeros2 === 0) return -1;
  if (baseSum2 > baseSum1 && zeros1 === 0) return -1;
  return Math.max(baseSum1, baseSum2);
};

// Two test cases
console.log(minSum([3,2,0,1,0], [6,5,0])) // 12
console.log(minSum([2,0,2,0], [1,4])) // -1