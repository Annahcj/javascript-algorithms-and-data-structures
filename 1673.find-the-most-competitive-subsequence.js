// 1673. Find the Most Competitive Subsequence
// Given an integer array nums and a positive integer k, return the most competitive subsequence of nums of size k.
// An array's subsequence is a resulting sequence obtained by erasing some (possibly zero) elements from the array.
// We define that a subsequence a is more competitive than a subsequence b (of the same length) if in the first position where a and b differ, subsequence a has a number less than the corresponding number in b. For example, [1,3,4] is more competitive than [1,3,5] because the first position they differ is at the final number, and 4 is less than 5.


// Solution: Montonic Increasing Stack

// Montonic increasing stack.
// We need to take the smallest numbers as early on as possible.
// Pop bigger numbers from the stack while the count of numbers on right (n - i) >= count of numbers we need (k - stack.length).
// Only push a new number to the stack if we don't have enough characters. 
  // This is because the length would be shorter than k if we have popped out bigger numbers.

// Time Complexity: O(n) 369ms 
// Space Complexity: O(k) 72.6MB
var mostCompetitive = function(nums, k) {
  let n = nums.length, stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length && stack[stack.length - 1] > nums[i] && k - stack.length < n - i) {
      stack.pop();
    }
    if (stack.length < k) stack.push(nums[i]);
  }
  return stack;
};

// Two test cases to run function on
console.log(mostCompetitive([3,5,2,6], 2)) // [2,6]
console.log(mostCompetitive([2,4,3,3,5,4,9,6,8], 4)) // [2,3,3,4]