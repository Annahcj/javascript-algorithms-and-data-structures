// 393. UTF-8 Validation
// Given an integer array data representing the data, return whether it is a valid UTF-8 encoding (i.e. it translates to a sequence of valid UTF-8 encoded characters).
// A character in UTF8 can be from 1 to 4 bytes long, subjected to the following rules:
  // 1. For a 1-byte character, the first bit is a 0, followed by its Unicode code.
  // 2. For an n-bytes character, the first n bits are all one's, the n + 1 bit is 0, followed by n - 1 bytes with the most significant 2 bits being 10.


// Solution: Bit Manipulation

// For each number, check if we have the correct bits to be part of a UTF8 sequence.
  // If the character is the first byte in the sequence, check the number of leading 1 bits there are followed by a 0.
  // If the character is not the first byte, check that the first two bits are "10".

// We can use binary literals (0b prefix) to improve readability.

// Time Complexity: O(n) 123ms
// Space Complexity: O(1) 44.2MB
var validUtf8 = function(data) {
  let bytes = 0;
  for (let num of data) {
    if (bytes === 0) {
      bytes = getBytes(num) - 1;
      if (bytes === -1) return false; // not a valid first byte 
    } else {
      if (num >> 6 !== 0b10) return false; // not a valid following byte
      bytes--;
    }
  }
  return bytes === 0;
  
  function getBytes(num) {
    if (num >> 3 === 0b11110) return 4;
    if (num >> 4 === 0b1110) return 3;
    if (num >> 5 === 0b110) return 2;
    if (num >> 7 === 0) return 1;
    return 0;
  }
};

// Two test cases to run function on
console.log(validUtf8([197,130,1])) // true
console.log(validUtf8([235,140,4])) // false