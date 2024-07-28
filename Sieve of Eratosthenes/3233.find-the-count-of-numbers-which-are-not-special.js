// 3233. Find the Count of Numbers Which Are Not Special
// You are given 2 positive integers l and r. For any number x, all positive divisors of x except x are called the proper divisors of x.
// A number is called special if it has exactly 2 proper divisors. For example:
  // The number 4 is special because it has proper divisors 1 and 2.
  // The number 6 is not special because it has proper divisors 1, 2, and 3.
// Return the count of numbers in the range [l, r] that are not special.

 
// Solution: Sieve of Eratosthenes

// A number with 2 proper divisors will always be a square of a prime number.
// This is because prime factors are always the "base" factors of numbers. If the prime factors can't be broken down any further, this means the square of the prime factor also can't have any more divisors.

// 1. Use the sieve of eratosthenes to find all the prime numbers <= sqrt(r).
// 2. Go through each prime number and count the squares <= r.

// n = sqrt(r)
// Time Complexity: O(n log log(n)) 113ms
// Space Complexity: O(n) 56.9MB
function nonSpecialCount(l, r) {
  let sqrt = Math.floor(Math.sqrt(r));
  let isPrime = getPrimes(sqrt);
  let special = 0;
  for (let i = 2; i <= sqrt; i++) {
    if (isPrime[i] && i * i >= l) special++;
  }
  return (r - l + 1) - special;
};
  
function getPrimes(n) {
  let isPrime = Array(n + 1).fill(true); 
  for (let i = 2; i <= n; i++) {
    if (!isPrime[i]) continue;
    for (let j = i * i; j <= n; j += i) { // we start from i * i instead of 2 * i since all smaller primes have already been covered
      isPrime[j] = false;
    }
  }
  isPrime[0] = false, isPrime[1] = false;
  return isPrime;
}

// Two test cases
console.log(nonSpecialCount(5, 7)) // 3
console.log(nonSpecialCount(4, 16)) // 11