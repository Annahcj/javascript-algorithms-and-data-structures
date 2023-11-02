// 2460. Apply Operations to an Array
// You are given a 0-indexed array nums of size n consisting of non-negative integers.
// You need to apply n - 1 operations to this array where, in the ith operation (0-indexed), you will apply the following on the ith element of nums:
  // If nums[i] == nums[i + 1], then multiply nums[i] by 2 and set nums[i + 1] to 0. Otherwise, you skip this operation.
// After performing all the operations, shift all the 0's to the end of the array.
  // For example, the array [1,0,2,0,0,1] after shifting all its 0's to the end, is [1,2,1,0,0,0].
// Return the resulting array.
// Note that the operations are applied sequentially, not all at once.


// Solution: Simulation & Two Pointers

// 1. Perform n - 1 operations following the instructions.
// 2. Shift all zeros to the end of the array using two pointers:
  // i = pointer for the first zero
  // j = pointer for the first non-zero, where j > i.
  // Swap each nums[i] and nums[j] and update the pointers.

// Time Complexity: O(n) 73ms
// Space Complexity: O(1) 42.6MB
var applyOperations = function(nums) {
  let n = nums.length;
  for (let i = 0; i < n - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      nums[i] *= 2;
      nums[i + 1] = 0;
    }
  }
  shiftZeros(nums);
  return nums;
};

function shiftZeros(nums) {
  let n = nums.length, i = 0, j = 0; // i = pointer for zero, j = pointer for non-zero
  while (i < n && j < n) {
    while (i < n && nums[i] !== 0) i++;
    j = i;
    while (j < n && nums[j] === 0) j++;
    if (i === n || j === n) break;
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
}

// Two test cases
console.log(applyOperations([1,2,2,1,1,0])) // [1,4,2,0,0,0]
console.log(applyOperations([0,1])) // [1,0]