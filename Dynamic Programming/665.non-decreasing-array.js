// 665. Non-decreasing Array
// Given an array nums with n integers, your task is to check if it could become non-decreasing by modifying at most one element.
// We define an array is non-decreasing if nums[i] <= nums[i + 1] holds for every i (0-based) such that (0 <= i <= n - 2).


// Solution: DP left & right

// At each dp[i], record whether the subarray [nums[0], ..., nums[i]] is non-decreasing.
// The idea is to use leftDP[i - 1] and rightDP[i + 1] on both sides to determine whether the subarrays on the left and right can be non-decreasing without nums[i].
// For the rightDP, we have to go from back to front.
// Additionally, we can save the results of the leftDP in one variable on the fly.

// If left is 1 AND right is 1 AND nums[i - 1] <= nums[i + 1], return true.
// left and right[i] is:
  // 1: Non-decreasing
  // 0: Not non-decreasing

// This solution could also be used if we are allowed to modify k numbers.
// We would check for right[i + k] instead of right[i + 1] and compare numbers k distance apart.
 
// Time Complexity: O(n) 122ms
// Space Complexity: O(n) 44.9MB
var checkPossibility = function(nums) {
  let n = nums.length, right = Array(n);
  // populate right dp
  right[n - 1] = 1;
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] <= nums[i + 1]) right[i] = right[i + 1];
    else right[i] = 0;
  }
  
  // calculate left dp on the fly
  let left = 1; 
  for (let i = 0; i < n; i++) {
    let prev = i === 0 ? -Infinity : nums[i - 1], next = i === n - 1 ? Infinity : nums[i + 1]; // defaults if we are on the edges
    let rightInc = i === n - 1 ? 1 : right[i + 1]; // default on the edge
    
    if (left && rightInc && prev <= next) return true;
    if (nums[i] < nums[i - 1]) left = 0; 
  }
  return false;
};

// Two test cases to run function on
console.log(checkPossibility([4,2,3])) // true
console.log(checkPossibility([4,2,1])) // false