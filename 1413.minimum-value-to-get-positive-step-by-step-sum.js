// 1413. Minimum Value to Get Positive Step by Step Sum
// Given an array of integers nums, you start with an initial positive value startValue.
// In each iteration, you calculate the step by step sum of startValue plus elements in nums (from left to right).
// Return the minimum positive value of startValue such that the step by step sum is never less than 1.


// Solution: One Pass

// Start sum at 1
// for e.g: [-3, 2, 2]
// sum: 1
// sum: 1 + -3: -2
// sum: -2 + 2: 0
// sum: 2 + 2: 4

// lowest point: -2
// since we started sum at 1, the answer is 2 + 2 = 4.

// another e.g: [0, 2]
// sum: 1
// sum: 1 + 0 : 1
// sum: 1 + 2: 3

// lowest point: 1
// since lowest point is bigger than or equal to 1, return 1

// Time Complexity: O(n) 68ms
// Space Complexity: O(1) 38.8MB
var minStartValue = function(nums) {
  let sum = 1;
  let min = Infinity;
  for (var num of nums) {
    sum += num;
    min = Math.min(min, sum);
  }  
  if (min >= 1) return 1;
  return Math.abs(min) + 2;
};

// Three test cases to run function on
console.log(minStartValue([-3,2,-3,4,2])) // 5
console.log(minStartValue([1,2])) // 1
console.log(minStartValue([1,-2,-3])) // 5