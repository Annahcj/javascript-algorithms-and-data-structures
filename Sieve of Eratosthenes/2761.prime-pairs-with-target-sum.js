// 2761. Prime Pairs With Target Sum
// You are given an integer n. We say that two integers x and y form a prime number pair if:
  // 1 <= x <= y <= n
  // x + y == n
  // x and y are prime numbers
// Return the 2D sorted list of prime number pairs [xi, yi]. The list should be sorted in increasing order of xi. If there are no prime number pairs at all, return an empty array.
// Note: A prime number is a natural number greater than 1 with only two factors, itself and 1.


// Solution: Sieve of Eratosthenes & Hashset

// Use the sieve of eratosthenes to find all the prime numbers from 2 to n.
// Then, use a two-sum like approach to find all the pairs of prime numbers that sum up to n.
  // Keep track of numbers we have seen in a hashset.
  // If the hashset contains n - nums[i], then we have a pair.

// Time Complexity: O(n log log n) 1094ms
// Space Complexity: O(n) 131.9MB
var findPrimePairs = function(n) {
  let isPrime = getPrimes(n), primes = [];
  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) primes.push(i);
  }
  let pairs = [], set = new Set();
  for (let i = primes.length - 1; i >= 0; i--) {
    set.add(primes[i]);
    if (set.has(n - primes[i])) {
      pairs.push([primes[i], n - primes[i]]);
    }
  }
  return pairs.reverse();
};

function getPrimes(n) {
  let isPrime = Array(n + 1).fill(true);
  for (let i = 2; i <= n; i++) {
    if (!isPrime[i]) continue;
    for (let j = i * i; j <= n; j += i) { // we start from i * i instead of 2 * i since all smaller primes have already been covered
      isPrime[j] = false;
    }
  }
  return isPrime;
}

// Two test cases
console.log(findPrimePairs(10)) // [[3,7],[5,5]]
console.log(findPrimePairs(2)) // []