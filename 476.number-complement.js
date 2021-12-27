// 476. Number Complement
// The complement of an integer is the integer you get when you flip all the 0's to 1's and all the 1's to 0's in its binary representation.
// For example, The integer 5 is "101" in binary and its complement is "010" which is the integer 2.
// Given an integer num, return its complement.


// Solution: Bitwise XOR

// The bitwise XOR is perfect for flipping bits.
// These are the 4 situations:
  // 1. 0 0 -> 0
  // 2. 1 1 -> 0
  // 3. 0 1 -> 1
  // 4. 1 0 -> 1
// Basically if the bits are different, it is 1, if they are the same, it is 0.

// We can flip each bit by XORing it with 1.

// Time Complexity: O(1) 64ms
// Space Complexity: O(1) 38.7MB
var findComplement = function(num) {
  let bit = 1, ans = num;
  while (num !== 0) {
    ans ^= bit; // XOR with 1 at specific bit
    bit <<= 1; // shift 1 to the left
    num >>= 1; // shift num 1 to the right
  }
  return ans;
};

// Two test cases to run function on
console.log(findComplement(5)) // 2 
console.log(findComplement(1)) // 0