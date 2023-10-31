// 2740. Find the Value of the Partition
// You are given a positive integer array nums.
// Partition nums into two arrays, nums1 and nums2, such that:
  // Each element of the array nums belongs to either the array nums1 or the array nums2.
  // Both arrays are non-empty.
  // The value of the partition is minimized.
// The value of the partition is |max(nums1) - min(nums2)|.
// Here, max(nums1) denotes the maximum element of the array nums1, and min(nums2) denotes the minimum element of the array nums2.
// Return the integer denoting the value of such partition.


// Solution: Greedy w/ Sorting 

// Sort nums in asc order, then get the minimum difference between adjacent numbers.

// Time Complexity: O(n log(n)) 185ms
// Space Complexity: O(log(n)) (space for sorting) 54.5MB
var findValueOfPartition = function(nums) {
  let n = nums.length, ans = Infinity;
  nums.sort((a, b) => a - b);
  for (let i = 1; i < n; i++) {
    ans = Math.min(ans, nums[i] - nums[i - 1]);
  }
  return ans;
};

// Two test cases
console.log(findValueOfPartition([1,3,2,4])) // 1
console.log(findValueOfPartition([100,1,10])) // 9