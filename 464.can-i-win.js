// 464. Can I Win
// In the "100 game" two players take turns adding, to a running total, any integer from 1 to 10. The player who first causes the running total to reach or exceed 100 wins.
// What if we change the game so that players cannot re-use integers?
// For example, two players might take turns drawing from a common pool of numbers from 1 to 15 without replacement until they reach a total >= 100.
// Given two integers maxChoosableInteger and desiredTotal, return true if the first player to move can force a win, otherwise, return false. Assume both players play optimally.


// Solution 1: DP w/ Bitmasks

// Memoize each dp(mask, player),
  // mask = bitmask of integers that we have taken already
  // player = the current player (0 or 1)

// For each dp(mask, player),
  // Try taking every integer that we haven't taken so far.
  // When player = 0: 
    // If any one choice we take leads to player 0 winning, then return 0.
    // Otherwise, player 0 can never win in this situation so we return 1.
  // When player = 1: 
    // If any one choice we take leads to player 1 winning, then return 1.
    // Otherwise, player 1 can never win in this situation so we return 0.

// n = maxChoosableInteger
// Time Complexity: O(2^n * 2 * n) 4073ms
// Space Complexity: O(2^n * 2) 154.8MB
var canIWin = function(maxChoosableInteger, desiredTotal) {
  let memo = Array(1 << maxChoosableInteger).fill(0).map(() => Array(2).fill(-1));
  let totalSum = maxChoosableInteger * (maxChoosableInteger + 1) / 2; // get sum of 1 + 2 + 3 + .... + maxChoosableInteger
  if (totalSum < desiredTotal) return false;
  return dp(0, 0, 0) === 0;
  
  function dp(mask, player, sum) {
    if (memo[mask][player] !== -1) return memo[mask][player];
    
    for (let i = 0; i < maxChoosableInteger; i++) {
      if ((mask >> i) & 1) continue; // already used integer i
      let newMask = mask | (1 << i);
      if (sum + i + 1 >= desiredTotal || dp(newMask, player ^ 1, sum + i + 1) === player) { // player can win
        return memo[mask][player] = player;
      }
    }
    return memo[mask][player] = player ^ 1; // player can never win in this situation
  }  
};

// Solution 2: DP w/ Bitmasks - Optimized Time & Space

// We don't need to keep track of the current player, because dp(mask) will always yield the same result, it will always be whether the current player wins or not.

// Memoize each dp(mask), where mask = the bitmask of integers that we have taken already.

// For each dp(mask),
  // Try taking every integer that we haven't taken so far.
  // If any choice we take leads to the next player losing (dp(newMask) is false), then we return true.
  // Otherwise, the current player can never win in this situation so we return false.

// n = maxChoosableInteger
// Time Complexity: O(2^n * n) 269ms
// Space Complexity: O(2^n) 52MB
var canIWin = function(maxChoosableInteger, desiredTotal) {
  let memo = Array(1 << maxChoosableInteger).fill(-1);
  let totalSum = maxChoosableInteger * (maxChoosableInteger + 1) / 2; // get sum of 1 + 2 + 3 + .... + maxChoosableInteger
  if (totalSum < desiredTotal) return false; 
  return dp(0, 0);
  
  function dp(mask, sum) {
    if (memo[mask] !== -1) return memo[mask];
    
    for (let i = 0; i < maxChoosableInteger; i++) {
      if ((mask >> i) & 1) continue; // already used integer i
      let newMask = mask | (1 << i);
      if (sum + i + 1 >= desiredTotal || !dp(newMask, sum + i + 1)) { // player can win
        return memo[mask] = true;
      }
    }
    return memo[mask] = false; // player can never win in this situation
  }  
};

// Three test cases
console.log(canIWin(10, 11)) // false
console.log(canIWin(10, 0)) // true
console.log(canIWin(10, 1)) // true