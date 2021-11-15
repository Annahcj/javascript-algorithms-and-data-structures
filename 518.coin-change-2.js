// 518. Coin Change 2
// You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.
// Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.
// You may assume that you have an infinite number of each kind of coin.
// The answer is guaranteed to fit into a signed 32-bit integer.


// Solution 1: Recursion w/ Memoization

// Work backwards from amount
// base case 1: if amount is equal to 0, return 1 (one combination)
// base case 2: if amount is smaller than 0 OR idx is equal to coins.length, return 0 (out of bounds)
// base case 3: if memo contains [amount][idx], return memo[amount][idx]
// set memo[amount][idx] to 
  // 1. take the ith coin (amount - coins[idx])
  // 2. skip the ith coin (idx + 1)
// return memo[amount][idx]

// n = coins.length, m = amount
// Time Complexity: O(nm) 128ms
// Space Complexity: O(nm) 55MB 
var change = function(amount, coins) {
  let memo = Array(amount + 1);
  for (var i = 0; i <= amount; i++) memo[i] = Array(coins.length);
  return recurse(amount, 0)
  function recurse(amount, idx) {
    if (amount === 0) return 1;
    if (amount < 0 || idx === coins.length) return 0;
    if (memo[amount][idx] !== undefined) return memo[amount][idx];
                            // take ith coin or                   skip ith coin
    memo[amount][idx] = recurse(amount - coins[idx], idx) + recurse(amount, idx + 1);
    return memo[amount][idx];
  }
};

// Solution 2: Dynamic Programming

// Time Complexity: O(nm) 244ms
// Space Complexity: O(m) 39.8MB
var change = function(amount, coins) {
  let dp = Array(amount + 1).fill(0);
  // there is always one combination for 0
  dp[0] = 1;
  for (var coin of coins) { // loop through coins so that previous computations do not affect current ones
    for (var i = 1; i <= amount; i++) { // loop through from 1 to amount
      dp[i] += (dp[i - coin] || 0); // add number of combinations of i - coin 
    }
  }
  return dp[amount];
};

// Two test cases to run function on
console.log(change(3, [1,2])) // 2
console.log(change(5, [1,2,5])) // 4