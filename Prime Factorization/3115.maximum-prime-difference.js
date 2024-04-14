// 3115. Maximum Prime Difference
// You are given an integer array nums.
// Return an integer that is the maximum distance between the indices of two (not necessarily different) prime numbers in nums.


// Solution: Sieve of Eratosthenes

// Use the sieve of eratosthenes to precompute the prime numbers up to the maximum element of nums.
// Go through nums and find the distance between the first and last prime number.

// n = length of nums, m = max(nums[i])
// Time Complexity: O(n + m log(log(m))) 112ms
// Space Complexity: O(m) 67.1MB
var maximumPrimeDifference = function(nums) {
  let max = Math.max(...nums), isPrime = getPrimes(max);
  let n = nums.length, firstIndex = -1, maxDist = 0;
  for (let i = 0; i < n; i++) {
    if (isPrime[nums[i]]) {
      if (firstIndex === -1) firstIndex = i;
      maxDist = Math.max(maxDist, i - firstIndex);
    }
  }
  return maxDist;
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
console.log(maximumPrimeDifference([4,2,9,5,3])) // 3
console.log(maximumPrimeDifference([4,8,2,8])) // 0