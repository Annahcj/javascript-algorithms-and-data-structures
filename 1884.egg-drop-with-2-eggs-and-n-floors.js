// 1884. Egg Drop With 2 Eggs and N Floors
// You are given two identical eggs and you have access to a building with n floors labeled from 1 to n.
// You know that there exists a floor f where 0 <= f <= n such that any egg dropped at a floor higher than f will break, and any egg dropped at or below floor f will not break.
// In each move, you may take an unbroken egg and drop it from any floor x (where 1 <= x <= n). If the egg breaks, you can no longer use it. However, if the egg does not break, you may reuse it in future moves.
// Return the minimum number of moves that you need to determine with certainty what the value of f is.


// Solution: Top Down Dynamic Programming

// Try to drop at positions 1 to n,
// Take the max of the two situations:
  // 1. The egg breaks, the other egg must be dropped from bottom up incrementally i - 1 times.
  // 2. Egg doesn't break, call dp(n - i), we still have two eggs.
// Memoize the results of each n (1 to n).

// Time Complexity: O(n^2) 339ms
// Space Complexity: O(n) 42.7MB
var twoEggDrop = function(n) {
  let memo = Array(n + 1).fill(-1);
  return dp(n);
  
  function dp(n) {
    if (n === 0) return 0;
    if (memo[n] !== -1) return memo[n];
    for (let i = 1; i <= n; i++) {
      memo[n] = Math.min(memo[n] === -1 ? n : memo[n], 1 + Math.max(i - 1, dp(n - i)));
    }
    return memo[n];
  }
};

// Three test cases to run function on
console.log(twoEggDrop(2)) // 2
console.log(twoEggDrop(5)) // 3
console.log(twoEggDrop(10)) // 4