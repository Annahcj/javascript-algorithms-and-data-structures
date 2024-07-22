// 3228. Maximum Number of Operations to Move Ones to the End
// You are given a binary string s.
// You can perform the following operation on the string any number of times:
    // Choose any index i from the string where i + 1 < s.length such that s[i] == '1' and s[i + 1] == '0'.
    // Move the character s[i] to the right until it reaches the end of the string or another '1'. For example, for s = "010010", if we choose i = 1, the resulting string will be s = "000110".
// Return the maximum number of operations that you can perform.


// Solution: Greedy

// To maximize the operations, start moving indices from the left first.

// We don't need to simulate the actual operations to find the leftmost '10' on each move.
// Keep track of the number of consecutive 1's we currently have, and this whole group of 1's moves one by one to the next group of 1's.
// e.g. 101101
  // 1. _1_01101 -> 011101 (now we have three consecutive 1's)
  // 2. 0_111_01 -> 001111 (now we have four consecutive 1's, and we're done)

// Time Complexity: O(n) 67ms
// Space Complexity: O(1) 52.5MB
function maxOperations(s) {
  let n = s.length, i = 0;
  let ones = 0, operations = 0;
  while (i < n) {
    if (s[i] === '1') {
      while (s[i] === '1') i++, ones++;
    } else {
      // join up the previous group of 1's with the next group of 1's
      operations += ones;
      while (s[i] === '0') i++;
    }
  }
  return operations;
};

// Two test cases
console.log(maxOperations("1001101")) // 4
console.log(maxOperations("00111")) // 0