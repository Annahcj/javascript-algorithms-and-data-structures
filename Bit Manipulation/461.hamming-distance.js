// 461. Hamming Distance
// The Hamming distance between two integers is the number of positions at which the corresponding bits are different.
// Given two integers x and y, return the Hamming distance between them.


// Solution: Xor and Right Shift

// Take the xor of x and y
// loop while xor is bigger than 0
  // if xor & 1 is 1, increment count by one.
  // shift xor one to the right
// Return count.

// Time Complexity: O(1) 68ms
// Space Complexity: O(1) 38.8MB
var hammingDistance = function(x, y) {
  let xor = x ^ y, count = 0;
  while (xor > 0) {
    if (xor & 1) count++;
    xor >>= 1;
  }
  return count;
};

// Two test cases to run function on
console.log(hammingDistance(1, 4)) // 2
console.log(hammingDistance(3, 1)) // 1