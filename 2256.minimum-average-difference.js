// 2256. Minimum Average Difference
// You are given a 0-indexed integer array nums of length n.
// The average difference of the index i is the absolute difference between the average of the first i + 1 elements of nums and the average of the last n - i - 1 elements. Both averages should be rounded down to the nearest integer.
// Return the index with the minimum average difference. If there are multiple such indices, return the smallest one.
// Note:
  // The absolute difference of two numbers is the absolute value of their difference.
  // The average of n elements is the sum of the n elements divided (integer division) by n.
  // The average of 0 elements is considered to be 0.


// Solution: Prefix Sum

// Keep track of the sum on the left and right of each index i.
// Initially, set left to 0 and right to the total sum of nums.
// As we loop through each nums[i], update the left and right sums.
// Record the index of the smallest absolute difference of the averages.

// Time Complexity: O(n) 153ms
// Space Complexity: O(1) 52.7MB
var minimumAverageDifference = function(nums) {
  let n = nums.length, minDiff = Infinity, ans = Infinity;
  let left = 0, right = nums.reduce((sum, num) => sum + num);
  for (let i = 0; i < n; i++) {
    left += nums[i];
    right -= nums[i];
    let leftAvg = Math.floor(left / (i + 1));
    let rightAvg = i === n - 1 ? 0 : Math.floor(right / (n - i - 1));
    let diff = Math.abs(leftAvg - rightAvg);
    if (diff <= minDiff) {
      ans = diff === minDiff ? Math.min(ans, i) : i;
      minDiff = diff;
    }
  }
  return ans;
};

// Two test cases
console.log(minimumAverageDifference([2,5,3,9,5,3])) // 3
console.log(minimumAverageDifference([0])) // 0