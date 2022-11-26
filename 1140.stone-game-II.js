// 1140. Stone Game II
// Alice and Bob continue their games with piles of stones.  There are a number of piles arranged in a row, and each pile has a positive integer number of stones piles[i].  The objective of the game is to end with the most stones. 
// Alice and Bob take turns, with Alice starting first.  Initially, M = 1.
// On each player's turn, that player can take all the stones in the first X remaining piles, where 1 <= X <= 2M.  Then, we set M = max(M, X).
// The game continues until all the stones have been taken.
// Assuming Alice and Bob play optimally, return the maximum number of stones Alice can get.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(i, m, player), where 
  // i = index in piles
  // m = the current m
  // player = the current player (0 = alice, 1 = bob)

// If player is Alice, we want to maximize the score.
  // Take max(dp(j + 1, Math.max(m, x))).

// If player is Bob, we want to minimize Alice's score.
  // We don't care about how many stones Bob takes.
  // Take min(dp(j + 1, Math.max(m, x)))

// Time Complexity: O(n^3) 253ms
// Space Complexity: O(n^2) 48.5MB
var stoneGameII = function(piles) {
  let n = piles.length, memo = Array(n).fill(0).map(() => Array(n + 1).fill(0).map(() => Array(2).fill(-1)));
  return dp(0, 1, 0);
  
  function dp(i, m, player) {
    if (i === n) return 0;
    if (memo[i][m][player] !== -1) return memo[i][m][player];
    
    let stones = 0, ans = player === 0 ? -Infinity : Infinity;
    for (let j = i; j < Math.min(n, i + m * 2); j++) {
      let x = j - i + 1;
      stones += piles[j];
      if (player === 0) {
        ans = Math.max(ans, stones + dp(j + 1, Math.max(m, x), player ^ 1));
      } else {
        ans = Math.min(ans, dp(j + 1, Math.max(m, x), player ^ 1));
      }
    }
    return memo[i][m][player] = ans;
  }  
};

// Two test cases
console.log(stoneGameII([2,7,9,4,4])) // 10
console.log(stoneGameII([1,2,3,4,5,100])) // 104