// 2429. Minimize XOR
// Given two positive integers num1 and num2, find the integer x such that:
  // x has the same number of set bits as num2, and
  // The value x XOR num1 is minimal.
// Note that XOR is the bitwise XOR operation.
// Return the integer x. The test cases are generated such that x is uniquely determined.
// The number of set bits of an integer is the number of 1's in its binary representation.


// Solution: Greedy - N Most Significant Bits in num2

// Find n, the number of 1-bits in num2.

// Create a number with the n most significant bits of num1. 
  // (Since 1^1 = 0, we will be minimizing the result by removing the most significant bits)

// If num1 has less than n 1-bits, take the least significant bits.
  // (If there are no bits to remove, we need to take the bits that add the least value)

// Time Complexity: O(32) = O(1) 88ms
// Space Complexity: O(1) 42.3MB
var minimizeXor = function(num1, num2) {
  let n = countOnes(num2), res = 0, ones = 0;
  // Take the most significant 1-bits in num1
  for (let i = 31; i >= 0; i--) { 
    if (ones === n) break;
    if (((num1 >> i) & 1) === 1) {
      res |= (1 << i);
      ones++;
    }
  }
  
  // Take the least significant bits if there are no more 1-bits in num1
  for (let i = 0; i <= 31; i++) {
    if (ones === n) break;
    if (((res >> i) & 1) === 1) continue;
    res |= (1 << i);
    ones++;
  }
  return res;
  
  function countOnes(num) {
    let count = 0;
    while (num > 0) {
      count += (num & 1);
      num >>= 1;
    }
    return count;
  }
};

// Two test cases
console.log(minimizeXor(3, 5)) // 3
console.log(minimizeXor(1, 12)) // 3