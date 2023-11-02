// 2595. Number of Even and Odd Bits
// You are given a positive integer n.
// Let even denote the number of even indices in the binary representation of n (0-indexed) with value 1.
// Let odd denote the number of odd indices in the binary representation of n (0-indexed) with value 1.
// Return an integer array answer where answer = [even, odd].


// Solution: Process each bit

// Process each bit in n using right shift (>>= 1).
// Keep track of the index of the current bit.
// If the current bit is 1, add to the even or odd count depending on the index. 

// Time Complexity: O(log(n)) 71ms
// Space Complexity: O(1) 43.9MB
var evenOddBit = function(n) {
  let index = 0, ans = [0, 0];
  while (n > 0) {
    if (n & 1) ans[index % 2]++;
    index++;
    n >>= 1;
  }
  return ans;
};

// Two test cases
console.log(evenOddBit(17)) // [2,0]
console.log(evenOddBit(2)) // [0,1]