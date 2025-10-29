// 3354. Make Array Elements Equal to Zero
// You are given an integer array nums.
// Start by selecting a starting position curr such that nums[curr] == 0, and choose a movement direction of either left or right.
// After that, you repeat the following process:
  // If curr is out of the range [0, n - 1], this process ends.
  // If nums[curr] == 0, move in the current direction by incrementing curr if you are moving right, or decrementing curr if you are moving left.
  // Else if nums[curr] > 0:
    // Decrement nums[curr] by 1.
    // Reverse your movement direction (left becomes right and vice versa).
    // Take a step in your new direction.
// A selection of the initial position curr and movement direction is considered valid if every element in nums becomes 0 by the end of the process.
// Return the number of possible valid selections.


// Solution: Simulation

// n = length of nums, m = max(nums[i])
// Time Complexity: O(n^2 * m) 177ms
// Space Complexity: O(n) 58MB
function countValidSelections(nums) {
  let valid = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      valid += Number(isPossible([...nums], i, 'L')) + Number(isPossible([...nums], i, 'R'));
    }
  }
  return valid;
};

function isPossible(nums, pos, dir) {
  while (pos >= 0 && pos < nums.length) {
    if (nums[pos] > 0) {
      nums[pos]--;
      dir = dir === 'L' ? 'R' : 'L';
    }
    pos += dir === 'L' ? -1 : 1;
  }
  return nums.every(num => num === 0);
}

// Two test cases
console.log(countValidSelections([1,0,2,0,3])) // 2
console.log(countValidSelections([2,3,4,0,4,1,0])) // 0