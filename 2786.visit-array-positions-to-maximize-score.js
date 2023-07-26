// 2786. Visit Array Positions to Maximize Score
// You are given a 0-indexed integer array nums and a positive integer x.
// You are initially at position 0 in the array and you can visit other positions according to the following rules:
  // If you are currently in position i, then you can move to any position j such that i < j.
  // For each position i that you visit, you get a score of nums[i].
  // If you move from a position i to a position j and the parities of nums[i] and nums[j] differ, then you lose a score of x.
// Return the maximum total score you can get.
// Note that initially you have nums[0] points.


// Solution: DP

// Keep track of bestEven and bestOdd, where 
  // bestEven = the current best score ending at an even number
  // bestOdd = the current best score ending at an odd number

// At each nums[i], we have two choices:
  // 1. Keep the current best score for the parity.
  // 2. Take nums[i] + max out of the current best score for the same parity OR the current best score for the opposite parity minus the penalty. 

// Time Complexity: O(n) 116ms
// Space Complexity: O(1) 54.6MB
var maxScore = function(nums, x) {
  let n = nums.length;
  let bestEven = nums[0] % 2 === 0 ? nums[0] : -Infinity;
  let bestOdd = nums[0] % 2 === 1 ? nums[0] : -Infinity;
  for (let i = 1; i < n; i++) {
    if (nums[i] % 2 === 0) {
      bestEven = Math.max(bestEven, nums[i] + Math.max(bestEven, bestOdd - x));
    } else {
      bestOdd = Math.max(bestOdd, nums[i] + Math.max(bestOdd, bestEven - x));
    }
  }
  return Math.max(bestEven, bestOdd);
};

// Two test cases
console.log(maxScore([2,3,6,1,9,2], 5)) // 13
console.log(maxScore([2,4,6,8], 3)) // 20