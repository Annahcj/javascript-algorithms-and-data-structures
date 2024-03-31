// 3099. Harshad Number
// An integer divisible by the sum of its digits is said to be a Harshad number. You are given an integer x. Return the sum of the digits of x if x is a Harshad number, otherwise, return -1.


// Solution: 

// Time Complexity: O(log(n)) or O(digits) 52ms
// Space Complexity: O(1) 48.4MB
var sumOfTheDigitsOfHarshadNumber = function(x) {
  const digitSum = getDigitSum(x);
  return x % digitSum === 0 ? digitSum : -1;
};

function getDigitSum(num) {
  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  return sum;
}

// Two test cases
console.log(sumOfTheDigitsOfHarshadNumber(18)) // 9
console.log(sumOfTheDigitsOfHarshadNumber(23)) // -1