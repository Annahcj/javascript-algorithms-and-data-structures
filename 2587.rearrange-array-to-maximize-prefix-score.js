// 2587. Rearrange Array to Maximize Prefix Score
// You are given a 0-indexed integer array nums. You can rearrange the elements of nums to any order (including the given order).
// Let prefix be the array containing the prefix sums of nums after rearranging it. In other words, prefix[i] is the sum of the elements from 0 to i in nums after rearranging it. The score of nums is the number of positive integers in the array prefix.
// Return the maximum score you can achieve.
 

// Solution: Greedy w/ Sorting

// It is optimal to have larger numbers at the front to get the largest prefix sums.
// Sort the array in descending order.

// Time Complexity: O(n log(n)) 223ms
// Space Complexity: O(log(n)) (space for sorting) 54.6MB
var maxScore = function(nums) {
  nums.sort((a, b) => b - a);
  let prefixSum = 0, score = 0;
  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    score += (prefixSum > 0 ? 1 : 0);
  }
  return score;
};

// Two test cases
console.log(maxScore([2,-1,0,1,-3,3,-3])) // 6
console.log(maxScore([-2,-3,0])) // 0