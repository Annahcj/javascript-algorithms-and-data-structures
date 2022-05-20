// 2147. Number of Ways to Divide a Long Corridor
// Along a long library corridor, there is a line of seats and decorative plants. You are given a 0-indexed string corridor of length n consisting of letters 'S' and 'P' where each 'S' represents a seat and each 'P' represents a plant.
// One room divider has already been installed to the left of index 0, and another to the right of index n - 1. Additional room dividers can be installed. For each position between indices i - 1 and i (1 <= i <= n - 1), at most one divider can be installed.
// Divide the corridor into non-overlapping sections, where each section has exactly two seats with any number of plants. There may be multiple ways to perform the division. Two ways are different if there is a position with a room divider installed in the first way but not in the second way.
// Return the number of ways to divide the corridor. Since the answer may be very large, return it modulo 10^9 + 7. If there is no way, return 0.


// Solution: Combinations

// Each segment must be split into sections which contain two seats.
// This means that the combinations will be caused by the number of plants in between each section.
// Multiply each of the plant counts in between each section for the answer.

// Note: When the number of seats is not divisible by 2 or there are no seats, it is impossible.

// Time Complexity: O(n) 97ms
// Space Complexity: O(1) 52.7MB
var numberOfWays = function(corridor) {
  let n = corridor.length, mod = 10 ** 9 + 7;
  let end = corridor.indexOf('S') - 1, seats = 0;
  let ans = 1;
  for (let i = 0; i < n; i++) {
    if (corridor[i] === 'S') {
      if (seats % 2 === 0) { // start of section
        let plants = i - end;
        ans = (ans * plants) % mod;
      } else {
        end = i;
      }
      seats++;
    }
  }
  return seats % 2 !== 0 || seats === 0 ? 0 : ans;
};

// Three test cases to run function on
console.log(numberOfWays("SSPPSPS")) // 3
console.log(numberOfWays("PPSPSP")) // 1
console.log(numberOfWays("S")) // 0