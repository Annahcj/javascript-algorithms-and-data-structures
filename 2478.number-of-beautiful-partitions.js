// 2478. Number of Beautiful Partitions
// You are given a string s that consists of the digits '1' to '9' and two integers k and minLength.
// A partition of s is called beautiful if:
  // s is partitioned into k non-intersecting substrings.
  // Each substring has a length of at least minLength.
  // Each substring starts with a prime digit and ends with a non-prime digit. Prime digits are '2', '3', '5', and '7', and the rest of the digits are non-prime.
// Return the number of beautiful partitions of s. Since the answer may be very large, return it modulo 10^9 + 7.
// A substring is a contiguous sequence of characters within a string.


// Solution: DP & Binary Search

// Memoize each dp(i, k), where
  // i = index in s
  // k = number of substrings left that we need to partition

// Store the indexes of prime numbers in an array nonPrimeIndexes.

// For each dp(i, k),
  // If s[i] is not prime, return 0 ways immediately.
  // We need to try each ending character of the substring, which must be a prime number.
  // Binary search for the minimum index in nonPrimeIndexes where nonPrimeIndexes[index] >= i + minLength - 1
  // Then, try each nonPrime[i] from the binary searched index onwards as the end of the current substring and count the number of ways.

// Time Complexity is O(n^2 * k), but will be less due to optimizations/pruning.
// Space Complexity: O(nk)
var beautifulPartitions = function(s, k, minLength) {
  let n = s.length, nonPrimeIndexes = [];
  for (let i = 0; i < n; i++) {
    if (!isPrime(s[i])) nonPrimeIndexes.push(i);
  }
  let memo = Array(n).fill(0).map(() => Array(k + 1).fill(-1)), MOD = 10 ** 9 + 7;
  return dp(0, k);
  
  function dp(i, k) {
    let remainingLen = n - i;
    if (remainingLen < Math.max(2, minLength) * k) return 0;
    if (i === n) return k === 0 ? 1 : 0;
    if (k === 0) return 0;
    if (memo[i][k] !== -1) return memo[i][k];
    
    if (!isPrime(s[i])) return 0;
    
    let ways = 0;
    let index = binarySearch(i + minLength - 1);
    for (let j = index; j < nonPrimeIndexes.length; j++) {
      ways = (ways + dp(nonPrimeIndexes[j] + 1, k - 1)) % MOD;
    }
    return memo[i][k] = ways;
  }  
  
  function isPrime(num) {
    return ['2', '3', '5', '7'].includes(num);
  }
  
  function binarySearch(min) { // binary search for the smallest index in nonPrimeIndexes where nonPrimeIndexes[index] >= min
    let low = 0, high = nonPrimeIndexes.length - 1;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (nonPrimeIndexes[mid] >= min) high = mid;
      else low = mid + 1;
    }
    return nonPrimeIndexes[low] < min ? nonPrimeIndexes.length : low;
  }
};

// Three test cases
console.log(beautifulPartitions("23542185131", 3, 2)) // 3
console.log(beautifulPartitions("23542185131", 3, 3)) // 1
console.log(beautifulPartitions("3312958", 3, 1)) // 1