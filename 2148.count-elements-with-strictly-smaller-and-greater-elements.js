// 2148. Count Elements With Strictly Smaller and Greater Elements
// Given an integer array nums, return the number of elements that have both a strictly smaller and a strictly greater element appear in nums.


// Solution: Get Min & Max

// 1. Get the min and max.
// 2. Count the numbers that are 
  // bigger than the min AND
  // smaller than the max

// Time Complexity: O(n) 72ms
// Space Complexity: O(1) 40.2MB
var countElements = function(nums) {
  let max = nums[0], min = nums[nums.length - 1];
  for (var num of nums) {
    min = Math.min(min, num);
    max = Math.max(max, num);
  }

  let count = 0;
  for (var num of nums) {
    if (num > min && num < max) count++;
  }
  return count;
};

// Two test cases to run function on
console.log(countElements([11,7,2,15])) // 2
console.log(countElements([-3,3,3,90])) // 2