// 3428. Maximum and Minimum Sums of at Most Size K Subsequences
// You are given an integer array nums and a positive integer k. Return the sum of the maximum and minimum elements of all subsequences of nums with at most k elements.
// Since the answer may be very large, return it modulo 10^9 + 7.


// Solution: Combinatorics

// Since the order doesn't matter in subsequences, we can sort nums in asc order.

// Minimum:
  // Every nums[i] is the minimum number in all subsequences with numbers to the right of i.
  // Use the nCr formula to count the number of subsequences where nums[i] is the minimum.
  // Number of subsequences where nums[i] is the minimum = (n-i-1 choose 1) + (n-i-1 choose 2) + (n-i-1 choose 3) + ... < k
// Maximum:
  // The same thing as minimum, except we count subsequences with numbers on the left side.

// Use pascal's triangle to precompute every nCr in O(nk) time complexity.
// Since we only need the sum of results for every row, we only need to store the sum and not the entire row.
// combsSum[i] = sum of all `i choose j` for every j <= min(k - 1, i).

// Time Complexity: O(nk) 2172ms
// Space Complexity: O(n + k) 72.39MB
function minMaxSums(nums, k) {
  const n = nums.length, MOD = 1000000007n;
  let combs = Array(k).fill(0n);
  let combsSum = Array(n).fill(1n);
  combs[0] = 1n;
  for (let i = 1; i < n; i++) {
    let currCombs = Array(k).fill(0n);
    currCombs[0] = 1n, currCombs[i] = 1n;
    for (let j = 1; j <= Math.min(i, k - 1); j++) {
      currCombs[j] = (combs[j - 1] + combs[j]) % MOD;
      combsSum[i] = (combsSum[i] + currCombs[j]) % MOD;
    } 
    combs = currCombs;
  } 
  nums.sort((a, b) => a - b);
  let sum = 0n;
  for (let i = 0; i < n; i++) {
    const subsequences = (combsSum[n - i - 1] + combsSum[i]) % MOD;
    sum = (sum + BigInt(nums[i]) * subsequences) % MOD;
  }
  return Number(sum);
};

// Three test cases
console.log(minMaxSums([1,2,3], 2)) // 24
console.log(minMaxSums([5,0,6], 1)) // 22
console.log(minMaxSums([1,1,1], 2)) // 12