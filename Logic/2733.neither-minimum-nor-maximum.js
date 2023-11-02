// 2733. Neither Minimum nor Maximum
// Given an integer array nums containing distinct positive integers, find and return any number from the array that is neither the minimum nor the maximum value in the array, or -1 if there is no such number.
// Return the selected integer.


// Solution: Constant Time

// Since all integers are distinct, we can find the second smallest element out of the first three numbers.
// If the length of nums < 3, return -1;

// Time Complexity: O(1) 208ms
// Space Complexity: O(1) 51.2MB
var findNonMinOrMax = function(nums) {
  let n = nums.length;
  if (n < 3) return -1;
  return [nums[0], nums[1], nums[2]].sort((a, b) => a - b)[1];
};

// Three test cases
console.log(findNonMinOrMax([3,2,1,4])) // 2
console.log(findNonMinOrMax([1,2])) // -1
console.log(findNonMinOrMax([2,1,3])) // 2