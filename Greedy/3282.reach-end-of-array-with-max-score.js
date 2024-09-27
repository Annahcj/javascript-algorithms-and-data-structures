// 3282. Reach End of Array With Max Score
// You are given an integer array nums of length n.
// Your goal is to start at index 0 and reach index n - 1. You can only jump to indices greater than your current index.
// The score for a jump from index i to index j is calculated as (j - i) * nums[i].
// Return the maximum possible total score by the time you reach the last index.


// Solution: Greedy

// Score of a jump is (j - i) * nums[i], meaning we add the last nums[i] we took for every index we pass by.
// It's optimal to take the maximum running nums[i] as we traverse through nums.

// Time Complexity: O(n) 108ms
// Space Complexity: O(1) 70.3MB
function findMaximumScore(nums) {
  let n = nums.length, max = 0;
  let score = 0;
  for (let i = 0; i < n; i++) {
    score += max;
    max = Math.max(max, nums[i]);
  }
  return score;
};

// Two test cases
console.log(findMaximumScore([1,3,1,5])) // 7
console.log(findMaximumScore([4,3,1,3,2])) // 16