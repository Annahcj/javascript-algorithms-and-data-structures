// 2540. Minimum Common Value
// Given two integer arrays nums1 and nums2, sorted in non-decreasing order, return the minimum integer common to both arrays. If there is no common integer amongst nums1 and nums2, return -1.
// Note that an integer is said to be common to nums1 and nums2 if both arrays have at least one occurrence of that integer.


// Solution: Two Pointers

// We can make use of the sorted properties of nums1 and nums2.
// Use two pointers in nums1 and nums2 and move the pointers up while elements in one array are smaller than the other.
// When both pointers point to equal numbers, we can return that number.

// n = length of nums1, m = length of nums2
// Time Complexity: O(n + m) 79ms
// Space Complexity: O(1) 49.7MB
var getCommon = function(nums1, nums2) {
  let i = 0, j = 0;
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) i++;
    else if (nums1[i] > nums2[j]) j++;
    else return nums1[i]; 
  }
  return -1;
};

// Two test cases
console.log(getCommon([1,2,3], [2,4])) // 2
console.log(getCommon([1,2,3,6], [2,3,4,5])) // 2