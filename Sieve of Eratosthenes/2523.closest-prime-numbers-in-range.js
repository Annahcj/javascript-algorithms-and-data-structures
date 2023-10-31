// 2523. Closest Prime Numbers in Range
// Given two positive integers left and right, find the two integers num1 and num2 such that:
  // left <= nums1 < nums2 <= right .
  // nums1 and nums2 are both prime numbers.
  // nums2 - nums1 is the minimum amongst all other pairs satisfying the above conditions.
// Return the positive integer array ans = [nums1, nums2]. If there are multiple pairs satisfying these conditions, return the one with the minimum nums1 value or [-1, -1] if such numbers do not exist.
// A number greater than 1 is called prime if it is only divisible by 1 and itself.


// Solution: Sieve of Eratosthenes 

// Use the sieve of eratosthenes to find prime numbers.
// How it works: 
  // Eliminate the multiples of each prime number.
  // When we reach a number which is marked as prime, we know that it is definitely prime because it hasn't been covered by the smaller prime numbers.

// Why do we start j at i * i instead of 2 * i? 
  // Because all previous smaller prime factors have already been covered. 
  // e.g: i = 7
  // At this point, the prime factors 2, 3, and 5 have been covered, so 2 * 7, 3 * 7, and 5 * 7 have all been marked as non-prime already, therefore we can start directly at i * i.

// It can be proven that the minimum difference between two consecutive prime numbers is 2. The only smaller difference is 1 for [2,3].
// Therefore, when we find a difference of 1 or 2, we can return immediately.

// n = right
// Time Complexity: O(n log log n) 367ms
// Space Complexity: O(n) 51.1MB
var closestPrimes = function(left, right) {
  let previousPrime = -Infinity, minDiff = Infinity, ans = [-1, -1];
  let isPrime = Array(right + 1).fill(1);
  for (let i = 2; i <= right; i++) {
    if (i >= left && isPrime[i]) {
      let diff = i - previousPrime;
      if (diff <= 2) return [previousPrime, i]; // prime gap of 2
      if (diff < minDiff) {
        minDiff = diff;
        ans = [previousPrime, i];
      }
      previousPrime = i;
    }
    if (isPrime[i]) {
      for (let j = i * i; j <= right; j += i) {
        isPrime[j] = 0;
      }
    }
  }
  return ans;
};

// Two test cases
console.log(closestPrimes(10, 19)) // [11,13]
console.log(closestPrimes(4, 6)) // [-1,-1]