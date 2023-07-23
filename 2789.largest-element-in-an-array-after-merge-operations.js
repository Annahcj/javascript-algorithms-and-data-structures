// 2789. Largest Element in an Array after Merge Operations
// You are given a 0-indexed array nums consisting of positive integers.
// You can do the following operation on the array any number of times:
  // Choose an integer i such that 0 <= i < nums.length - 1 and nums[i] <= nums[i + 1]. Replace the element nums[i + 1] with nums[i] + nums[i + 1] and delete the element nums[i] from the array.
// Return the value of the largest element that you can possibly obtain in the final array.


// Solution: Greedy

// Go through nums from right to left, starting from the second to last number.
// Keep track of the current sum on the right.
// If nums[i] > current sum, then the number on the right can never be combined with anything on the left because the numbers on the left will only get bigger and bigger.
// Otherwise, it is optimal to add to the sum to increase the chance of combining with future left elements.

// Time Complexity: O(n) 116ms
// Space Complexity: O(1) 53.6MB
var maxArrayValue = function(nums) {
  let n = nums.length, num = nums[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] > num) num = nums[i];
    else num += nums[i];
  }
  return num;
};

// Two test cases
console.log(maxArrayValue([2,3,7,9,3])) // 21
console.log(maxArrayValue([5,3,3])) // 11