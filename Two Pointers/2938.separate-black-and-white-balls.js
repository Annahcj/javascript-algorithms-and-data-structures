// 2938. Separate Black and White Balls
// There are n balls on a table, each ball has a color black or white.
// You are given a 0-indexed binary string s of length n, where 1 and 0 represent black and white balls, respectively.
// In each step, you can choose two adjacent balls and swap them.
// Return the minimum number of steps to group all the black balls to the right and all the white balls to the left.


// Solution: Greedy w/ Two Pointers

// Observation: It doesn't matter whether we move zeros to the left actively, or ones to the right actively, the result is the exact same.

// Keep track of the index where the next "0" should be.
// When we encounter a "0", 
  // The number of swaps to get there = current index - next zero index.
  // Move up the zero index by one for the next zero.

// Time Complexity: O(n) 73ms
// Space Complexity: O(1) 45.4MB
var minimumSteps = function(s) {
  let n = s.length, nextZeroIndex = 0, swaps = 0;
  for (let i = 0; i < n; i++) {
    if (s[i] === '0') {
      swaps += (i - nextZeroIndex);
      nextZeroIndex++;
    }
  }
  return swaps;
};

// Three test cases
console.log(minimumSteps("101")) // 1
console.log(minimumSteps("100")) // 2
console.log(minimumSteps("0111")) // 0