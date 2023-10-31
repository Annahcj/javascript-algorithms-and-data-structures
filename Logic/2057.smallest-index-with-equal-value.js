// 2057. Smallest Index With Equal Value
// Given a 0-indexed integer array nums, return the smallest index i of nums such that i mod 10 == nums[i], or -1 if such index does not exist.
// x mod y denotes the remainder when x is divided by y.


// Solution: Simple Check

// Just loop through nums, and return the first index where index modular 10 is equal to nums[index].
// Otherwise return -1
var smallestEqual = function(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (i % 10 === nums[i]) return i;
  }  
  return -1;
};

// Two test cases
console.log(smallestEqual([0,1,2])) // 0
console.log(smallestEqual([4,3,2,1])) // 2