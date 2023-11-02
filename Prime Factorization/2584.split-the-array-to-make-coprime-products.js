// 2584. Split the Array to Make Coprime Products
// You are given a 0-indexed integer array nums of length n.
// A split at an index i where 0 <= i <= n - 2 is called valid if the product of the first i + 1 elements and the product of the remaining elements are coprime.
  // For example, if nums = [2, 3, 3], then a split at the index i = 0 is valid because 2 and 9 are coprime, while a split at the index i = 1 is not valid because 6 and 3 are not coprime. A split at the index i = 2 is not valid because i == n - 1.
// Return the smallest index i at which the array can be split validly or -1 if there is no such split.
// Two values val1 and val2 are coprime if gcd(val1, val2) == 1 where gcd(val1, val2) is the greatest common divisor of val1 and val2.


// Solution: Common Prime Factors 

// Calculating the product creates numbers that are far too large.
// Instead, get the prime factors of each number in the left and right sides and check if they share any common prime factors.
// Keep the common prime factors in a hashset and remove prime factors when they are no longer shared.

// Time Complexity: O(n sqrt(n)) 514ms
// Space Complexity: O(n sqrt(n)) 54MB
var findValidSplit = function(nums) {
  let n = nums.length, right = {};
  for (let i = 0; i < n; i++) {
    let primeFactorsCount = getPrimeFactors(nums[i]);
    for (let prime in primeFactorsCount) {
      let count = primeFactorsCount[prime];
      right[prime] = (right[prime] || 0) + count;
    }
  }
  let left = {}, common = new Set();
  for (let i = 0; i <= n - 2; i++) {
    let primesFactorsCount = getPrimeFactors(nums[i]);
    for (let prime in primesFactorsCount) {
      let count = primesFactorsCount[prime];
      left[prime] = (left[prime] || 0) + count;
      right[prime] -= count;
      if (right[prime] > 0) common.add(prime);
      else if (right[prime] === 0) common.delete(prime);
    }
    if (common.size === 0) return i;
  }
  return -1;
};

function getPrimeFactors(n) {
  let counts = {};
  for (let x = 2; (x * x) <= n; x++) {
    while (n % x === 0) {
      counts[x] = (counts[x] || 0) + 1;
      n /= x;
    }
  }
  if (n > 1) counts[n] = (counts[n] || 0) + 1;
  return counts;
}

// Two test cases 
console.log(findValidSplit([4,7,8,15,3,5])) // 2
console.log(findValidSplit([4,7,15,8,3,5])) // -1