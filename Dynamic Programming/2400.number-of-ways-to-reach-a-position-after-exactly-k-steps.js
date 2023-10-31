// 2400. Number of Ways to Reach a Position After Exactly k Steps
// You are given two positive integers startPos and endPos. Initially, you are standing at position startPos on an infinite number line. With one step, you can move either one position to the left, or one position to the right.
// Given a positive integer k, return the number of different ways to reach the position endPos starting from startPos, such that you perform exactly k steps. Since the answer may be very large, return it modulo 10^9 + 7.
// Two ways are considered different if the order of the steps made is not exactly the same.
// Note that the number line includes negative integers.


// Solution: 

// Memoize each dp(pos, k), where
  // pos = the current position on the number line
  // k = the number of moves we have left

// If we reach endPos and we have 0 moves left, return 1 as we have reached it in exactly k moves.
// If the distance from the current position to endPos > k, return 0 as it is impossible to reach endPos.

// Time Complexity: O(nk) 1878ms
// Space Complexity: O(nk) 133.6MB
var numberOfWays = function(startPos, endPos, k) {
  let mod = 10 ** 9 + 7, memo = new Map();
  return dp(startPos, k);

  function dp(pos, k) {
    if (pos === endPos && k === 0) return 1;
    if (Math.abs(pos - endPos) > k) return 0;
    let key = `${pos},${k}`;
    if (memo.has(key)) return memo.get(key);

    let ways = 0;
    ways = (ways + dp(pos - 1, k - 1)) % mod;
    ways = (ways + dp(pos + 1, k - 1)) % mod;
    memo.set(key, ways);
    return ways;
  }  
};

// Two test cases
console.log(numberOfWays(1, 2, 3)) // 3
console.log(numberOfWays(2, 5, 10)) // 0