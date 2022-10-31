// 2457. Minimum Addition to Make Integer Beautiful
// You are given two positive integers n and target.
// An integer is considered beautiful if the sum of its digits is less than or equal to target.
// Return the minimum non-negative integer x such that n + x is beautiful. The input will be generated such that it is always possible to make n beautiful.


// Solution: Greedy

// It is optimal to use smaller digits earlier on.
// For every digit in n (from right to left),
  // Try to increase each digit[i] in n by 1. 
  // Simulate turning all digits on the right of digit i into 0.

// e.g: n = 467, target = 1
// 4678 -> 4680 
// 4680 -> 4700
// 4700 -> 5000
// 5000 -> 10000

// Find the first number generated where the sum of digits <= target.
// Special case: If we haven't found a beautiful integer, return 10000... (minimum power of ten which is larger than n).

// Time Complexity: O(log(n) * log(n)) 89ms
// Space Complexity: O(1) 42.3MB
var makeIntegerBeautiful = function(n, target) {
  if (sumDigits(n) <= target) return 0;
  let digits = numDigits(n), num = n, powTen = 1;
  for (let i = 0; i < digits; i++) {
    let digit = num % 10;
    powTen *= 10;
    num = Math.floor(num / 10) + (digit === 0 ? 0 : 1);
    let newNum = num * powTen;
    if (sumDigits(newNum) <= target) return newNum - n;
  }
  
  function numDigits(num) {
    let digits = 0;
    while (num > 0) {
      digits++;
      num = Math.floor(num / 10);
    }
    return digits;
  }
  
  function sumDigits(num) {
    let sum = 0;
    while (num > 0) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    return sum;
  }
};

// Three test cases
console.log(makeIntegerBeautiful(16, 6)) // 4
console.log(makeIntegerBeautiful(467, 6)) // 33
console.log(makeIntegerBeautiful(1, 1)) // 0