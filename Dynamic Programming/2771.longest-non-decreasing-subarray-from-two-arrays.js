// 2771. Longest Non-decreasing Subarray From Two Arrays
// You are given two 0-indexed integer arrays nums1 and nums2 of length n.
// Let's define another 0-indexed integer array, nums3, of length n. For each index i in the range [0, n - 1], you can assign either nums1[i] or nums2[i] to nums3[i].
// Your task is to maximize the length of the longest non-decreasing subarray in nums3 by choosing its values optimally.
// Return an integer representing the length of the longest non-decreasing subarray in nums3.
// Note: A subarray is a contiguous non-empty sequence of elements within an array.


// Solution: DP 

// Keep track of the maximum length of a non-decreasing subarray ending at each nums1[i] and nums2[i].
  // len1 = max length of subarray ending at nums1[i]
  // len2 = max length of subarray ending at nums2[i]

// For each index i, update len1 and len2:
  // The longest subarray ending at nums1[i] = the maximum out of:
    // 1. If nums1[i] >= nums1[i - 1], then the max length ending at nums1[i - 1] + 1.
    // 2. If nums1[i] >= nums2[i - 1], then the max length ending at nums2[i - 1] + 1.
  // The longest subarray ending at nums2[i] = the maximum out of:
    // 1. If nums2[i] >= nums1[i - 1], then the max length ending at nums1[i - 1] + 1.
    // 2. If nums2[i] >= nums2[i - 1], then the max length ending at nums2[i - 1] + 1.

// Record the maximum state of len1 and len2.

// Time Complexity: O(n) 130ms
// Space Complexity: O(1) 56.8MB
var maxNonDecreasingLength = function(nums1, nums2) {
  let n = nums1.length, len1 = 1, len2 = 1, ans = 1;
  for (let i = 1; i < n; i++) {
    let newLen1 = Math.max(nums1[i] >= nums1[i - 1] ? len1 + 1 : 1, nums1[i] >= nums2[i - 1] ? len2 + 1 : 1);
    let newLen2 = Math.max(nums2[i] >= nums1[i - 1] ? len1 + 1 : 1, nums2[i] >= nums2[i - 1] ? len2 + 1 : 1);
    len1 = newLen1, len2 = newLen2;
    ans = Math.max(ans, len1, len2);
  }
  return ans;
};

// Three test cases
console.log(maxNonDecreasingLength([2,3,1], [1,2,1])) // 2
console.log(maxNonDecreasingLength([1,3,2,1], [2,2,3,4])) // 4
console.log(maxNonDecreasingLength([1,1], [2,2])) // 2