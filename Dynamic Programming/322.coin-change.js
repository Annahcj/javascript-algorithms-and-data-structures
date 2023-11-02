// 322. Coin Change
// You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.
// Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.
// You may assume that you have an infinite number of each kind of coin.


// Solution: Bottom-up w/ Dynamic Programming

// Logic:
// We are basically building up an array of numbers from 0 to amount, and constantly updating the shortest way to make a number.
// For e.g: coins = [3,2], amount = 4
// dp = [0, Infinity, Infinity, Infinity, Infinity], we set dp[0] to 0, since it takes zero steps to get to 0.
// loop through dp from 1 to amount,
// i = 1, 
  // loop through coins,
  // coin = 3 -> i is smaller than coin, so we move on (meaning it is impossible to pay)
  // coin = 2 -> i is smaller than coin, so we move on.
// i = 2,
  // coin = 3 -> i is smaller than coin, so we move on.
  // coin = 2 -> i is equal to coin, so we set dp[i] to Math.min(dp[i], dp[i - coin] + 1).
  // (now, dp[i - coin] means whether we have already built up a combination before, in this case, 0. We add one because we are using another coin now)
  // dp is now [0, Infinity, 1, Infinity, Infinity]
// i = 3,
  // coin = 3 -> i is equal to coin, dp[i] = Math.min(dp[i], dp[i - coin] + 1) 
  // coin = 2 -> i is bigger than coin, dp[i] = Math.min(dp[i], dp[i - coin] + 1) (still Infinity)
  // dp is now [0, Infinity, 1, 1, Infinity]
// i = 4,
  // coin = 3 -> i is bigger than coin, dp[i] = Math.min(dp[i], dp[i - coin] + 1) (still Infinity)
  // coin = 2 -> i is bigger than coin, dp[i] = Math.min(dp[i], dp[i - coin] + 1) (2)
  // dp is now [0, Infinity, 1, 1, 2]

// Algorithm:
// Initiate an array dp with the length of amount + 1, fill it with Infinity.
// Set dp[0] to 0 (it takes zero steps to get to 0)
// Loop through from 1 to amount
  // Loop through each coin in coins
    // If i is bigger than or equal to coin, set dp[i] to Math.min(dp[i], dp[i - coin] + 1)
// Return dp[amount], or -1 if it's Infinity.

// n = amount, c = coins.length
// Time Complexity: O(n * c) 112ms
// Space Complexity: O(n) 44.4MB
  var coinChange = function(coins, amount) {
    let dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (var i = 1; i <= amount; i++) {
      for (var coin of coins) {
        if (i >= coin) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
  };
  
  // Seven test cases to run function on
  console.log(coinChange([3,2], 4)) // 2
  console.log(coinChange([2], 1)) // -1
  console.log(coinChange([1,2,5], 11)) // 3
  console.log(coinChange([2], 3)) // -1
  console.log(coinChange([1], 0)) // 0
  console.log(coinChange([1], 1)) // 1
  console.log(coinChange([1], 2)) // 2