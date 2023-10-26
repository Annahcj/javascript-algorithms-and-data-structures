// 55. Jump Game
// You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.
// Return true if you can reach the last index, or false otherwise.


// Solution: One Pass Approach

// Logic:
// [3,2,1,0,4]
// 3: this means we can jump 3 steps, so set max to 3
// 2: this means we can jump 2 steps, we can either jump 2 steps or jump 3 steps from prev step, both reach the same point. max is 2.
// 1: we can jump 1 step, we can either jump 1 step, 2 steps from prev, or 3 steps from prev prev, all reach the same point. max is 1.
// 0: this is the furthest point we can reach and we can't go forward at all, so since possible steps are 0 and we are not at the last index, return false.

var canJump = function(nums) {
  let max = -Infinity, n = nums.length;
  for (var i = 0; i < n; i++) {
    max = Math.max(max - 1, nums[i]);
    if (max < 1 && i !== n - 1) return false;
  }  
  return true;
};

// Two test cases to run function on
console.log(canJump([2,3,1,1,4])) // true
console.log(canJump([3,2,1,0,4])) // false