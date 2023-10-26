// 553. Optimal Division
// You are given an integer array nums. The adjacent integers in nums will perform the float division.
  // For example, for nums = [2,3,4], we will evaluate the expression "2/3/4".
// However, you can add any number of parenthesis at any position to change the priority of operations. You want to add these parentheses such the value of the expression after the evaluation is maximum.
// Return the corresponding expression that has the maximum value in string format.
// Note: your expression should not contain redundant parenthesis.


// Solution: Greedy

// Since we want to get the maximum value, we need to divide the first number by the smallest second number possible.
// To make the second number as small as possible, we need to divide it as much as possible. To do this, we divide the second number with all numbers that follow it.
// The answer will always be nums[0] / (nums[1] / nums[2] / ...).

// n = length of nums
// Time Complexity: O(n) 68ms
// Space Complexity: O(n) 42.1MB
var optimalDivision = function(nums) {
  let n = nums.length;
  if (n === 1) return nums[0].toString();
  if (n === 2) return `${nums[0]}/${nums[1]}`;
  return `${nums[0]}/(${nums.slice(1).join("/")})`;
};

// Two test cases
console.log(optimalDivision([1000,100,10,2])) // "1000/(100/10/2)"
console.log(optimalDivision([2,3,4])) // "2/(3/4)"