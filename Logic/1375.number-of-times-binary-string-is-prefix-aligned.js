// 1375. Number of Times Binary String Is Prefix-Aligned
// You have a 1-indexed binary string of length n where all the bits are 0 initially. We will flip all the bits of this binary string (i.e., change them from 0 to 1) one by one. You are given a 1-indexed integer array flips where flips[i] indicates that the bit at index i will be flipped in the ith step.
// A binary string is prefix-aligned if, after the ith step, all the bits in the inclusive range [1, i] are ones and all the other bits are zeros.
// Return the number of times the binary string is prefix-aligned during the flipping process.


// Solution: Logic

// The constraints state that flips is a permutation of the integers in the range [1, n].
// This means that for the flips, if all the previous and the current numbers are a permutation of [1, ..., i], it is prefix-aligned.
// We can check this by keeping the running max number.
// If the max number is equal to i + 1, it is prefix-aligned.

// Why it works: Because if the maximum number is equal to i + 1, it is guaranteed all the other numbers are in the range of [1, ..., i], the order doesn't matter.

// Time Complexity: O(n) 73ms
// Space Complexity: O(1) 47MB
var numTimesAllBlue = function(flips) {
  let ans = 0, max = 0;
  for (let i = 0; i < flips.length; i++) {
    max = Math.max(max, flips[i]);
    if (max === i + 1) ans++;
  }
  return ans;
};

// Two test cases
console.log(numTimesAllBlue([3,2,4,1,5])) // 2
console.log(numTimesAllBlue([4,1,2,3])) // 1