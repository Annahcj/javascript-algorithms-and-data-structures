// 2962. Count Subarrays Where Max Element Appears at Least K Times
// You are given an integer array nums and a positive integer k.
// Return the number of subarrays where the maximum element of nums appears at least k times in that subarray.
// A subarray is a contiguous sequence of elements within an array.


// Solution: Sliding Window

// Maintain a sliding window with k occurances of the max element.
// Two pointers (i, j) will indicate the current sliding window.
// For each iteration of j, count the number of subarrays ending at index j.

// Time Complexity: O(n) 101ms
// Space Complexity: O(1) 53.9MB
var countSubarrays = function(nums, k) {
  let n = nums.length, max = Math.max(...nums);
  let maxCount = 0, subarrays = 0;
  for (let j = 0, i = 0; j < n; j++) {
    maxCount += nums[j] === max ? 1 : 0;
    while (maxCount >= k) {
      maxCount -= nums[i] === max ? 1 : 0;
      i++;
    }
    if (maxCount === k - 1 && nums[i - 1] === max) { 
      subarrays += i;
    }
  }
  return subarrays;
};

// Two test cases
console.log(countSubarrays([1,3,2,3,3], 2)) // 6
console.log(countSubarrays([1,4,2,1], 3)) // 0