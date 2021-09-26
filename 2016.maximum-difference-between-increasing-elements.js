// 2016. Maximum Difference Between Increasing Elements
// Given a 0-indexed integer array nums of size n, find the maximum difference between nums[i] and nums[j] (i.e., nums[j] - nums[i]), such that 0 <= i < j < n and nums[i] < nums[j].
// Return the maximum difference. If no such i and j exists, return -1.


// Solution: 
// Set min to Inf, max to -Inf
// Set maxDiff to 0
// Loop through nums (pointer = i)
  // If nums[i] is smaller than min, set min to nums[i], and reset max to min. (this is because max is now disregarded because it occurs before the new min)
  // set max to Math.max(max, nums[i])
  // set maxDiff to Math.max(maxDiff, max - min)
// If maxDiff is equal to 0, return -1
// Otherwise return maxDiff

// Time Complexity: O(n) 76ms
// Space Complexity: O(1) 38.7MB
var maximumDifference = function(nums) {
  let min = Infinity, max = -Infinity;
  let maxDiff = 0;
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] < min) min = nums[i], max = min;
    max = Math.max(max, nums[i]);
    maxDiff = Math.max(maxDiff, max - min);
  }  
  return maxDiff ? maxDiff : -1;
};

// Three test cases to run function on
console.log(maximumDifference([7,1,5,4])) // 4
console.log(maximumDifference([9,4,3,2])) // -1
console.log(maximumDifference([1,5,2,10])) // 9