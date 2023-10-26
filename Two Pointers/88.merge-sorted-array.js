//88. Merge Sorted Array
// You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
//Merge nums1 and nums2 into a single array sorted in non-decreasing order.


// Solution 1: Two Pointers 

// Since we need to modify nums1 in place, we would keep an index pointer for the position we would replace.
// If we loop from the start, we may potentially end up modifying elements that we haven't even reached yet, so we need to loop from back to front.
// So, we would set two pointers at positions m - 1 and n - 1.
// We take the bigger item of the two, put it in nums1[index], then decrement the pointer and index until we reach the end of the two arrays.

// Time Complexity: O(m + n) 72ms
// Space Complexity: O(1) 39MB
var merge = function(nums1, m, nums2, n) {
    let idx = nums1.length - 1;
    let i = m - 1, j = n - 1;
    while (i >= 0 && j >= 0) {
      if (nums1[i] > nums2[j]) {
        nums1[idx] = nums1[i];
        i--, idx--;
      } else {
        nums1[idx] = nums2[j];
        j--, idx--;
      }
    } 
    while (i >= 0) {
      nums1[idx] = nums1[i];
      i--, idx--;
    }
    while (j >= 0) {
      nums1[idx] = nums2[j];
      j--, idx--;
    }
};