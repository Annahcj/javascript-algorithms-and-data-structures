// 910. Smallest Range II
// You are given an integer array nums and an integer k.
// For each index i where 0 <= i < nums.length, change nums[i] to be either nums[i] + k or nums[i] - k.
// The score of nums is the difference between the maximum and minimum elements in nums.
// Return the minimum score of nums after changing the values at each index.


// Solution: Sorting & Greedy

// Sort nums in asc order.
// Try to take each index i as the mid point:
  // Anything left of index i will be +k
  // Anything at index i or right will be -k

// At each index i, the minimum and maximum will be:
  // minimum: min(nums[0] + k, nums[i + 1] - k)
    // proof: We only need to check nums[i + 1] because we know anything on the right of nums[i + 1] will not be smaller since nums is sorted.
  // maximum: max(nums[i] + k, nums[n - 1] - k)
    // proof: We only need to check nums[i] because we know anything on the left of nums[i] will not be bigger.

// Record the minimum difference out of the maximum and minimum numbers for each index i.

// Time Complexity: O(n log(n)) 154ms
// Space Complexity: O(log(n)) (space for sorting) 44.7MB
var smallestRangeII = function(nums, k) {
  nums.sort((a, b) => a - b);
  let n = nums.length, minDiff = nums[n - 1] - nums[0];
  for (let i = 0; i < n - 1; i++) {
    let min = Math.min(nums[0] + k, nums[i + 1] - k);
    let max = Math.max(nums[i] + k, nums[n - 1] - k);
    minDiff = Math.min(minDiff, max - min);
  }
  return minDiff;
};

// Three test cases
console.log(smallestRangeII([1], 0)) // 0
console.log(smallestRangeII([0,10], 2)) // 6
console.log(smallestRangeII([1,3,6], 3)) // 3