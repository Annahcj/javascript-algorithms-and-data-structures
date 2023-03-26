// 2601. Prime Subtraction Operation
// You are given a 0-indexed integer array nums of length n.
// You can perform the following operation as many times as you want:
  // Pick an index i that you haven’t picked before, and pick a prime p strictly less than nums[i], then subtract p from nums[i].
// Return true if you can make nums a strictly increasing array using the above operation and false otherwise.
// A strictly increasing array is an array whose each element is strictly greater than its preceding element.


// Solution: Sieve of Eratosthenes & Binary Search

// Use the Sieve of Eratosthenes to find all the prime numbers up to the maximum number.
// Greedily subtract the biggest possible prime number <= nums[i] where nums[i] - prime > nums[i - 1]
  // Use binary search to find this prime.

// Time Complexity: O(n log(n)) 96ms
// Space Complexity: O(n) 48.8MB
var primeSubOperation = function(nums) {
  let primes = getPrimes(Math.max(...nums));
  for (let i = 0; i < nums.length; i++) {
    let low = 0, high = primes.length - 1;
    while (low < high) {
      let mid = Math.ceil((low + high) / 2);
      let isValid = i === 0 ? primes[mid] < nums[i] : primes[mid] < nums[i] && nums[i] - primes[mid] > nums[i - 1];
      if (isValid) {
        low = mid;
      } else {
        high = mid - 1;
      }
    }
    let isValid = i === 0 ? primes[low] < nums[i] : primes[low] < nums[i] && nums[i] - primes[low] > nums[i - 1];
    let toSubtract = isValid ? primes[low] : 0;
    nums[i] -= toSubtract;
    if (i > 0 && nums[i] <= nums[i - 1]) return false;
  }
  return true;
};

function getPrimes(n) {
  let isPrime = Array(n).fill(1); 
  for (let i = 2; i <= n; i++) {
    if (!isPrime[i]) continue;
    for (let j = i * i; j <= n; j += i) {
      isPrime[j] = 0;
    }
  }
  let primes = [];
  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) primes.push(i);
  }
  return primes;
}

// Three test cases
console.log(primeSubOperation([4,9,6,10])) // true
console.log(primeSubOperation([6,8,11,12])) // true
console.log(primeSubOperation([5,8,3])) // false