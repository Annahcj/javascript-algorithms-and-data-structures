// 1680. Concatenation of Consecutive Binary Numbers
// Given an integer n, return the decimal value of the binary string formed by concatenating the binary representations of 1 to n in order, modulo 10^9 + 7.


// Solution: Bit Manipulation

// Keep track of the current sequence.
// As we add each number i, shift the current sequence left by the number of bits in i.
// Use BigInt to avoid integer overflow.

// Time Complexity: O(n log(n)) 2714ms
// Space Complexity: O(1) 48.6MB
var concatenatedBinary = function(n) {
  let num = 0n, MOD = 1_000_000_007n;
  for (let i = 1; i <= n; i++) {
    let length = getLength(i);
    num = ((num << BigInt(length)) + BigInt(i)) % MOD;
  }
  return num;
  
  function getLength(num) {
    let length = 0;
    while (num > 0) {
      length++;
      num >>= 1;
    }
    return length;
  }
};

// Three test cases
console.log(concatenatedBinary(1)) // 1
console.log(concatenatedBinary(3)) // 27
console.log(concatenatedBinary(12)) // 505379714