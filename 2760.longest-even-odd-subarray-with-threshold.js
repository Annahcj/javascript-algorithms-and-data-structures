// 2760. Longest Even Odd Subarray With Threshold
// You are given a 0-indexed integer array nums and an integer threshold.
// Find the length of the longest subarray of nums starting at index l and ending at index r (0 <= l <= r < nums.length) that satisfies the following conditions:
  // nums[l] % 2 == 0
  // For all indices i in the range [l, r - 1], nums[i] % 2 != nums[i + 1] % 2
  // For all indices i in the range [l, r], nums[i] <= threshold
// Return an integer denoting the length of the longest such subarray.
// Note: A subarray is a contiguous non-empty sequence of elements within an array.

 
// Solution: Two Pointers

// For each nums[r] % 2 === 0 and nums[r] <= threshold, extend the subarray until the conditions are no longer met.
// Record the length of the longest subarray.

// Time Complexity: O(n) 169ms
// Space Complexity: O(1) 50.1MB
var longestAlternatingSubarray = function(nums, threshold) {
  let n = nums.length, r = 0, ans = 0;
  while (r < n) {
    if (nums[r] % 2 === 0 && nums[r] <= threshold) {
      let l = r;
      while (r < n - 1 && nums[r + 1] % 2 !== nums[r] % 2 && nums[r + 1] <= threshold) r++;
      ans = Math.max(ans, r - l + 1);
    }
    r++;
  }
  return ans;
};

// Three test cases
console.log(longestAlternatingSubarray([3,2,5,4], 5)) // 3
console.log(longestAlternatingSubarray([1,2], 2)) // 1
console.log(longestAlternatingSubarray([2,3,4,5], 4)) // 3