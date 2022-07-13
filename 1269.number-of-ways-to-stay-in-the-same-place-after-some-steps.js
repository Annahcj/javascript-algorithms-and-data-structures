// 1269. Number of Ways to Stay in the Same Place After Some Steps
// You have a pointer at index 0 in an array of size arrLen. At each step, you can move 1 position to the left, 1 position to the right in the array, or stay in the same place (The pointer should not be placed outside the array at any time).
// Given two integers steps and arrLen, return the number of ways such that your pointer still at index 0 after exactly steps steps. Since the answer may be too large, return it modulo 10^9 + 7.


// Solution 1: Top-down DP - Recursion w/ Memoization

// Memoize each dp(i, stepsLeft) -> the number of ways at index i with 'stepsLeft' number of steps left.
// For each (i, stepsLeft), get the sum of the three situations:
  // Move left (-1)
  // Move right (+1)
  // Stay at the current index

// n = steps
// Time Complexity: O(n^2) 155ms
// Space Complexity: O(n^2) 54.7MB
var numWays = function(steps, arrLen) {
  let memo = Array(steps + 1).fill(0).map(() => Array(steps + 1).fill(-1)), mod = 10 ** 9 + 7;
  return dp(0, steps);
  
  function dp(i, steps) {
    if (steps === 0) return i === 0 ? 1 : 0; // found a way
    if (i > steps || i < 0 || i >= arrLen) return 0; // out of bounds
    if (memo[i][steps] !== -1) return memo[i][steps]; // memoized
    
    let moveLeft = dp(i - 1, steps - 1);
    let moveRight = dp(i + 1, steps - 1);
    let stay = dp(i, steps - 1);
    return memo[i][steps] = (moveLeft + moveRight + stay) % mod;
  }
};

// Solution 2: Bottom-up DP - Tabulation

// dp[i][j] -> the number of ways at index i with j number of steps left.
// Set the base cases - 1 step: 
  // Staying at index 0: 1 way
  // Moving right to index 1: 1 way

// For 'steps' number of steps,
  // Calculate and store the number of ways to get to each position j based on information from the previous row (dp[i - 1]).

// Time Complexity: O(n^2) 123ms
// Space Complexity: O(n^2) 52.4MB
var numWays = function(steps, arrLen) {
  let maxIndex = Math.min(steps, arrLen), mod = 10 ** 9 + 7;
  let dp = Array(steps + 1).fill(0).map(() => Array(maxIndex).fill(0));
  dp[1][0] = 1, dp[1][1] = 1;
  
  for (let i = 2; i <= steps; i++) {
    for (let j = 0; j < maxIndex; j++) {
      let left = j === 0 ? 0 : dp[i - 1][j - 1];
      let right = j === maxIndex - 1 ? 0 : dp[i - 1][j + 1];
      dp[i][j] = (left + right + dp[i - 1][j]) % mod;
    }
  }
  return dp[steps][0];
};

// Solution 3: Optimized Space

// Since we only need information from the previous row, so we can just keep track of the previous and current row.

// Time Complexity: O(n^2) 132ms
// Space Complexity: O(n) 47.6MB
var numWays = function(steps, arrLen) {
  let maxIndex = Math.min(steps, arrLen), mod = 10 ** 9 + 7;
  let dp = Array(maxIndex).fill(0);
  dp[0] = 1, dp[1] = 1;
  
  for (let i = 2; i <= steps; i++) {
    let dp2 = Array(maxIndex).fill(0);
    for (let j = 0; j < maxIndex; j++) {
      let left = j === 0 ? 0 : dp[j - 1];
      let right = j === maxIndex - 1 ? 0 : dp[j + 1];
      dp2[j] = (left + right + dp[j]) % mod;
    }
    dp = dp2;
  }
  return dp[0];
};

// Three test cases to run function on
console.log(numWays(3, 2)) // 4
console.log(numWays(2, 4)) // 2
console.log(numWays(4, 2)) // 8