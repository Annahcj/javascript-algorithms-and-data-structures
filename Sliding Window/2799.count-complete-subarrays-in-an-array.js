// 2799. Count Complete Subarrays in an Array
// You are given an array nums consisting of positive integers.
// We call a subarray of an array complete if the following condition is satisfied:
  // The number of distinct elements in the subarray is equal to the number of distinct elements in the whole array.
// Return the number of complete subarrays.
// A subarray is a contiguous non-empty part of an array.


// Solution: Sliding Window 

// Think in reverse: maintain a maximum length sliding window of non-complete subarrays.
// Move up the left pointer while the window is a complete subarray.
// We can calculate the number of non-complete subarrays ending at each index j within the window: j - i + 1
// Return the total number of subarrays - the number of non-complete subarrays.

// Time Complexity: O(n) 69ms
// Space Complexity: O(n) 48.6MB
var countCompleteSubarrays = function(nums) {
  let n = nums.length, distinct = new Set();
  for (let i = 0; i < n; i++) {
    distinct.add(nums[i]);
  }
  let count = {}, distinctCount = 0, nonComplete = 0;
  for (let j = 0, i = 0; j < n; j++) {
    count[nums[j]] = (count[nums[j]] || 0) + 1;
    if (count[nums[j]] === 1) distinctCount++;
    while (distinctCount === distinct.size) {
      if (--count[nums[i++]] === 0) distinctCount--;
    }
    nonComplete += j - i + 1;
  }
  let totalSubarrays = n * (n + 1) / 2;
  return totalSubarrays - nonComplete;
};

// Two test cases
console.log(countCompleteSubarrays([1,3,1,2,2])) // 4
console.log(countCompleteSubarrays([5,5,5,5])) // 10