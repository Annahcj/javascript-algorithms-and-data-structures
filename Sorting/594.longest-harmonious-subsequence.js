// 594. Longest Harmonious Subsequence
// We define a harmonious array as an array where the difference between its maximum value and its minimum value is exactly 1.
// Given an integer array nums, return the length of its longest harmonious subsequence among all its possible subsequences.


// Solution: Sorting & Sliding Window

// Sort nums, then maintain a sliding window where difference between first and last item is no greater than 1.
// Record the maximum length of the sliding window.

// Time Complexity: O(n log(n)) 45ms
// Space Complexity: O(log(n)) 60MB
function findLHS(nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let lhs = 0;
  for (let j = 0, i = 0; j < n; j++) {
    while (nums[j] - nums[i] > 1) i++;
    if (nums[j] - nums[i] > 0) {
      lhs = Math.max(lhs, j - i + 1);
    }
  }
  return lhs;
};

// Three test cases
console.log(findLHS([1,3,2,2,5,2,3,7])) // 5
console.log(findLHS([1,2,3,4])) // 2
console.log(findLHS([1,1,1,1])) // 0