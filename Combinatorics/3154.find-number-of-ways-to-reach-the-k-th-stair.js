// 3154. Find Number of Ways to Reach the K-th Stair
// You are given a non-negative integer k. There exists a staircase with an infinite number of stairs, with the lowest stair numbered 0.
// Alice has an integer jump, with an initial value of 0. She starts on stair 1 and wants to reach stair k using any number of operations. If she is on stair i, in one operation she can:
  // Go down to stair i - 1. This operation cannot be used consecutively or on stair 0.
  // Go up to stair i + 2^jump. And then, jump becomes jump + 1.
// Return the total number of ways Alice can reach stair k.
// Note that it is possible that Alice reaches the stair k, and performs some operations to reach the stair k again.


// Solution: Combinatorics

// We can use at most 1 more decrement operation than jumps.
// Go through each amount of jumps until we reach a stair where we don't have enough decrement operations to go back to k.
// For each amount of jumps, we reach a stair `nextStair`, and `nextStair - k` decrement operations to go back to k.

// The decrement operations can be performed in any order as long as they are not consecutive.
// There are a total of `jumps + 1` positions where a decrement operation can be performed.
// Use the n-choose-r formula to calculate the number of combinations of putting r decrement operations in `jumps + 1` different positions.

// e.g. k = 6, and we use 2 jumps
  // 1 -> 2 -> 4 -> 8
  // decrement operations = 8 - 6 = 2
  // positions: 1 _ 2 _ 4 _ 8 _ (4 available positions for 2 decrement operations)
  // 4 choose 2 = 6

// Time Complexity: O(log2(k)) 52ms
// Space Complexity: O(1) 51.1MB
var waysToReachStair = function(k) {
  let jump = 0, stair = 1, ways = k <= 1 ? 1 : 0;
  while (true) {
    let nextStair = stair + 2 ** jump;
    jump++;
    if (nextStair >= k) {
      let decrements = nextStair - k;
      let positions = jump + 1;
      if (decrements > positions) break; // only going to grow larger from here, so we can never go back to k after this
      ways += nCr(positions, decrements);
    }
    stair = nextStair;
  }
  return ways;
};

function nCr(n, r) {
  return factorial(n) / (factorial(n - r) * factorial(r));
}

function factorial(n) {
  let ans = 1;
  while (n > 1) {
    ans *= n;
    n--;
  }
  return ans;
}

// Two test cases
console.log(waysToReachStair(0)) // 2
console.log(waysToReachStair(1)) // 4