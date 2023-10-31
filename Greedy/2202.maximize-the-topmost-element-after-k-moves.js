// 2202. Maximize the Topmost Element After K Moves
// You are given a 0-indexed integer array nums representing the contents of a pile, where nums[0] is the topmost element of the pile.
// In one move, you can perform either of the following:
  // If the pile is not empty, remove the topmost element of the pile.
  // If there are one or more removed elements, add any one of them back onto the pile. This element becomes the new topmost element.
  // You are also given an integer k, which denotes the total number of moves to be made.
// Return the maximum value of the topmost element of the pile possible after exactly k moves. In case it is not possible to obtain a non-empty pile after k moves, return -1.


// Solution: Greedy 

// There are many edge cases in this problem:
  // If k is 0, return nums[0].
  // If nums.length is 1 and k is odd, return -1.
  // If k is equal to n, return the max in [nums[0], ..., nums[n - 2]]
  // If k is bigger than n, return the max in nums. 

// Otherwise, it is optimal to remove the first k - 1 numbers, then choose the best of:
  // 1. Removing nums[k - 1] to leave nums[k] as the top element.
  // 2. Adding the maximum of the first k - 1 numbers as the top element.

// Time Complexity: O(n) 118ms
// Space Complexity: O(1) 52.7MB
var maximumTop = function(nums, k) {
  let n = nums.length;
  if (k === 0) return nums[0];
  if (n === 1 && k % 2 === 1) return -1;
  if (k === n) return Math.max(...nums.slice(0, n - 1));
  if (k > n) return Math.max(...nums);
  return Math.max(Math.max(...nums.slice(0, k - 1)), nums[k]);
};

// Two test cases
console.log(maximumTop([5,2,2,4,0,6], 6)) // 5
console.log(maximumTop([18], 3)) // -1