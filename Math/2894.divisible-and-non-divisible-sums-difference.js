// 2894. Divisible and Non-divisible Sums Difference
// You are given positive integers n and m.
// Define two integers, num1 and num2, as follows:
  // num1: The sum of all integers in the range [1, n] that are not divisible by m.
  // num2: The sum of all integers in the range [1, n] that are divisible by m.
// Return the integer num1 - num2.


// Solution: Math

// Essentially we need to find all the multiples of m, that are smaller than or equal to n.

// Divisible: 
  // The number of multiples of m smaller than or equal to n: Math.floor(n / m)
  // Each multiple grows larger by m each time. This means we get one more occurance of m inside each multiple: (multiples * (multiples + 1) / 2) * m

// Non divisible: 
  // The total sum in the range [1, n] - the divisible sum: (n * (n + 1) / 2) - divisible

// Time Complexity: O(1) 51ms
// Space Complexity: O(1) 41.9MB
var differenceOfSums = function(n, m) {
  let multiples = Math.floor(n / m);
  let divisible = (multiples * (multiples + 1) / 2) * m;
  let nonDivisible = (n * (n + 1) / 2) - divisible;
  return nonDivisible - divisible;
};

// Three test cases
console.log(differenceOfSums(10, 3)) // 19
console.log(differenceOfSums(5, 6)) // 15
console.log(differenceOfSums(5, 1)) // -15