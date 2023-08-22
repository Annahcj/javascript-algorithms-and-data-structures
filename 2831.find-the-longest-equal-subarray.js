// 2831. Find the Longest Equal Subarray
// You are given a 0-indexed integer array nums and an integer k.
// A subarray is called equal if all of its elements are equal. Note that the empty subarray is an equal subarray.
// Return the length of the longest possible equal subarray after deleting at most k elements from nums.
// A subarray is a contiguous, possibly empty sequence of elements within an array.


// Solution: Group Indices & Sliding Window

// Group indices for each equal nums[i]: {num: [index, index, ...], num: [index, index, ...], ...}
// Go through each group of indices of the equal numbers,
  // Count of non-equal numbers = current index - previous index - 1
  // Maintain a sliding window where the sum of non-equal numbers doesn't exceed k
  // Record the maximum length of the sliding window

// Time Complexity: O(n) 234ms
// Space Complexity: O(n) 98MB
var longestEqualSubarray = function(nums, k) {
  let n = nums.length, indicesMap = {};
  for (let i = 0; i < n; i++) {
    if (!indicesMap[nums[i]]) indicesMap[nums[i]] = [];
    indicesMap[nums[i]].push(i);
  }
  let maxLen = 1; // an array of length 1 is always an equal subarray, and nums.length >= 1
  for (let num in indicesMap) {
    let indices = indicesMap[num], unequalCount = 0;
    for (let j = 1, i = 0; j < indices.length; j++) {
      unequalCount += indices[j] - indices[j - 1] - 1;
      while (unequalCount > k) {
        unequalCount -= indices[i + 1] - indices[i] - 1;
        i++;
      }
      maxLen = Math.max(maxLen, j - i + 1);
    }
  }
  return maxLen;
};

// Two test cases
console.log(longestEqualSubarray([1,3,2,3,1,3], 3)) // 3
console.log(longestEqualSubarray([1,1,2,2,1,1], 2)) // 4