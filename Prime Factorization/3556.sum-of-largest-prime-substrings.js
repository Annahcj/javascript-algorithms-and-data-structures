// 3556. Sum of Largest Prime Substrings
// Given a string s, find the sum of the 3 largest unique prime numbers that can be formed using any of its substrings.
// Return the sum of the three largest unique prime numbers that can be formed. If fewer than three exist, return the sum of all available primes. If no prime numbers can be formed, return 0.
// Note: Each prime number should be counted only once, even if it appears in multiple substrings. Additionally, when converting a substring to an integer, any leading zeros are ignored.

 
// Solution: Brute Force

// Go through each substring in s and check whether it's a prime number.
// Collect all the prime numbers, then sort and return the sum of the first three.

// n = length of s
// Time Complexity: O(n^2 * sqrt(10^n)) 96ms
// Space Complexity: O(n^2) 59MB
function sumOfLargestPrimes(s) {
  const n = s.length, primes = new Set();
  for (let i = 0; i < n; i++) {
    let num = 0;
    for (let j = i; j < n; j++) {
      num = (num * 10) + Number(s[j]);
      if (isPrime(num)) {
        primes.add(num);
      }
    }
  }
  const firstThreePrimes = [...primes].sort((a, b) => b - a).slice(0, 3);
  return firstThreePrimes.reduce((sum, prime) => sum + prime, 0);
};

function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

// Two test cases
console.log(sumOfLargestPrimes("12234")) // 1469
console.log(sumOfLargestPrimes("111")) // 11