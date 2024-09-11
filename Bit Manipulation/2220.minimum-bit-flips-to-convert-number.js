// 2220. Minimum Bit Flips to Convert Number
// A bit flip of a number x is choosing a bit in the binary representation of x and flipping it from either 0 to 1 or 1 to 0.
  // For example, for x = 7, the binary representation is 111 and we may choose any bit (including any leading zeros not shown) and flip it. We can flip the first bit from the right to get 110, flip the second bit from the right to get 101, flip the fifth bit from the right (a leading zero) to get 10111, etc.
// Given two integers start and goal, return the minimum number of bit flips to convert start to goal.


// Solution: Count Different Bits

// Go through each bit and count the number of different bits.

// Time Complexity: O(1) 46ms
// Space Complexity: O(1) 48.3MB
function minBitFlips(start, goal) {
  let flips = 0;
  for (let i = 0; i < 30; i++) {
    let bit = 1 << i;
    if ((start & bit) !== (goal & bit)) {
      flips++;
    }
  }   
  return flips;
};

// Two test cases
console.log(minBitFlips(10, 7)) // 3
console.log(minBitFlips(3, 4)) // 3