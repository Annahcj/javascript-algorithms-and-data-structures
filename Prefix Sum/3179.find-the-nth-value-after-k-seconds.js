// 3179. Find the N-th Value After K Seconds
// You are given two integers n and k.
// Initially, you start with an array a of n integers where a[i] = 1 for all 0 <= i <= n - 1. After each second, you simultaneously update each element to be the sum of all its preceding elements plus the element itself. For example, after one second, a[0] remains the same, a[1] becomes a[0] + a[1], a[2] becomes a[0] + a[1] + a[2], and so on.
// Return the value of a[n - 1] after k seconds.
// Since the answer may be very large, return it modulo 10^9 + 7.


// Solution: Prefix Sum

// Calculate the prefix sum k times.

// Time Complexity: O(nk) 697ms
// Space Complexity: O(n) 58.2MB
var valueAfterKSeconds = function(n, k) {
  let a = Array(n).fill(1n), MOD = BigInt(10 ** 9 + 7);
  for (let i = 0; i < k; i++) {
    for (let j = 1; j < n; j++) {
      a[j] = (a[j] + a[j - 1]) % MOD;
    }
  }
  return Number(a[n - 1]);
};

// Two test cases
console.log(valueAfterKSeconds(4, 5)) // 56
console.log(valueAfterKSeconds(5, 3)) // 35