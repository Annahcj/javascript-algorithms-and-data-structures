// 1416. Restore The Array
// A program was supposed to print an array of integers. The program forgot to print whitespaces and the array is printed as a string of digits s and all we know is that all integers in the array were in the range [1, k] and there are no leading zeros in the array.
// Given the string s and the integer k, return the number of the possible arrays that can be printed as s using the mentioned program. Since the answer may be very large, return it modulo 10^9 + 7.


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(i), where i = index in s.
// For each dp(i), we try every combination of a number starting at s[i].
// We continue to increase i until the number exceeds k. Since k <= 10^9, there will at most 10 digits.

// Time Complexity: O(n log(k)) 189ms
// Space Complexity: O(n) 57.6MB
var numberOfArrays = function(s, k) {
  let n = s.length, memo = Array(n).fill(-1), MOD = 10 ** 9 + 7;
  return dp(0);
  
  function dp(i) {
    if (i === n) return 1;
    if (s[i] === '0') return 0;
    if (memo[i] !== -1) return memo[i];
    
    let ways = 0, num = Number(s[i]), j = i;
    while (j < n && num <= k) {
      ways = (ways + dp(j + 1)) % MOD;
      num = num * 10 + Number(s[++j]);
    }
    return memo[i] = ways;
  }
};


// Solution 2: DP - Iterative

// Same idea as solution 1, but using iteration.

// Time Complexity: O(n log(k)) 116ms
// Space Complexity: O(n) 47.7MB
var numberOfArrays = function(s, k) {
  let n = s.length, dp = Array(n + 1).fill(0), MOD = 10 ** 9 + 7;
  dp[n] = 1;
  for (let i = n - 1; i >= 0; i--) {
    let num = Number(s[i]), j = i;
    while (j < n && num >= 1 && num <= k) {
      dp[i] = (dp[i] + dp[j + 1]) % MOD;
      num = num * 10 + Number(s[++j]);
    }
  }
  return dp[0];
};

// Three test cases
console.log(numberOfArrays("1000", 10000)) // 1
console.log(numberOfArrays("1000", 10)) // 0
console.log(numberOfArrays("1317", 2000)) // 8