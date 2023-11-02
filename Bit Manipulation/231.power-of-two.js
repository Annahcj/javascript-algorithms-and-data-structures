// 231. Power of Two
// Given an integer n, return true if it is a power of two. Otherwise, return false.
// An integer n is a power of two, if there exists an integer x such that n == 2x.


// Solution: Bit Manipulation

// A power of two always has exactly one 1.
// e.g: 16 = 10000
// One less than a power of two is always has the 'power of two' bit as 0 and all the rest as 1.
// e.g: 15 = 01111
// 16 & 15 = 00000
// Hence the formula: n&(n-1) should be equal to 0 for a power of two

// Note: if n <= 0, it can never be a power of two.

// Time Complexity: O(1) 84ms
// Space Complexity: O(1) 40MB
var isPowerOfTwo = function(n) {
  return n > 0 && (n&(n-1)) === 0;
};

// Three test cases to run function on
console.log(isPowerOfTwo(1)) // true
console.log(isPowerOfTwo(16)) // true
console.log(isPowerOfTwo(3)) // false