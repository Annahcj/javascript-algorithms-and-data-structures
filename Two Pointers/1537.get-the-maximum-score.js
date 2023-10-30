// 1537. Get the Maximum Score
// You are given two sorted arrays of distinct integers nums1 and nums2.
// A valid path is defined as follows:
  // Choose array nums1 or nums2 to traverse (from index-0).
  // Traverse the current array from left to right.
  // If you are reading any value that is present in nums1 and nums2 you are allowed to change your path to the other array. (Only one repeated value is considered in the valid path).
// The score is defined as the sum of uniques values in a valid path.
// Return the maximum score you can obtain of all possible valid paths. Since the answer may be too large, return it modulo 10^9 + 7.


// Solution: Two Pointers

// Use two pointers to keep track of the indexes we are up to in nums1 and nums2.
// Since both nums1 and nums2 are sorted, we can move up the smaller pointer until we get a match (nums1[i] === nums2[j]).
// Take the maximum sum of each segment between matching (nums1[i] === nums2[j]) numbers. This includes segments in the start and end.

// Time Complexity: O(n + m) 144ms
// Space Complexity: O(1) 50MB
var maxSum = function(nums1, nums2) {
  let n = nums1.length, m = nums2.length, mod = 10 ** 9 + 7;
  let sum1 = 0, sum2 = 0;
  let i = 0, j = 0;
  while (i < n || j < m) {
    if (i < n && (j === m || nums1[i] < nums2[j])) {
      sum1 += nums1[i++];
    } else if (j < m && (i === n || nums2[j] < nums1[i])) {
      sum2 += nums2[j++];
    } else {
      let maxSum = Math.max(sum1, sum2) + nums1[i];
      sum1 = maxSum, sum2 = maxSum;
      i++, j++;
    }
  }
  return Math.max(sum1, sum2) % mod;
};      

// Two test cases
console.log(maxSum([2,4,5,8,10], [4,6,8,9])) // 30
console.log(maxSum([1,3,5,7,9], [3,5,100])) // 109