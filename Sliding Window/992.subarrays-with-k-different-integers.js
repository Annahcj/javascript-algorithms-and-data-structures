// 992. Subarrays with K Different Integers
// Given an integer array nums and an integer k, return the number of good subarrays of nums.
// A good array is an array where the number of different integers in that array is exactly k.
// For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3.
// A subarray is a contiguous part of an array.


// Solution 1: Sliding Window w/ Hashmap

// Create a function 'subarrays', which counts the number of subarrays of any length with At MOST k distinct numbers
// Return subarrays(k) - subarrays(k - 1) (this way, it returns the number of subarrays that contain exactly k distinct numbers)

// Time Complexity: O(n) 112ms
// Space Complexity: O(n) 47.2MB
var subarraysWithKDistinct = function(nums, k) {
  return subarrays(k) - subarrays(k - 1);

  function subarrays(k) {
    let count = {};
    let left = 0, ans = 0;
    for (let right = 0; right < nums.length; right++) {
      if (!count[nums[right]]) k--;
      count[nums[right]] = (count[nums[right]] || 0) + 1;
      while (k < 0) {
        count[nums[left]]--;
        if (count[nums[left]] === 0) k++;
        left++;
      }
      ans += right - left + 1;
    }
    return ans;
  }  
};


// Solution 2: Sliding Window - One Pass

// Maintain a sliding window (of minimum length) with exactly k distinct integers.
// Two pointers to mark the start and end of the window.
// The right pointer moves up incrementally.
// When the window has k integers, move the left pointer up until the window no longer has k distinct integers. This is needed to count the number of subarrays starting at different indices but still contain k distinct integers.
// Count the number of subarrays ending at each index j.

// Time Complexity: O(n) 55ms
// Space Complexity: O(n) 55.7MB
var subarraysWithKDistinct = function(nums, k) {
  let n = nums.length, count = {}, distinct = 0;
  let leftSubarrays = 1, goodSubarrays = 0;
  for (let j = 0, i = 0; j < n; j++) {
    count[nums[j]] = (count[nums[j]] || 0) + 1;
    if (count[nums[j]] === 1) distinct++;
    if (distinct > k) {
      while (distinct > k) {
        count[nums[i]]--;
        if (count[nums[i]] === 0) distinct--;
        i++;
      }
      leftSubarrays = 1; // reset, this count is obsolete because the window has > k distinct integers
    }
    while (distinct === k && count[nums[i]] !== 1) {
      count[nums[i]]--;
      i++;
      leftSubarrays++;
    }
    if (distinct === k) {
      goodSubarrays += leftSubarrays;
    }
  }
  return goodSubarrays;
};

// Two test cases
console.log(subarraysWithKDistinct([1,2,1,2,3], 2)) // 7
console.log(subarraysWithKDistinct([1,2,1,3,4], 3)) // 3