// 2574. Left and Right Sum Differences
// Given a 0-indexed integer array nums, find a 0-indexed integer array answer where:
  // answer.length == nums.length.
  // answer[i] = |leftSum[i] - rightSum[i]|.
// Where:
  // leftSum[i] is the sum of elements to the left of the index i in the array nums. If there is no such element, leftSum[i] = 0.
  // rightSum[i] is the sum of elements to the right of the index i in the array nums. If there is no such element, rightSum[i] = 0.
// Return the array answer.


// Solution: Running Sum

// Keep track of the running left and right sum.
// For each index i, update the left and right sum.

// Time Complexity: O(n) 68ms
// Space Complexity: O(n) 43.9MB
var leftRigthDifference = function(nums) {
  let n = nums.length, rightSum = nums.reduce((sum, num) => sum + num);
  let leftSum = 0, ans = [];
  for (let i = 0; i < n; i++) {
    rightSum -= nums[i];
    ans.push(Math.abs(leftSum - rightSum));
    leftSum += nums[i];
  }
  return ans;
};

// Two test cases
console.log(leftRigthDifference([10,4,8,3])) // [15,1,11,22]
console.log(leftRigthDifference([1])) // [0]