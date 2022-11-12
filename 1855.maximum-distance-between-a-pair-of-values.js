// 1855. Maximum Distance Between a Pair of Values
// You are given two non-increasing 0-indexed integer arrays nums1​​​​​​ and nums2​​​​​​.
// A pair of indices (i, j), where 0 <= i < nums1.length and 0 <= j < nums2.length, is valid if both i <= j and nums1[i] <= nums2[j]. The distance of the pair is j - i​​​​.
// Return the maximum distance of any valid pair (i, j). If there are no valid pairs, return 0.
// An array arr is non-increasing if arr[i-1] >= arr[i] for every 1 <= i < arr.length.


// Solution: Two Pointers

// Maintain two pointers i and j for nums1 and nums2.
// Let j loop through nums2, and move up i while nums1[i] is bigger than nums2[j].
// Record the maximum (j - i).

// n = length of nums1, m = length of nums2
// Time Complexity: O(n + m) 120ms
// Space Complexity: O(1) 54.4MB
var maxDistance = function(nums1, nums2) {
  let maxDist = 0;
  for (let j = 0, i = 0; j < nums2.length; j++) {
    while (i < nums1.length && nums1[i] > nums2[j]) i++;
    if (i === nums1.length) break;
    maxDist = Math.max(maxDist, j - i);
  }
  return maxDist;
};

// Two test cases
console.log(maxDistance([55,30,5,4,2], [100,20,10,10,5])) // 2
console.log(maxDistance([2,2,2], [10,10,1])) // 1