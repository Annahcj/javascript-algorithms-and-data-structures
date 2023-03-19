// 2598. Smallest Missing Non-negative Integer After Operations
// You are given a 0-indexed integer array nums and an integer value.
// In one operation, you can add or subtract value from any element of nums.
  // For example, if nums = [1,2,3] and value = 2, you can choose to subtract value from nums[0] to make nums = [-1,2,3].
// The MEX (minimum excluded) of an array is the smallest missing non-negative integer in it.
  // For example, the MEX of [-1,2,3] is 0 while the MEX of [1,0,3] is 2.
// Return the maximum MEX of nums after applying the mentioned operation any number of times.


// Solution: Count Mod Values

// Numbers will be grouped by their mod value (nums[i] % value).
// Numbers in the same mod group can be transformed into any number with the same mod value.
// Use a hashmap to count the occurances of numbers for each mod value.

// Try to create each number from 0 to n - 1.
// If there are no more occurances of numbers for the current mod value, then it is impossible to have a higher MEX.

// Time Complexity: O(n) 190ms
// Space Complexity: O(n) 67.1MB
var findSmallestInteger = function(nums, value) {
  let modCount = new Map();
  for (let num of nums) {
    let mod = ((num % value) + value) % value;
    modCount.set(mod, (modCount.get(mod) || 0) + 1);
  }
  for (let i = 0; i < nums.length; i++) {
    let modValue = i % value;
    if (modCount.has(modValue) && modCount.get(modValue) > 0) {
      modCount.set(modValue, modCount.get(modValue) - 1);
    } else {
      return i;
    }
  }
  return nums.length;
};

// Two test cases
console.log(findSmallestInteger([1,-10,7,13,6,8], 5)) // 4
console.log(findSmallestInteger([1,-10,7,13,6,8], 7)) // 2