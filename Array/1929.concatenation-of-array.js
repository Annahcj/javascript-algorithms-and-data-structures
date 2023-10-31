// 1929. Concatenation of Array
// Given an integer array nums of length n, you want to create an array ans of length 2n where ans[i] == nums[i] and ans[i + n] == nums[i] for 0 <= i < n (0-indexed).
// Specifically, ans is the concatenation of two nums arrays.
// Return the array ans.


// Solution 1: Modulo

// Create a new array to avoid modifying the input.

// Time Complexity: O(2n) = O(n) 137ms
// Space Complexity: O(1) (not including output) 45.4MB
var getConcatenation = function(nums) {
  let n = nums.length, res = Array(n * 2);
  for (let i = 0; i < n * 2; i++) {
    res[i] = nums[i % n];
  }
  return res;
};

// Solution 2: Modify Input

// Time Complexity: O(n) 88ms
// Space Complexity: O(1) 45.1MB
var getConcatenation = function(nums) {
  let n = nums.length;
  for (let i = 0; i < n; i++) nums.push(nums[i]);
  return nums;
};