// 2176. Count Equal and Divisible Pairs in an Array
// Given a 0-indexed integer array nums of length n and an integer k, return the number of pairs (i, j) where 0 <= i < j < n, such that nums[i] == nums[j] and (i * j) is divisible by k.


// Solution: GCD

// Group indices together based on value.

// For each group,
// Our goal is to find the common divisors between k and each index i.
// gcd(i, k) gives us exactly the number comprised of divisors that are common between them.
// We can think of gcd(i, k) as the list of common prime divisors, multiplied together as a number.

// k / gcd(i, k) eliminates those divisors that i provides.
// To be able to count how many previous numbers have the remaining divisor, 
// for i, go through every divisor of k and store the count of i % divisor === 0.
// Then we can use the hashmap to get the count in O(1) time.

// Time Complexity: O(n * sqrt(k)) 8ms
// Space Complexity: O(n + sqrt(k)) 58.6MB
function countPairs(nums, k) {
  const n = nums.length, indicesMap = {};
  for (let i = 0; i < n; i++) {
    if (!indicesMap[nums[i]]) {
      indicesMap[nums[i]] = [];
    }
    indicesMap[nums[i]].push(i);
  }
  const divisors = [];
  for (let d = 1; d * d <= k; d++) {
    if (k % d === 0) {
      divisors.push(d);
      if (k / d !== d) {
        divisors.push(k / d);
      }
    }
  }
  let pairs = 0;
  for (let num in indicesMap) {
    const indices = indicesMap[num];
    const count = {};
    for (let i of indices) {
      const rem = k / gcd(i, k);
      pairs += count[rem] || 0;
      for (let d of divisors) {
        if (i % d === 0) {
          count[d] = (count[d] || 0) + 1;
        }
      }
    }
  }
  return pairs;
};

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

// Two test cases
console.log(countPairs([3,1,2,2,2,1,3], 2)) // 4
console.log(countPairs([1,2,3,4], 1)) // 0