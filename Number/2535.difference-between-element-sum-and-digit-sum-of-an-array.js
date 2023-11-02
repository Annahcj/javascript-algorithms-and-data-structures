// 2535. Difference Between Element Sum and Digit Sum of an Array
// You are given a positive integer array nums.
  // The element sum is the sum of all the elements in nums.
  // The digit sum is the sum of all the digits (not necessarily distinct) that appear in nums.
// Return the absolute difference between the element sum and digit sum of nums.
// Note that the absolute difference between two integers x and y is defined as |x - y|.


// Solution: Modulo 10

// To get the digit sum of a number, 
  // use modulo 10 to get the last digit.
  // divide the number by 10 and round it down to remove the last digit.

// n = length of nums, m = max(nums[i])
// Time Complexity: O(n log(m)) 74ms
// Space Complexity: O(1) 44.2MB
var differenceOfSum = function(nums) {
  let elementSum = nums.reduce((sum, num) => sum + num, 0);
  let digitSum = nums.reduce((sum, num) => sum + getDigitSum(num), 0);
  return Math.abs(elementSum - digitSum);
};

function getDigitSum(num) {
  let sum = 0;
  while (num > 0) {
    let digit = num % 10;
    sum += digit;
    num = Math.floor(num / 10);
  }
  return sum;
}

// Two test cases
console.log(differenceOfSum([1,15,6,3])) // 9
console.log(differenceOfSum([1,2,3,4])) // 0