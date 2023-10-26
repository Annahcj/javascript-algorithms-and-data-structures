// 89. Gray Code
// An n-bit gray code sequence is a sequence of 2n integers where:
  // Every integer is in the inclusive range [0, 2n - 1],
  // The first integer is 0,
  // An integer appears no more than once in the sequence,
  // The binary representation of every pair of adjacent integers differs by exactly one bit, and
  // The binary representation of the first and last integers differs by exactly one bit.
// Given an integer n, return any valid n-bit gray code sequence.


// Solution: Bit Manipulation

// Pattern for each level from 1 to n:
  // 1: 0 | 1
  // 2: 00 01 | 11 10
  // 3: 000 001 011 010 | 110 111 101 100
// (Pipe in between indicates the symmetrical split)

// Starting with the base of (0, 1), all following levels is comprised of two parts:
  // Part 1: Existing sequences
  // Part 2: Add 1 in front of all sequences in the previous level in reverse (since it needs to be symmetrical).

// Time Complexity: O(2^n) 114ms
// Space Complexity: O(2^n) 52.8MB
var grayCode = function(n) {
  let sequences = [0, 1];
  for (let i = 2; i <= n; i++) {
    for (let j = (2 ** i) / 2 - 1; j >= 0; j--) {
      sequences.push(sequences[j] | (1 << (i - 1)));
    }
  }
  return sequences;
};

// Two test cases
console.log(grayCode(2)) // [0,1,3,2]
console.log(grayCode(1)) // [0,1]