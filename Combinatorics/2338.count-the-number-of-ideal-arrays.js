// 2338. Count the Number of Ideal Arrays
// You are given two integers n and maxValue, which are used to describe an ideal array.
// A 0-indexed integer array arr of length n is considered ideal if the following conditions hold:
  // Every arr[i] is a value from 1 to maxValue, for 0 <= i < n.
  // Every arr[i] is divisible by arr[i - 1], for 0 < i < n.
// Return the number of distinct ideal arrays of length n. Since the answer may be very large, return it modulo 10^9 + 7.

 
// Solution: DP & Combinatorics

// Use DP to count the number of strictly increasing arrays of length 1 to 14, where every arr[i] is divisible by arr[i - 1].
// dp[i][j] = count of strictly increasing arrays of length i, ending with j.
// Note: The maximum number of distinct elements in a strictly increasing array is 14.
  // Longest array: [1,2,4,8,16,...,8192], length 14.

// For every dp[i][j], count the number of ideal arrays using combinatorics.
// e.g. Turn [1,2,4] into an ideal array of length 5
  // Pick i-1 positions to divide the array into i-1 segments: 1 | 2 | 4
  // 1 | 2 | 4 _ _
  // 1 | 2 _ | 4 _ 
  // 1 _ | 2 | 4 _
  // ...
// Find the number of ways to place i-1 partitions in n-1 positions.
// Stars and bars: (n - 1) choose (i - 1).

// A couple of optimizations:
  // 1. Precomputing divisors. To compute every dp[i][j], we loop through the divisors of every value j, which is repeated 14 times.
  // 2. Accumulating the sum of dp[i][j] for every i, then calculating n choose r on the sum (14 times).
  // 3. Caching the factorial calculation.

// m = maxValue
// Time Complexity: O(m * log(m) * sqrt(m)) 1741ms
// Space Complexity: O(m sqrt(m)) 86.3MB
function idealArrays(n, maxValue) {
  // precompute divisors
  const divisors = Array(maxValue + 1).fill(0).map(() => []);
  for (let i = 1; i <= maxValue; i++) {
    if (i !== 1) {
      divisors[i].push(1);
    }
    for (let d = 2; d * d <= i; d++) {
      if (i % d === 0) {
        divisors[i].push(d);
        if (d !== (i / d)) {
          divisors[i].push(i / d);
        }
      }
    }
  }
  const dp = Array(15).fill(0).map(() => Array(maxValue + 1));
  dp[1] = Array(maxValue + 1).fill(1n);
  const MOD = 1000000007n;
  // count strictly increasing arrays
  for (let i = 2; i <= 14; i++) {
    for (let j = 1; j <= maxValue; j++) {
      dp[i][j] = 0n;
      for (let d of divisors[j]) {
        dp[i][j] = (dp[i][j] + dp[i - 1][d]) % MOD;
      }
    }
  }
  // accumulate the sum of dp[i][j] for every i
  const sum = Array(15).fill(0n);
  for (let i = 1; i <= 14; i++) {
    for (let j = 1; j <= maxValue; j++) {
      sum[i] = (sum[i] + dp[i][j]) % MOD;
    }
  }
  // count combinations for every i
  let ideal = 0n;
  for (let i = 1; i <= 14; i++) {
    ideal = (ideal + sum[i] * nCr(n - 1, i - 1)) % MOD;
  }
  return Number(ideal);
};

function nCr(n, r) {
  return factorial(n) / (factorial(n - r) * factorial(r));
}

const factorialMap = new Map();
function factorial(n) {
  if (factorialMap.has(n)) {
    return factorialMap.get(n);
  }
  let f = BigInt(n);
  let ans = 1n;
  while (f > 1) {
    ans *= f;
    f--;
  }
  factorialMap.set(n, ans);
  return ans;
}

// Two test cases
console.log(idealArrays(2, 5)) // 10
console.log(idealArrays(5, 3)) // 11