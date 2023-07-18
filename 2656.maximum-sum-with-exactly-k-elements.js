// 2656. Maximum Sum With Exactly K Elements
// You are given a 0-indexed integer array nums and an integer k. Your task is to perform the following operation exactly k times in order to maximize your score:
// 1. Select an element m from nums.
// 2. Remove the selected element m from the array.
// 3. Add a new element with a value of m + 1 to the array.
// 4. Increase your score by m.
// Return the maximum score you can achieve after performing the operation exactly k times.


// Solution: Logic

// It's optimal to get the maximum element and increase it k times.
// Formula = max * k + ((k-1) + (k-2) + (k-3)...) 

// Time Complexity: O(n) 119ms
// Space Complexity: O(1) 46.7MB
var maximizeSum = function(nums, k) {
  let max = Math.max(...nums);
  return max * k + (k * (k - 1) / 2);
};