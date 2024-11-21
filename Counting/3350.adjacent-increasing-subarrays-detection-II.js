// 3350. Adjacent Increasing Subarrays Detection II
// Given an array nums of n integers, your task is to find the maximum value of k for which there exist two adjacent subarrays of length k each, such that both subarrays are strictly increasing. Specifically, check if there are two subarrays of length k starting at indices a and b (a < b), where:
  // Both subarrays nums[a..a + k - 1] and nums[b..b + k - 1] are strictly increasing.
  // The subarrays must be adjacent, meaning b = a + k.
// Return the maximum possible value of k.
// A subarray is a contiguous non-empty sequence of elements within an array.


// Solution: Counting

// Keep track of the previous longest increasing subarray, and the current count.
// Find the maximum of Math.min(prevCount, currCount).
// There is also the case where the entire sequence is increasing, so we need to account for the case of splitting it into two: Math.floor(currCount / 2).

// Time Complexity: O(n) 122ms
// Space Complexity: O(1) 72.2MB
function maxIncreasingSubarrays(nums) {
  let n = nums.length, prevCount = 0;
  let currCount = 0, k = 0;
  for (let i = 0; i < n; i++) {
    if (i > 0 && nums[i] > nums[i - 1]) {
      currCount++;
    } else {
      prevCount = currCount;
      currCount = 1;
    }
    k = Math.max(k, Math.min(currCount, prevCount), Math.floor(currCount / 2));
  }
  return k;
};

// Two test cases
console.log(maxIncreasingSubarrays([2,5,7,8,9,2,3,4,3,1])) // 3
console.log(maxIncreasingSubarrays([1,2,3,4,4,4,4,5,6,7])) // 2