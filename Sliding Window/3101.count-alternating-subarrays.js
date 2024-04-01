// 3101. Count Alternating Subarrays
// You are given a binary array nums.
// We call a subarray alternating if no two adjacent elements in the subarray have the same value.
// Return the number of alternating subarrays in nums.


// Solution: Sliding Window w/ Counting

// Maintain a sliding window of alternating numbers.
// When we find two equal adjacent numbers, reset the length of the window.
// Count the number of subarrays ending at each index i.
// Since the sliding window only contains alternating numbers, all subarrays in that window are also alternating.

// Time Complexity: O(n) 83ms
// Space Complexity: O(1) 58.4MB
var countAlternatingSubarrays = function(nums) {
  let n = nums.length, count = 0, subarrays = 0;
  for (let i = 0; i < n; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) count = 1;
    else count++;
    subarrays += count;
  }
  return subarrays;
};

// Two test cases
console.log(countAlternatingSubarrays([0,1,1,1])) // 5
console.log(countAlternatingSubarrays([1,0,1,0])) // 10