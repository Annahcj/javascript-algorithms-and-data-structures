// 1009. Complement of Base 10 Integer
// The complement of an integer is the integer you get when you flip all the 0's to 1's and all the 1's to 0's in its binary representation.
// For example, The integer 5 is "101" in binary and its complement is "010" which is the integer 2.
// Given an integer n, return its complement.


// Solution: Using XOR

// 1^1 = 0
// 1^0 = 1

// XOR each bit with 1.
// Use n as a counter so that we know when to stop the loop.

// Time Complexity: O(1)
// Space Complexity: O(1)
var bitwiseComplement = function(n) {
  if (n === 0) return 1;
  let ans = n, bit = 1;
  while (n !== 0) {
    ans ^= bit;
    bit <<= 1;
    n >>= 1;
  }
  return ans;
};

// Two test cases 
console.log(bitwiseComplement(5)) // 2
console.log(bitwiseComplement(0)) // 1