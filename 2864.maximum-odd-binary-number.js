// 2864. Maximum Odd Binary Number
// You are given a binary string s that contains at least one '1'.
// You have to rearrange the bits in such a way that the resulting binary number is the maximum odd binary number that can be created from this combination.
// Return a string representing the maximum odd binary number that can be created from the given combination.
// Note that the resulting string can have leading zeros.

 
// Solution: Logic

// An odd number must always have the rightmost bit set to 1.
// To make the number as big as possible, place the rest of the 1's as far left as possible.

// Time Complexity: O(n) 52ms
// Space Complexity: O(n) 44.8MB
var maximumOddBinaryNumber = function(s) {
  let n = s.length, ones = 0, zeros = 0;
  for (let i = 0; i < n; i++) {
    ones += s[i] === '1' ? 1 : 0;
    zeros += s[i] === '0' ? 1 : 0;
  }
  return '1'.repeat(ones - 1) + '0'.repeat(zeros) + '1';
};

// Two test cases
console.log(maximumOddBinaryNumber("010")) // "001"
console.log(maximumOddBinaryNumber("0101")) // "1001"