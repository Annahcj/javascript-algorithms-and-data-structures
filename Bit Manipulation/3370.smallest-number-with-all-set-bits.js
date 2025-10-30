// 3370. Smallest Number With All Set Bits
// You are given a positive number n.
// Return the smallest number x greater than or equal to n, such that the binary representation of x contains only set bits.


// Solution: Bit Manipulation

// Find the most significant bit and return the number with all bits set starting from the most significant bit.
// e.g. n = 5 (101), return 7 (111). 
  // Most significant bit is 2, return (2^3)-1 to get 111.

// Time Complexity: O(log(n)) 0ms
// Space Complexity: O(1) 55MB
function smallestNumber(n) {
  let i = 0;
  while (n > 0) {
    n >>= 1;
    i++;
  }
  return (1 << i) - 1;
};

// Three test cases
console.log(smallestNumber(5)) // 7
console.log(smallestNumber(10)) // 15
console.log(smallestNumber(3)) // 3