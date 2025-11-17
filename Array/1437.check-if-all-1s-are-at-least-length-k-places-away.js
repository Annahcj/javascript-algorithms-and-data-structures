// 1437. Check If All 1's Are at Least Length K Places Away
// Given an binary array nums and an integer k, return true if all 1's are at least k places away from each other, otherwise return false.


// Solution: 

// Only the adjacent 1's matter (among the 1's).
// Keep track of the position of the last 1.
// Check if the current 1 is less than k places away from the last 1.

// Time Complexity: O(n) 0ms
// Space Complexity: O(1) 61MB
function kLengthApart(nums, k) {
  const n = nums.length;
  let lastOne = -Infinity;
  for (let i = 0; i < n; i++) {
    if (nums[i] === 1) {
      if (i - lastOne <= k) {
        return false;
      }
      lastOne = i;
    }
  }
  return true;
};