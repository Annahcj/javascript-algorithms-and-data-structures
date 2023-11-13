// 2934. Minimum Operations to Maximize Last Elements in Arrays
// You are given two 0-indexed integer arrays, nums1 and nums2, both having length n.
// You are allowed to perform a series of operations (possibly none).
// In an operation, you select an index i in the range [0, n - 1] and swap the values of nums1[i] and nums2[i].
// Your task is to find the minimum number of operations required to satisfy the following conditions:
  // nums1[n - 1] is equal to the maximum value among all elements of nums1, i.e., nums1[n - 1] = max(nums1[0], nums1[1], ..., nums1[n - 1]).
  // nums2[n - 1] is equal to the maximum value among all elements of nums2, i.e., nums2[n - 1] = max(nums2[0], nums2[1], ..., nums2[n - 1]).
// Return an integer denoting the minimum number of operations needed to meet both conditions, or -1 if it is impossible to satisfy both conditions.


// Solution: DP

// Keep track of the minimum swap operations such that nums1[i] and nums2[i] <= the two possible ending configurations:
  // 1. (nums1[n - 1], nums2[n - 1])
  // 2. (nums2[n - 1], nums1[n - 1])

// If nums1[i] and nums2[i] are already smaller than or equal to their ends, then we don't need any operations.
// Otherwise, if swapping nums1[i] and nums2[i] will make them both smaller than or equal to their ends, we must swap them with one operation. 
// Otherwise, it's impossible for that ending.

// Time Complexity: O(n) 59ms
// Space Complexity: O(1) 45.1MB
var minOperations = function(nums1, nums2) {
  let n = nums1.length, end1 = 0, end2 = 1;
  for (let i = 0; i < n - 1; i++) {
    let end1AlreadyValid = nums1[i] <= nums1[n - 1] && nums2[i] <= nums2[n - 1];
    if (!end1AlreadyValid) {
      if (nums2[i] <= nums1[n - 1] && nums1[i] <= nums2[n - 1]) end1++; // swpa is possible
      else end1 = Infinity;
    }
    let end2AlreadyValid = nums1[i] <= nums2[n - 1] && nums2[i] <= nums1[n - 1];
    if (!end2AlreadyValid) {
      if (nums1[i] <= nums1[n - 1] && nums2[i] <= nums2[n - 1]) end2++; // swap is possible
      else end2 = Infinity;
    }
  }
  let res = Math.min(end1, end2);
  return res === Infinity ? -1 : res;
};

// Three test cases
console.log(minOperations([1,2,7], [4,5,3])) // 1
console.log(minOperations([2,3,4,5,9], [8,8,4,4,4])) // 2
console.log(minOperations([1,5,4], [2,5,3])) // -1