// 2939. Maximum Xor Product
// Given three integers a, b, and n, return the maximum value of (a XOR x) * (b XOR x) where 0 <= x < 2^n.
// Since the answer may be too large, return it modulo 10^9 + 7.
// Note that XOR is the bitwise XOR operation.


// Solution: Greedy

// For the ith bit from 0 to n - 1, we have a few situations:
  // If the ith bit in `a` and `b` are equal: Always flip the ith bit in x so that both `a` and `b` can become bigger (this means both bits can be set to 1)
  // If they are different: Give the bit to the smaller number so that we can make the difference between `a` and `b` smaller 
    // Explanation: 
      // If two numbers a + b always have the same sum, the maximum product comes from the (a, b) with the least difference.
      // We know that (a, b) will always have the same sum because we are either moving the bit from a to b, or from b to a, or not moving anything.

// Time Complexity: O(n) 70ms
// Space Complexity: O(1) 44.8MB
var maximumXorProduct = function(a, b, n) {
  a = BigInt(a), b = BigInt(b);
  for (let i = n - 1; i >= 0; i--) {
    let bitA = (a >> BigInt(i)) & 1n, bitB = (b >> BigInt(i)) & 1n;
    let ithBit = 1n << BigInt(i);
    if (bitA === bitB) {
      a |= ithBit;
      b |= ithBit;
    } else {
      let giveToA = bitA ? [a, b] : [a | ithBit, b ^ ithBit];
      let giveToB = bitB ? [a, b] : [a ^ ithBit, b | ithBit];
      if (abs(giveToA[0], giveToA[1]) < abs(giveToB[0], giveToA[1])) {
        [a, b] = giveToA;
      } else {
        [a, b] = giveToB;
      }
    }
  }
  return (a * b) % 1000000007n;
};

function abs(a, b) {
  return a > b ? a - b : b - a;
}

// Three test cases
console.log(maximumXorProduct(12, 5, 4)) // 98
console.log(maximumXorProduct(6, 7, 5)) // 930
console.log(maximumXorProduct(1, 6, 3)) // 12