// 1318. Minimum Flips to Make a OR b Equal to c
// Given 3 positives numbers a, b and c. Return the minimum flips required in some bits of a and b to make ( a OR b == c ). (bitwise OR operation).
// Flip operation consists of change any single bit 1 to 0 or change the bit 0 to 1 in their binary representation.


// Solution: Bit Manipulation & Logic

// For each bit (0 - 32), there are two cases,
  // If the ith bit in c is 1: at least one bit in a and b both need to be 1.
  // If the ith bit in c is 0: both bits in a and b must be 0.

// Time Complexity: O(1) 100ms
// Space Complexity: O(1) 42.3MB
var minFlips = function(a, b, c) {
  let flips = 0;
  for (let i = 0; i < 32; i++) {
    if (c & 1) {
      if ((a & 1) === 0 && (b & 1) === 0) flips++;
    } else {
      if ((a & 1) === 1) flips++;
      if ((b & 1) === 1) flips++;
    }
    a >>= 1;
    b >>= 1;
    c >>= 1;
  }
  return flips;
};

// Three test cases 
console.log(minFlips(2, 6, 5)) // 3
console.log(minFlips(4, 2, 7)) // 1
console.log(minFlips(1, 2, 3)) // 0