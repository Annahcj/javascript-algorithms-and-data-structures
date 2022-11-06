// 2461. Maximum Sum of Distinct Subarrays With Length K
// You are given an integer array nums and an integer k. Find the maximum subarray sum of all the subarrays of nums that meet the following conditions:
  // The length of the subarray is k, and
  // All the elements of the subarray are distinct.
// Return the maximum subarray sum of all the subarrays that meet the conditions. If no subarray meets the conditions, return 0.
// A subarray is a contiguous non-empty sequence of elements within an array.


// Solution: Sliding Window w/ Two Pointers & Set

// Maintain a sliding window of unique numbers with maximum size of k.
// We can store the unique numbers in the window in a hashset.
// When we move the right pointer up,
  // Move the left pointer up until 
    // all numbers are unique AND 
    // the window size is less than or equal to k

// Time Complexity: O(n) 246ms
// Space Complexity: O(k) 71.5MB
var maximumSubarraySum = function(nums, k) {
  let set = new Set(), sum = 0;
  let ans = 0, n = nums.length;
  for (let j = 0, i = 0; j < n; j++) {
    sum += nums[j];
    while (set.has(nums[j]) || j - i >= k) {
      sum -= nums[i];
      set.delete(nums[i]);
      i++;
    }
    set.add(nums[j]);
    if (j - i + 1 === k) ans = Math.max(ans, sum);
  }
  return ans;
};

// Two test cases
console.log(maximumSubarraySum([1,5,4,2,9,9,9], 3)) // 15
console.log(maximumSubarraySum([4,4,4], 3)) // 0