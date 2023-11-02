// 2862. Maximum Element-Sum of a Complete Subset of Indices
// You are given a 1-indexed array nums of n integers.
// A set of numbers is complete if the product of every pair of its elements is a perfect square.
// For a subset of the indices set {1, 2, ..., n} represented as {i1, i2, ..., ik}, we define its element-sum as: nums[i1] + nums[i2] + ... + nums[ik].
// Return the maximum element-sum of a complete subset of the indices set {1, 2, ..., n}.
// A perfect square is a number that can be expressed as the product of an integer by itself.


// Solution 1: Prime Factorization

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


// Solution 2: Precompute Perfect Squares

// Building on top of solution 1, we can observe that there is a pattern to the numbers that have the same odd/even prime factor counts. 
// Numbers with the same odd/even prime factor counts will be just perfect squares multiplied by any number "i" that isn't a perfect square.
  // perfect squares: [1,4,9,16,25]
  // 2: [2,8,18,32,50]
  // 3: [3,12,27,48,75]
  // ... and so on for all numbers that aren't a perfect square

// 1. Precompute the perfect squares, where each perfect square represents an index in nums.
// 2. For each index i, take it as the special number to multiply all the perfect squares. 
// Get the sum of numbers at each perfect square index after multiplying by i and record the maximum sum.

// Time Complexity: O(n sqrt(n)) 77ms
// Space Complexity: O(sqrt(n)) 46MB
var maximumSum = function(nums) {
  let n = nums.length, perfectSquares = [];
  for (let i = 1; i * i <= n; i++) {
    perfectSquares.push(i * i);
  }
  let ans = 0;
  for (let i = 0; i < n; i++) { // special number "i" to multiply the perfect squares
    let sum = 0;
    for (let j = 0; j < perfectSquares.length; j++) {
      let index = perfectSquares[j] * (i + 1) - 1;
      if (index >= n) break;
      sum += nums[index];
    }
    ans = Math.max(ans, sum);
  }
  return ans;
};

// Two test cases
console.log(maximumSum([8,7,3,5,7,2,4,9])) // 16
console.log(maximumSum([5,10,3,10,1,13,7,9,4])) // 19