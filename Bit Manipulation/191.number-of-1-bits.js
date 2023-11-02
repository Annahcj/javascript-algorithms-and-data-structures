// 191. Number of 1 Bits
// Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).


// Solution: Check Each Bit

// Use a mask to check each bit of n.
// Set mask to 1 initially -> 00000000000000000000000000000001
// Loop 32 times (for 32 bits) 
  // if (mask & n) is not 0, increment count (mask will always be 1 at the bit we are checking, so if answer is 1, bit at n will also be 1, otherwise 0)
  // left shift the one bit in mask -> (the one will move left by 1 position)
// Return count.

// Time Complexity: O(1) 88ms
// Space Complexity: O(1) 40.3MB
var hammingWeight = function(n) {
  let mask = 1, count = 0;
  for (var i = 0; i < 32; i++) {
    if (mask & n) count++;
    mask <<= 1;
  } 
  return count; 
};

// Two test cases to run function on
console.log(hammingWeight(11)) // 3
console.log(hammingWeight(128)) // 1