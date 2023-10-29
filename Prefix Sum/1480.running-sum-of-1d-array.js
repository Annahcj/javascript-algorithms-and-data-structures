// 1480. Running Sum of 1d Array
// Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]).
// Return the running sum of nums.


// Solution: Prefix Sum

// Accumulate each nums[i] with the previous prefix sum nums[i - 1]. 

// Time Complexity: O(n) 76ms
// Space Complexity: O(1) (in-place) 40.1MB
var runningSum = function(nums) {
  for (let i = 1; i < nums.length; i++) {
    nums[i] += nums[i - 1];
  }  
  return nums;
};

// A test case
console.log(runningSum([1,2,3,4])) // [1,3,6,10]