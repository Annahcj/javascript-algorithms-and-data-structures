// 2571. Minimum Operations to Reduce an Integer to 0
// You are given a positive integer n, you can do the following operation any number of times:
  // Add or subtract a power of 2 from n.
// Return the minimum number of operations to make n equal to 0.
// A number x is power of 2 if x == 2^i where i >= 0.


// Solution: Bit Manipulation 

// Consider n in binary representation.
// There are two cases:
  // Consecutive 1's - add 2^i
    // e.g: 00110 -> 01000 
    // From 01000 we can subtract 2^3 -> 00000
  // Singular 1 - subtract 2^i
    // e.g: 01000 -> 00000

// When we come across trailing 0's like 0100, shift right until we reach the upcoming 1.
// We don't need to add to the number of operations when we shift 0's right because we can subtract or add any power of 2 (makes no difference if we shift 0's out and then add/subtract).

// e.g: 54 (110110)
// 1. 110110 -> 111000 (add 2^0)
// 2. 111000 -> 1000000 (add 2^3)
// 3. 1000000 -> 0000000 (subtract 2^6)

// Time Complexity: O(log(n)) 61ms
// Space Complexity: O(1) 41.9MB
var minOperations = function(n) {
  let moves = 0;
  while (n > 0) {
    if ((n & 1) === 0) {
      n >>= 1;
    } else if ((n & 3) === 3) {
      moves++;
      n++;
    } else if ((n & 1) === 1) {
      moves++;
      n--;
    }
  }
  return moves;
};

// Two test cases
console.log(minOperations(39)) // 3
console.log(minOperations(54)) // 3