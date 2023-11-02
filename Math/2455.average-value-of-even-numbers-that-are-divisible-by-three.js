// 2455. Average Value of Even Numbers That Are Divisible by Three
// Given an integer array nums of positive integers, return the average value of all even integers that are divisible by 3.
// Note that the average of n elements is the sum of the n elements divided by n and rounded down to the nearest integer.


// Solution:

// Get the sum of numbers visible by 2 and 3 and return the average. 

// Time Complexity: O(n)
// Space Complexity: O(1)
var averageValue = function(nums) {
  let sum = 0, n = 0;
  for (let num of nums) {
    if (num % 2 === 0 && num % 3 === 0) {
      sum += num;
      n++;
    }
  }
  return n === 0 ? 0 : Math.floor(sum / n);
};

// Two test cases
console.log(averageValue([1,3,6,10,12,15])) // 9
console.log(averageValue([1,2,4,7,10])) // 0