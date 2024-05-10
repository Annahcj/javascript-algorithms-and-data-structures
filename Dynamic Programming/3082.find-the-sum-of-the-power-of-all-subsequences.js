// 3082. Find the Sum of the Power of All Subsequences
// You are given an integer array nums of length n and a positive integer k.
// The power of an array of integers is defined as the number of subsequences with their sum equal to k.
// Return the sum of power of all subsequences of nums.
// Since the answer may be very large, return it modulo 10^9 + 7.


// Solution 1: DP

// Find each possible subsequence by memoizing each dp(i, sum, count), where
  // i = index in nums
  // sum = the sum of the current subsequence
  // count = the count of numbers in the current subsequence

// For each dp(i, sum, count), we either include nums[i] in the current subsequence, or not.
// If the current sum is equal to k, we want to calculate the number of subsequences that include the current subsequence: (2^(n - count)).
// Precompute the powers of 2 up to 2^n, modulo 1000000007.

// n = length of nums
// Time Complexity: O(n^2 * k) 266ms
// Space Complexity: O(n^2 * k) 78.1MB
var sumOfPower = function(nums, k) {
  let MOD = 1000000007n, n = nums.length;
  let powMod = Array(n), power = 1n;
  for (let i = 0; i < n; i++) {
    powMod[i] = power;
    power = (power * 2n) % MOD;
  }
  let memo = Array(n).fill(0).map(() => Array(k + 1).fill(0).map(() => Array(n + 1).fill(-1)));
  return dp(0, 0, 0);
  
  function dp(i, sum, count) {
    if (sum === k) return powMod[n - count];
    if (sum > k || i === n) return 0n;
    if (memo[i][sum][count] !== -1) return memo[i][sum][count];
    
    return memo[i][sum][count] = (dp(i + 1, sum + nums[i], count + 1) + dp(i + 1, sum, count)) % MOD;
  }  
};


// Solution 2: Simplified DP

// Find each possible subsequence by memoizing each dp(i, sum), where
  // i = index in nums
  // sum = the sum of the current subsequence

// For each dp(i, sum), we either include nums[i] in the current subsequence, or not.
// If the current sum is equal to k, we want to calculate the number of subsequences that include the current subsequence: (2^(all numbers we have no included in the current subsequence)).
  // Calculate all numbers on the right side: 2^(n - i)
  // Plus when we skip a number, multiply the result by 2.
// Precompute the powers of 2 up to 2^n, modulo 1000000007.

// n = length of nums
// Time Complexity: O(nk) 81ms
// Space Complexity: O(nk) 55.1MB
var sumOfPower = function(nums, k) {
  let MOD = 1000000007n, n = nums.length;
  let powMod = Array(n), power = 1n;
  for (let i = 0; i < n; i++) {
    powMod[i] = power;
    power = (power * 2n) % MOD;
  }
  let memo = Array(n).fill(0).map(() => Array(k + 1).fill(-1));
  return dp(0, 0);
  
  function dp(i, sum) {
    if (sum === k) return powMod[n - i];
    if (sum > k || i === n) return 0n;
    if (memo[i][sum] !== -1) return memo[i][sum];
    
    let take = dp(i + 1, sum + nums[i]);
    let skip = 2n * dp(i + 1, sum);
    return memo[i][sum] = (take + skip) % MOD;
  }  
};

// Three test cases
console.log(sumOfPower([1,2,3], 3)) // 6
console.log(sumOfPower([2,3,3], 5)) // 4
console.log(sumOfPower([2,3,3], 7)) // 0