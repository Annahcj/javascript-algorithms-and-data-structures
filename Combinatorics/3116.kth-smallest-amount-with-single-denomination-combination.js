// 3116. Kth Smallest Amount With Single Denomination Combination
// You are given an integer array coins representing coins of different denominations and an integer k.
// You have an infinite number of coins of each denomination. However, you are not allowed to combine coins of different denominations.
// Return the kth smallest amount that can be made using these coins.


// Solution: Binary Search & Inclusion-Exclusion Principle

// Binary search for the smallest amount `max`, where the number of distinct multiples >= k.
// To calculate the number of distinct multiples,
  // 1. Enumerate every subset of coins using bitmasks.
  // 2. For each bitmask, get the lcm out of all the coins in the mask.
  // 3. Use the inclusion-exclusion principle to correctly calculate the distinct multiples without duplication.
  // 4. Once we find the lcm, divide `max` by the lcm to get all the common multiples within a subset.
  // LCM explanation: All common multiples within a subset of numbers are guaranteed to be multiples of the lcm. It is not possible to have common multiples that are not multiples of the lcm.
  // Inclusion-exclusion principle: 
    // Include all common multiples for subsets of size 1.
    // Exclude all common multiples for subsets of size 2.
    // Include all common multiples for subsets of size 3.
    // Exclude all common multiples for subsets of size 4.
    // ... and so on.
    // At the end, we end up counting the common multiple only once.

// n = length of coins
// Time Complexity: O(2^n * n * log(max(coins[i]) * k)) 634ms
// Space Complexity: O(n) 57.2MB
var findKthSmallest = function(coins, k) {
  let n = coins.length;
  let maxCoin = Math.max(...coins), max = maxCoin * k;
  let low = 1, high = max;
  while (low < high) {
    let mid = low + Math.floor((high - low) / 2);
    if (getMultiples(mid) >= k) high = mid;
    else low = mid + 1;
  }
  return low;
  
  function getMultiples(max) {
    let totalMultiples = 0;
    for (let mask = 1; mask < (1 << n); mask++) {
      let indices = getOnes(mask, n), lcm = 1;
      for (let i = 0; i < indices.length; i++) {
        lcm = getLcm(lcm, coins[indices[i]]);
      }
      let shouldAdd = indices.length % 2 === 1;
      let multiples = Math.floor(max / lcm);
      // inclusion-exclusion principle
      totalMultiples = shouldAdd ? totalMultiples + multiples : totalMultiples - multiples;
    }
    return totalMultiples;
  }
};

function getOnes(mask, n) {
  let indices = [];
  for (let i = 0; i < n; i++) {
    if ((mask >> i) & 1) {
      indices.push(i);
    }
  }
  return indices;
}

function getLcm(a, b) {
  return (a / gcd(a, b)) * b;
}

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

// Two test cases
console.log(findKthSmallest([3,6,9], 3)) // 9
console.log(findKthSmallest([5,2], 7)) // 12