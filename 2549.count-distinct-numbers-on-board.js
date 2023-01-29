// 2549. Count Distinct Numbers on Board
// You are given a positive integer n, that is initially placed on a board. Every day, for 109 days, you perform the following procedure:
  // For each number x present on the board, find all numbers 1 <= i <= n such that x % i == 1.
  // Then, place those numbers on the board.
// Return the number of distinct integers present on the board after 109 days have elapsed.
// Note:
  // Once a number is placed on the board, it will remain on it until the end.
  // % stands for the modulo operation. For example, 14 % 3 is 2.


// Solution: Logic

// i % (i-1) = 1 while i >= 3
// At worst, if we don't worry about other numbers and only focus on i % (i-1), we can gain one extra number per day by getting i - 1 until we reach i = 3.
// Since the number of days is larger than n (n <= 100), we can always get all numbers from n to 2.
// We will never get the number 1 since any number % 1 = 0.
// The only exception is if n = 1, then the answer is 1, otherwise it is n - 1.

// Time Complexity: O(1) 70ms
// Space Complexity: O(1) 42.1MB
var distinctIntegers = function(n) {
  if (n === 1) return 1;
  return n - 1;  
};

// Three test cases
console.log(distinctIntegers(5)) // 4
console.log(distinctIntegers(3)) // 2
console.log(distinctIntegers(1)) // 1