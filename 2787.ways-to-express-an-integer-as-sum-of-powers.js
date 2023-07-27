// 2787. Ways to Express an Integer as Sum of Powers
// Given two positive integers n and x.
// Return the number of ways n can be expressed as the sum of the xth power of unique positive integers, in other words, the number of sets of unique integers [n1, n2, ..., nk] where n = n1x + n2x + ... + nkx.
// Since the result can be very large, return it modulo 10^9 + 7.
// For example, if n = 160 and x = 3, one way to express n is n = 23 + 33 + 53.


// Solution: DP 

// The number of powers will never exceed n.
// Precompute the powers of x.

// Memoize each dp(i, sum), where 
  // i = index in powers
  // sum = the current sum (will never exceed n)

// For each dp(i, sum), we can either take the ith power, or not take it.
// Record the total number of ways for both choices.

// Time Complexity: O(n^2) 498ms
// Space Complexity: O(n^2) 49.8MB
var numberOfWays = function(n, x) {
  let powers = [], num = 1;
  while (num ** x <= n) {
    powers.push(num ** x);
    num++;
  }
  let m = powers.length, MOD = 10 ** 9 + 7;
  let memo = Array(m).fill(0).map(() => Array(n + 1).fill(-1));
  return dp(0, 0);
  
  function dp(i, sum) {
    if (sum === n) return 1;
    if (i === m || sum > n) return 0;
    if (memo[i][sum] !== -1) return memo[i][sum];
    
    let ways = (dp(i + 1, sum) + dp(i + 1, sum + powers[i])) % MOD;
    return memo[i][sum] = ways;
  }
};

// Two test cases
console.log(numberOfWays(10, 2)) // 1
console.log(numberOfWays(4, 1)) // 2