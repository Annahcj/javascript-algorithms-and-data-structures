// 2444. Count Subarrays With Fixed Bounds
// You are given an integer array nums and two integers minK and maxK.
// A fixed-bound subarray of nums is a subarray that satisfies the following conditions:
  // The minimum value in the subarray is equal to minK.
  // The maximum value in the subarray is equal to maxK.
// Return the number of fixed-bound subarrays.
// A subarray is a contiguous part of an array.


// Solution: Sliding Window & Logic

// Process each group consisting of numbers within (minK, ..., maxK).
// For each index j, count the number of valid subarrays ending at index j.
  // Keep track of the start of the current group (index i).
  // Keep track of the maximum index of an occurance of minK and the maximum index of an occurance of maxK.
  // The number of valid subarrays ending at index j is (min(maxKIndex, minKIndex) - i + 1). This is because we need both minK and maxK present in the subarrays.

// Time Complexity: O(n) 146ms
// Space Complexity: O(1) 50.1MB
var countSubarrays = function(nums, minK, maxK) {
  let n = nums.length, ans = 0;
  let maxMinIndex = -1, maxMaxIndex = -1;
  for (let j = 0, i = 0; j < n; j++) {
    if (nums[j] === minK) maxMinIndex = j;
    if (nums[j] === maxK) maxMaxIndex = j;
    if (nums[j] < minK || nums[j] > maxK) {
      i = j + 1;
      maxMinIndex = -1, maxMaxIndex = -1;
    } else {
      if (maxMinIndex === -1 || maxMaxIndex === -1) continue; // we need both minK and maxK present in the subarrays
      ans += Math.min(maxMinIndex, maxMaxIndex) - i + 1;
    }
  }
  return ans;
};

// Three test cases
console.log(countSubarrays([1,2,2,1], 1, 2)) // 5
console.log(countSubarrays([1,3,5,2,7,5], 1, 5)) // 2
console.log(countSubarrays([1,1,1,1], 1, 1)) // 10