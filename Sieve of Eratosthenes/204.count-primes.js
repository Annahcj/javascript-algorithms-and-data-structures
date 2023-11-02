// 204. Count Primes
// Given an integer n, return the number of prime numbers that are strictly less than n.


// Solution: Sieve of Eratosthenes

// The logic of the algorithm is to eliminate numbers that are not prime.

// Generate an empty array from 0 to n - 1.
// For e.g: 10 -> [ , , , , , , , , ,  ]
// Loop from 2 to the square root of n (pointer = i)
  // if nums[i] has not been eliminated before [time optimization]
    // loop through all multiples of i (not including i)
      // set nums[j] to -1 (eliminate)
// Loop through nums and get the count of non-eliminated numbers.
// Return the count.

// Time Complexity: O(n + sqrt(n) * log(log(n))) 336ms
// Space Complexity: O(n) 79.5MB
var countPrimes = function(n) {
  let nums = new Array(n);
  for (var i = 2; i <= Math.sqrt(n); i++) {
    if (nums[i] !== -1) {
      for (var j = i * i; j < n; j+=i) {
        nums[j] = -1;
      }
    }
  }
  let ans = 0;
  for (i = 2; i < n; i++) {
    if (nums[i] !== -1) ans++;
  } 
  return ans;
};

// Three test cases to run function on
console.log(countPrimes(10)) // 4
console.log(countPrimes(0)) // 0
console.log(countPrimes(1)) // 0