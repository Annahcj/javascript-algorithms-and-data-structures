// 2862. Maximum Element-Sum of a Complete Subset of Indices
// You are given a 1-indexed array nums of n integers.
// A set of numbers is complete if the product of every pair of its elements is a perfect square.
// For a subset of the indices set {1, 2, ..., n} represented as {i1, i2, ..., ik}, we define its element-sum as: nums[i1] + nums[i2] + ... + nums[ik].
// Return the maximum element-sum of a complete subset of the indices set {1, 2, ..., n}.
// A perfect square is a number that can be expressed as the product of an integer by itself.


// Solution: Prime Factorization

// The product of a pair of elements is a perfect square when the sum of occurances of each prime factor is even.
// All numbers in a subset must have the same odd/even count for each prime factor.
  // Reason why each counts of the prime factors must be the same: 
    // If both numbers have an even count, the sum will be even.
    // If both numbers have an odd count, the sum will be even.
    // If the two numbers are odd and even, the sum will be odd, and thus will not be a perfect square.

// For each index i, count the occurances of prime factors.
// Get the sum of numbers grouped by the same odd/even count of prime factors and return the maximum subset sum.

// Time Complexity: O(n sqrt(n)) 433ms
// Space Complexity: O(n) 85MB
var maximumSum = function(nums) {
  let n = nums.length, sum = {}, maxSum = 0;
  for (let i = 0; i < n; i++) {
    let primeFactorCounts = getPrimeFactorCounts(i + 1);
    let oddEvenCounts = getOddEvenCounts(primeFactorCounts).join(",");
    sum[oddEvenCounts] = (sum[oddEvenCounts] || 0) + nums[i];
    maxSum = Math.max(maxSum, sum[oddEvenCounts]);
  }
  return maxSum;
};

// Get array of factors which have odd occurances in primeFactorCounts
function getOddEvenCounts(primeFactorCounts) {
  let oddEvenCounts = [];
  for (let factor in primeFactorCounts) {
    let isOdd = (primeFactorCounts[factor] || 0) % 2 === 1;
    if (isOdd) oddEvenCounts.push(factor);
  }
  return oddEvenCounts;
}

// Compute map of counts of prime factors
function getPrimeFactorCounts(num) {
  let primeFactorCounts = {};
  for (let x = 2; x * x <= num; x++) {
    while (num % x === 0) {
      num /= x;
      primeFactorCounts[x] = (primeFactorCounts[x] || 0) + 1;
    }
  }
  if (num > 1) {
    primeFactorCounts[num] = (primeFactorCounts[num] || 0) + 1;
  }
  return primeFactorCounts;
}

// Two test cases
console.log(maximumSum([8,7,3,5,7,2,4,9])) // 16
console.log(maximumSum([5,10,3,10,1,13,7,9,4])) // 19