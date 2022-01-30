// 2154. Keep Multiplying Found Values by Two
// You are given an array of integers nums. You are also given an integer original which is the first number that needs to be searched for in nums.
// You then do the following steps:
  // 1. If original is found in nums, multiply it by two (i.e., set original = 2 * original).
  // 2. Otherwise, stop the process.
  // 3. Repeat this process with the new number as long as you keep finding the number.
// Return the final value of original.


// Solution: Hashset

// Put nums in a hashset.
// Loop until we find a number which is not in the hashset.

// Time Complexity: O(n) (worst case) 97ms
// Space Complexity: O(n) 44.2MB
var findFinalValue = function(nums, original) {
  let found = new Set(nums);
  while (found.has(original)) {
    original *= 2;
  }
  return original;
};

// Two test cases to run function on
console.log(findFinalValue([5,3,6,1,12], 3)) // 24
console.log(findFinalValue([2,7,9], 4)) // 4