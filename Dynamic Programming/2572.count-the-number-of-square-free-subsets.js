// 2572. Count the Number of Square-Free Subsets
// You are given a positive integer 0-indexed array nums.
// A subset of the array nums is square-free if the product of its elements is a square-free integer.
// A square-free integer is an integer that is divisible by no square number other than 1.
// Return the number of square-free non-empty subsets of the array nums. Since the answer may be too large, return it modulo 109 + 7.
// A non-empty subset of nums is an array that can be obtained by deleting some (possibly none but not all) elements from nums. Two subsets are different if and only if the chosen indices to delete are different.


// Solution: DP w/ Prime Factors 

// Square free numbers are those that don't have duplicate prime factors (e.g: prime factors of 12 are [2, 2, 3] - has duplicate prime factor 2).
// Keep track of a bitmask of prime factors we have used. We can only use each prime factor at most once since using two occurances will make a square.
// We can first filter out numbers which are not square-free.

// Memoize each dp(i, mask), where
  // i = index in nums
  // mask = bitmask of prime factors we have used already
// For each dp(i, mask), we have two options:
  // Take nums[i] (only if all prime factors of nums[i] have not been used yet).
  // Don't take nums[i].

// Count the number of combinations.

// n = length of nums, k = number of prime factors
// Time Complexity: O(n * 2^k) 1565ms
// Space Complexity: O(n * 2^k) 128.8MB
var squareFreeSubsets = function(nums) {
  nums = getSquareFree(nums); 
  let primes = getAllPrimeFactors(nums);
  let n = nums.length, k = primes.length, indexes = new Map();
  for (let i = 0; i < primes.length; i++) indexes.set(primes[i], i);
  let memo = Array(n).fill(0).map(() => Array(1 << k).fill(-1));
  let MOD = BigInt(10 ** 9 + 7);
  return (dp(0, 0) - 1n) % MOD; // -1 for the empty subset
  
  function dp(i, mask) {
    if (i === n) return 1n;
    if (memo[i][mask] !== -1) return memo[i][mask];
    
    let primeFactors = getPrimeFactors(nums[i]);
    let ans = dp(i + 1, mask);
    let newMask = getNewMask(mask, primeFactors);
    if (newMask !== -1) {
      ans = ans + dp(i + 1, newMask);
    }
    return memo[i][mask] = ans;
  }
  
  function getNewMask(mask, primeFactors) {
    let newMask = mask;
    for (let factor of primeFactors) {
      let i = indexes.get(factor);
      if ((mask >> i) & 1) return -1;
      newMask |= (1 << i);
    }
    return newMask;
  }
};

function getSquareFree(nums) {
  let squareFree = [];
  for (let num of nums) {
    if (getPrimeFactors(num) || num === 1) {
      squareFree.push(num);
    }
  }
  return squareFree;
}

function getAllPrimeFactors(nums) {
  let primes = new Set();
  for (let num of nums) {
    let primeFactors = getPrimeFactors(num);
    for (let factor of primeFactors) {
      primes.add(factor);
    }
  }
  return [...primes];
}

function getPrimeFactors(num) {
  let primeFactors = [];
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      primeFactors.push(i);
      num /= i;
    }
    if (num % i === 0) return null; // double prime factor - not square free
  }
  if (num > 1) primeFactors.push(num);
  return primeFactors;
}

// Two test cases
console.log(squareFreeSubsets([3,4,4,5])) // 3
console.log(squareFreeSubsets([1])) // 1