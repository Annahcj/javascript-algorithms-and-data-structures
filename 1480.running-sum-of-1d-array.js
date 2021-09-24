// 1480. Running Sum of 1d Array
// Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]).
// Return the running sum of nums.


// Solution: 

// Loop through nums starting from index 1
  // increment nums[i] by nums[i - 1]
// Return nums

// Time Complexity: O(n) 76ms
// Space Complexity: O(1) (in-place) 40.1MB
var runningSum = function(nums) {
  for (var i = 1; i < nums.length; i++) {
    nums[i] += nums[i - 1];
  }  
  return nums;
};

// A test case to run function on
console.log(runningSum([1,2,3,4])) // [1,3,6,10]