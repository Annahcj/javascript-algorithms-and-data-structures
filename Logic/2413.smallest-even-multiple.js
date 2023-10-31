// 2413. Smallest Even Multiple
// Given a positive integer n, return the smallest positive integer that is a multiple of both 2 and n.


// Solution: Logic

// If n is even, return it.
// If n is odd, the smallest positive integer is n * 2.

// Time Complexity: O(1) 102ms
// Space Complexity: O(1) 41.6MB
var smallestEvenMultiple = function(n) {
  return n % 2 === 0 ? n : n * 2;
};

// Two test cases
console.log(smallestEvenMultiple(5)) // 10
console.log(smallestEvenMultiple(6)) // 6