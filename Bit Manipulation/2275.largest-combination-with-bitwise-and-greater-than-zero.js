// 2275. Largest Combination With Bitwise AND Greater Than Zero
// The bitwise AND of an array nums is the bitwise AND of all integers in nums.
  // For example, for nums = [1, 5, 3], the bitwise AND is equal to 1 & 5 & 3 = 1.
  // Also, for nums = [7], the bitwise AND is 7.
// You are given an array of positive integers candidates. Evaluate the bitwise AND of every combination of numbers of candidates. Each number in candidates may only be used once in each combination.
// Return the size of the largest combination of candidates with a bitwise AND greater than 0.


// Solution: Count Individual Bits

// To have a bitwise AND sum larger than 0, we only need one bit that hasn't been cancelled out.
// Populate an array count, where count[i] indicates the number of candidates where the ith bit is 1.
// Get the maximum count.

// Time Complexity: O(n) 170ms
// Space Complexity: O(1) 50.8MB
var largestCombination = function(candidates) {
  let count = Array(32).fill(0);
  for (let num of candidates) {
    let number = num, pos = 0;
    while (number > 0) {
      let bit = number & 1;
      if (bit) count[pos]++;
      number = number >> 1;
      pos++;
    }
  }
  return Math.max(...count);
};

// Two test cases
console.log(largestCombination([16,17,71,62,12,24,14])) // 4
console.log(largestCombination([8,8])) // 2