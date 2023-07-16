// 2779. Maximum Beauty of an Array After Applying Operation
// You are given a 0-indexed array nums and a non-negative integer k.
// In one operation, you can do the following:
  // Choose an index i that hasn't been chosen before from the range [0, nums.length - 1].
  // Replace nums[i] with any integer from the range [nums[i] - k, nums[i] + k].
// The beauty of the array is the length of the longest subsequence consisting of equal elements.
// Return the maximum possible beauty of the array nums after applying the operation any number of times.
// Note that you can apply the operation to each index only once.
// A subsequence of an array is a new array generated from the original array by deleting some elements (possibly none) without changing the order of the remaining elements.


// Solution: Sliding Window & Sorting

// Sort nums in asc order.
// Maintain a sliding window with maximum difference of k * 2.
// Record the longest length of the sliding window.

// Time Complexity: O(n log(n)) 277ms
// Space Complexity: O(log(n)) (space for sorting) 56.1MB
var maximumBeauty = function(nums, k) {
  nums.sort((a, b) => a - b);
  let ans = 0, n = nums.length;
  for (let j = 0, i = 0; j < n; j++) {
    while (nums[j] - nums[i] > k * 2) i++;
    ans = Math.max(ans, j - i + 1);
  }
  return ans;
};

// Two test cases
console.log(maximumBeauty([4,6,1,2], 2)) // 3
console.log(maximumBeauty([1,1,1,1], 10)) // 4