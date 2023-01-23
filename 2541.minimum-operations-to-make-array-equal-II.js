// 2541. Minimum Operations to Make Array Equal II
// You are given two integer arrays nums1 and nums2 of equal length n and an integer k. You can perform the following operation on nums1:
  // Choose two indexes i and j and increment nums1[i] by k and decrement nums1[j] by k. In other words, nums1[i] = nums1[i] + k and nums1[j] = nums1[j] - k.
// nums1 is said to be equal to nums2 if for all indices i such that 0 <= i < n, nums1[i] == nums2[i].
// Return the minimum number of operations required to make nums1 equal to nums2. If it is impossible to make them equal, return -1.


// Solution: Logic

// Count the difference of each nums1[i] - nums2[i].
// If the difference is not divisible by k, it is impossible to make it equal to nums2[i], so we return -1.
// Otherwise, count the difference and divide the difference by k to get the number of operations.
  // If nums1[i] < nums2[i], add to the less count.
  // If nums1[i] > nums2[i], add to the more count.

// If less count is not equal to the more count, then it is impossible. When we perform an operation, the other number is going to change in the other direction, so the counts must be balanced.
// Note: Be careful with % 0, it returns NaN.

// Time Complexity: O(n) 96ms
// Space Complexity: O(1) 52.9MB
var minOperations = function(nums1, nums2, k) {
  let less = 0, more = 0, n = nums1.length;
  for (let i = 0; i < n; i++) {
    let diff = Math.abs(nums1[i] - nums2[i]);
    if (k === 0 && diff !== 0) return -1;
    if (k === 0) continue;
    if (diff % k !== 0) return -1;
    if (nums1[i] < nums2[i]) {
      less += diff / k;
    } else {
      more += diff / k;
    }
  }
  return less === more ? less : -1;
};

// Two test cases
console.log(minOperations([4,3,1,4], [1,3,7,1], 3)) // 2
console.log(minOperations([3,8,5,2], [2,4,1,6], 1)) // -1