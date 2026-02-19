// 693. Binary Number with Alternating Bits
// Given a positive integer, check whether it has alternating bits: namely, if two adjacent bits will always have different values.


// Solution: Bit Manipulation
function hasAlternatingBits(n) {
  let last = n & 1;
  n = n >>= 1;
  while (n > 0) {
    if ((n & 1) === last) {
      return false;
    }
    last = n & 1;
    n >>= 1;
  }
  return true;
};

// Three test cases
console.log(hasAlternatingBits(5)) // true
console.log(hasAlternatingBits(7)) // false
console.log(hasAlternatingBits(11)) // false