// 263. Ugly Number
// An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.
// Given an integer n, return true if n is an ugly number.


// Solution: Math

// Every number greater than 1 is a product of prime numbers.
// For this reason, we can:
  // 1. Divide n by 2 until it is not divisible by 2.
  // 2. Divide n by 3 until it is not divisible by 3.
  // 3. Divide n by 5 until it is not divisible by 5.
// If the remaining number is not 1, then there exists another prime factor.

// Time Complexity: O(log(n)) 78ms
// Space Complexity: O(1) 43.5MB
var isUgly = function(n) {
  if (n <= 0) return false;
  let primeFactors = [2, 3, 5];
  for (let prime of primeFactors) {
    while (n % prime === 0) {
      n /= prime;
    }
  }
  return n === 1;
};

// Three test cases
console.log(isUgly(6)) // true
console.log(isUgly(1)) // true
console.log(isUgly(14)) // false