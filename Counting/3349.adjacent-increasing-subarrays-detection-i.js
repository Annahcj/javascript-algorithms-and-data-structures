// 3349. Adjacent Increasing Subarrays Detection I
// Given an array nums of n integers and an integer k, determine whether there exist two adjacent subarrays of length k such that both subarrays are strictly increasing. Specifically, check if there are two subarrays starting at indices a and b (a < b), where:
  // Both subarrays nums[a..a + k - 1] and nums[b..b + k - 1] are strictly increasing.
  // The subarrays must be adjacent, meaning b = a + k.
// Return true if it is possible to find two such subarrays, and false otherwise.


// Solution: Counting

// Record the longest monotonically increasing subarrays.
// Keep track of the length of the previous increasing subarray, and the current one.
// If either of the following two conditions are met, return true:
  // 1. If the current length >= k and the previous length >= k, return true.
  // 2. If the current length >= k * 2 (can split the current increasing sequence into two).

// Time Complexity: O(n) 57ms
// Space Complexity: O(1) 56MB
function hasIncreasingSubarrays(nums, k) {
  const n = nums.length;
  let prevCount = 0, currCount = 1;
  for (let i = 1; i < n; i++) {
    if (nums[i - 1] >= nums[i] || k === 1) {
      prevCount = currCount;
      currCount = 1;
    } else {
      currCount++;
    }
    if ((currCount >= k && prevCount >= k) || currCount >= k * 2) {
      return true;
    }
  }  
  return false;
};

// Two test cases
console.log(hasIncreasingSubarrays([2,5,7,8,9,2,3,4,3,1], 3)) // true
console.log(hasIncreasingSubarrays([1,2,3,4,4,4,4,5,6,7], 5)) // false