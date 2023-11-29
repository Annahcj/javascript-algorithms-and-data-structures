// 191. Number of 1 Bits
// Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).


// Solution: Check Each Bit

// Go through each bit and count the '1' bits.

// Time Complexity: O(1) 55ms
// Space Complexity: O(1) 41.8MB
var hammingWeight = function(n) {
  let count = 0;
  for (let i = 0; i < 32; i++) {
    count += (n >> i) & 1;
  }
  return count;
};

// Two test cases
console.log(hammingWeight(11)) // 3
console.log(hammingWeight(128)) // 1