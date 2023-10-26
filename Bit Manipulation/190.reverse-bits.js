// 190. Reverse Bits
// Reverse bits of a given 32 bits unsigned integer.


// Solution: Bit by bit

// Time Complexity: O(1) 84ms
// Space Complexity: O(1) 40.6MB
var reverseBits = function(n) {
  let ans = 0;
  for (var i = 0; i < 32; i++) {
    // left shift all bits in answer
    ans <<= 1;
    // if last bit of n is 1, turn last bit of ans to 1
    ans |= n & 1;
    // right shift all bits in n
    n >>= 1;
  }  
  // turn to unsigned
  return ans >>> 0;
};