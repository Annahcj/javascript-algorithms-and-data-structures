// 2919. Minimum Increment Operations to Make Array Beautiful
// You are given a 0-indexed integer array nums having length n, and an integer k.
// You can perform the following increment operation any number of times (including zero):
  // Choose an index i in the range [0, n - 1], and increase nums[i] by 1.
// An array is considered beautiful if, for any subarray with a size of 3 or more, its maximum element is greater than or equal to k.
// Return an integer denoting the minimum number of increment operations needed to make nums beautiful.
// A subarray is a contiguous non-empty sequence of elements within an array.


// Solution: DP

// Keep track of the minimum number of operations turning one of the three previous numbers into k:
  // outOfWindow: nums[i - 3]
  // prevPrev: nums[i - 2]
  // prev: nums[i - 1]

// For each nums[i], we calculate the operations to turn nums[i] into k, then take the minimum previous result: Math.min(outOfWindow, prevPrev, prev).
// It's possible that outOfWindow, prevPrev, and prev is incorrect since the current number could already be >= k. In this case it doesn't affect the end result because it's always optimal to have the k-number as far right as possible to be reused for more subarrays.

// Time Complexity: O(n) 76ms
// Space Complexity: O(1) 53.1MB
var minIncrementOperations = function(nums, k) {
  let outOfWindow = Math.max(0, k - nums[0]);
  let prevPrev = Math.max(0, k - nums[1]);
  let prev = Math.max(0, k - nums[2]);
  let n = nums.length;
  for (let i = 3; i < n; i++) {
    let curr = Math.max(0, k - nums[i]) + Math.min(outOfWindow, prevPrev, prev);
    outOfWindow = prevPrev;
    prevPrev = prev;
    prev = curr;
  }
  return Math.min(outOfWindow, prevPrev, prev);
};

// Three test cases
console.log(minIncrementOperations([2,3,0,0,2], 4)) // 3
console.log(minIncrementOperations([0,1,3,3], 5)) // 2
console.log(minIncrementOperations([1,1,2], 1)) // 0