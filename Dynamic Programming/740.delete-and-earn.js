// 740. Delete and Earn
// You are given an integer array nums. You want to maximize the number of points you get by performing the following operation any number of times:
// Pick any nums[i] and delete it to earn nums[i] points. Afterwards, you must delete every element equal to nums[i] - 1 and every element equal to nums[i] + 1.
// Return the maximum number of points you can earn by applying the above operation some number of times.


// Solution 1: Dynamic Programming

// Thoughts:
// We can use an array to store the sums of the same numbers at indexes of itself, since what we need to worry about is only nums[i] - 1, and nums[i] + 1.
// For e.g: [3,4,2,3] -> dp: [0,0,2,6,4] (there is 1 two, so dp[2] = 2. there are 2 threes, so dp[3] = 6 (3 + 3), there is 1 four, so dp[4] = 4)
// Using this dp array, we can loop through and calculate the max points we can achieve.

// Algorithm:
// Loop through nums and find the biggest number in nums.
// Generate a dp array with the size of max + 1 
// Loop through nums (pointer = i)
  // Increment dp[nums[i]] by nums[i]
// - end of iteration -
// Keep track of a 'prevMax' (set it to 0) which indicates the previous maximum sum, and 'maxSum' (set it to dp[1], number of 1's), which keeps track of the current sum. 
// This is necessary because the sum cannot include adjacent numbers (numbers next to each other in the dp array).
// Loop through dp from 2 onwards
  // Calculate the 'newMaxSum', which is the bigger of either -> (dp[index] + prevMax) or (maxSum)
  // Update prevMax to be maxSum
  // Update maxSum to be newMaxSum
// - end of iteration -
// Return maxSum

// Time Complexity: O(n) 76ms
// Space Complexity: O(bigger number in nums) 39.3MB

  var deleteAndEarn = function(nums) {
    let max = 0;
    for (var j = 0; j < nums.length; j++) max = Math.max(max, nums[j]);
    let dp = Array(max + 1).fill(0);
    for (var i = 0; i < nums.length; i++) {
      dp[nums[i]] += nums[i];
    }
    let prevMax = 0;
    let maxSum = dp[1];
    for (var j = 2; j < dp.length; j++) {
      let newMaxSum = Math.max(maxSum, prevMax + dp[j]);
      prevMax = maxSum;
      maxSum = newMaxSum;
    }
    return maxSum;
  };
  
  // Two test cases to run function on
  console.log(deleteAndEarn([3,4,2])) // 6
  console.log(deleteAndEarn([2,2,3,3,3,4])) // 9