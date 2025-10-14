// 3349. Adjacent Increasing Subarrays Detection I
// Given an array nums of n integers and an integer k, determine whether there exist two adjacent subarrays of length k such that both subarrays are strictly increasing. Specifically, check if there are two subarrays starting at indices a and b (a < b), where:
  // Both subarrays nums[a..a + k - 1] and nums[b..b + k - 1] are strictly increasing.
  // The subarrays must be adjacent, meaning b = a + k.
// Return true if it is possible to find two such subarrays, and false otherwise.


// Solution: DP

// Use an array to store whether each subarray of length k is strictly increasing.
// Keep track of the ongoing count of consecutively increasing numbers and reset the count if it's not increasing.
// For each large enough index, check whether the current subarray of length k and the previous subarray of length k are both increasing.

// Time Complexity: O(n) 748ms
// Space Complexity: O(n) 66.4MB
function hasIncreasingSubarrays(nums, k) {
  const n = nums.length, isIncreasing = Array(n).fill(true);
  let count = 1;
  for (let i = 1; i < n; i++) {
    if (nums[i - 1] >= nums[i]) {
      count = 1;
    } else {
      count++;
    }
    if (i >= k - 1) {
      isIncreasing[i - k + 1] = count >= k;
    }
    if (i >= k * 2 - 1 && isIncreasing[i - k + 1] && isIncreasing[i - k * 2 + 1]) {
      return true;
    }
  }  
  return false;
};

// Two test cases
console.log(hasIncreasingSubarrays([2,5,7,8,9,2,3,4,3,1], 3)) // true
console.log(hasIncreasingSubarrays([1,2,3,4,4,4,4,5,6,7], 5)) // false