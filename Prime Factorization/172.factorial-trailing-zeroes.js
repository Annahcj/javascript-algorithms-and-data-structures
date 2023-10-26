// 172. Factorial Trailing Zeroes
// Given an integer n, return the number of trailing zeroes in n!.
// Note that n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1.


// Solution: Count Prime Factors of 2s and 5s

// The prime factors 2 * 5 will lead to a trailing zero.
// We need to count the number of the prime factors 2 and 5.

// We know that there will always be more factors of 2 than 5's, since 2 will occur at every 2nd number.
// To count the number of 5's appearing as prime factors, we can count the number of times a multiple of 5 appears in numbers less than or equal to n.
  // multiples of 5: contributes Math.floor(n / 5) factors of 5
  // multiples of 25: contributes another Math.floor(n / 25) factors of 5
  // multiples of 125: contributes another Math.floor(n / 125) factors of 5
  // ... and so on for all powers of 5 that are smaller than or equal to n

// Time Complexity: O(log_5(n)) 95ms
// Space Complexity: O(1) 42.1MB
var trailingZeroes = function(n) {
  let ans = 0;
  for (let i = 5; i <= n; i *= 5) {
    ans += Math.floor(n / i);
  }
  return ans;
};

// Three test cases
console.log(trailingZeroes(3)) // 0
console.log(trailingZeroes(5)) // 1
console.log(trailingZeroes(0)) // 0