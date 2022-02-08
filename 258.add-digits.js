// 258. Add Digits
// Given an integer num, repeatedly add all its digits until the result has only one digit, and return it.


// Solution 1: Loops

// Add all the digits together until only one digit is left.

// Time Complexity: O(log(n)) 97ms
// Space Complexity: O(1) 43.9MB
var addDigits = function(num) {
  while (num > 9) {
    let sum = 0;
    while (num > 0) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    num = sum;
  }
  return num;
};


// Solution 2: Math Theory

// Notice that all multiples of 9 have a sum of 9: 9,18,27,36,45,54,63...
// Take a look at this example from a post in leetcode:

// Number:         18, 19, 20, 21, 22, 23, 24, 25, 26, 27
// Sum of Digits:  9,  1,  2,  3,  4,  5,  6,  7,  8,  9
// Number % 9:     0,  1,  2,  3,  4,  5,  6,  7,  8,  0

// Time Complexity: O(1) 109ms
// Space Complexity: O(1) 43.4MB
var addDigits = function(num) {
  if (num === 0) return 0;
  if (num % 9 === 0) return 9;
  return num % 9;
};

// Five test cases to run function on
console.log(addDigits(38)) // 2
console.log(addDigits(108)) // 9
console.log(addDigits(0)) // 0
console.log(addDigits(17)) // 8
console.log(addDigits(179)) // 8