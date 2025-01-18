// 2289. Steps to Make Array Non-decreasing
// You are given a 0-indexed integer array nums. In one step, remove all elements nums[i] where nums[i - 1] > nums[i] for all 0 < i < nums.length.
// Return the number of steps performed until nums becomes a non-decreasing array.


// Solution: Monotonic Stack

// Iterate through nums from right-to-left, maintaining a monotonic decreasing stack of indices.
// Keep track of how many indices are removed by each nums[i].
// For every nums[i], pop off all smaller elements from the top of the stack.

// To count the number of steps, take the max(removed[top of stack], current removed count).
// We need to take the maximum and not just add to the count because the number at the top of the stack would have already taken care of some removals.
// In reality the top of the stack is not the one removing the smaller elements after it because nums[i] will remove it first, but it doesn't matter because the number of moves is the same.

// Time Complexity: O(n) 16ms
// Space Complexity: O(n) 69.55MB
function totalSteps(nums) {
  const n = nums.length, stack = [];
  const removed = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      removed[i] = Math.max(removed[i] + 1, removed[stack.pop()]);
    }
    stack.push(i);
  }
  return Math.max(...removed);
};

// Two test cases
console.log(totalSteps([5,3,4,4,7,3,6,11,8,5,11])) // 3
console.log(totalSteps([4,5,7,7,13])) // 0