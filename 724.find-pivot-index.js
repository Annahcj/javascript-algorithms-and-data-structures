// 724. Find Pivot Index
// Given an array of integers nums, calculate the pivot index of this array.
// The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.
// If the index is on the left edge of the array, then the left sum is 0 because there are no elements to the left. This also applies to the right edge of the array.
// Return the leftmost pivot index. If no such index exists, return -1.


// Solution 1: Prefix Sum

// 1. Calculate the prefix sum from the left and right.
  // left[i] = sum of all numbers strictly on the left of i
  // right[i] = sum of all numbers strictly on the right of i
// 2. Loop through and find the first index where left[i] is equal to right[i].

// Time Complexity: O(n) 149ms
// Space Complexity: O(n) 41.7MB
var pivotIndex = function(nums) {
  let n = nums.length;
  let left = Array(n), right = Array(n);
  left[0] = 0, right[n - 1] = 0;
  for (var i = 1; i < n; i++) {
    left[i] = left[i - 1] + nums[i - 1];
  }
  for (i = n - 2; i >= 0; i--) {
    right[i] = right[i + 1] + nums[i + 1];
  }
  for (i = 0; i < n; i++) {
    if (left[i] === right[i]) return i;
  }
  return -1;
};

// Solution 2: Optimized Space

// 1. Calculate total sum
// 2. Keep a running sum of nums as 'leftSum'.
  // If sum - leftSum - nums[i] is equal to leftSum, return the index.

// Time Complexity: O(n) 155ms
// Space Complexity: O(1) 40.9MB
var pivotIndex = function(nums) {
  let sum = 0, leftSum = 0;
  for (var num of nums) sum += num;
  for (var i = 0; i < nums.length; i++) {
    if (sum - leftSum - nums[i] === leftSum) return i;
    leftSum += nums[i];
  }
  return -1;
};

// Three test cases to run function on
console.log(pivotIndex([1,7,3,6,5,6])) // 3
console.log(pivotIndex([1,2,3])) // -1
console.log(pivotIndex([2,1,-1])) // 0