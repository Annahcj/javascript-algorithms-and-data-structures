// 2818. Apply Operations to Maximize Score
// You are given an array nums of n positive integers and an integer k.
// Initially, you start with a score of 1. You have to maximize your score by applying the following operation at most k times:
  // Choose any non-empty subarray nums[l, ..., r] that you haven't chosen previously.
  // Choose an element x of nums[l, ..., r] with the highest prime score. If multiple such elements exist, choose the one with the smallest index.
  // Multiply your score by x.
// Here, nums[l, ..., r] denotes the subarray of nums starting at index l and ending at the index r, both ends being inclusive.
// The prime score of an integer x is equal to the number of distinct prime factors of x. For example, the prime score of 300 is 3 since 300 = 2 * 2 * 3 * 5 * 5.
// Return the maximum possible score after applying at most k operations.
// Since the answer may be large, return it modulo 10^9 + 7.


// Solution: Monotonic Decreasing Stack & Sorting

// The idea: 
  // We want to use the numbers with the greatest value in as many subarrays as possible.
  // However, we can't use a number in a subarray if the subarray has another number with a greater prime score.
  // Therefore, we need to calculate the closest index of greater prime scores on the left and right of each nums[i].
  // Each nums[i] can be part of at most (i - left) * (right - i + 1) subarrays.
    // Left: The closest (on the left) nums[i] with prime score >= the current prime score
    // Right: The closest (on the right) nums[i] with prime score > the current prime score 

// 1. Precompute the prime scores.
// 2. Precompute the indexes of the closest greater prime scores on the left and right of each nums[i].
  // Use a monotonic decreasing stack of prime scores.
  // Two passes to calculate the closest greater prime score on the left and right of each nums[i].
  // Pop elements off the top of the stack while the prime score is larger than the current prime score. When going right to left we pop off equal elements too.
// 3. Sort nums by value in desc order.
// 4. Go through nums ordered by greatest value first, and calculate the score.  

// Note: Modular inverse is used to calculate num^subarrays % MOD.

// Time Complexity: O(n log(n) + n sqrt(n) * log(n)) 587ms
// Space Complexity: O(n) 105.5MB
var maximumScore = function(nums, k) {
  let n = nums.length, primeScores = nums.map((num) => getPrimeScore(num)); // primeScores[i] = prime score for nums[i]
  // calculate closest greater or equal prime score on the left of each nums[i]
  let stack = [], leftGreaterPrimeScore = Array(n).fill(-1);
  for (let i = 0; i < n; i++) {
    while (stack.length && primeScores[stack[stack.length - 1]] < primeScores[i]) {
      stack.pop();
    }
    if (stack.length) leftGreaterPrimeScore[i] = stack[stack.length - 1];
    stack.push(i);
  }
  // calculate closest greater prime score on the right of each nums[i]
  let rightGreaterPrimeScore = Array(n).fill(n);
  stack = [];
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && primeScores[stack[stack.length - 1]] <= primeScores[i]) {
      stack.pop();
    }
    if (stack.length) rightGreaterPrimeScore[i] = stack[stack.length - 1];
    stack.push(i);
  }
  nums = nums.map((num, idx) => [num, idx]).sort((a, b) => b[0] - a[0]); // [nums[i], i]
  let score = 1n, MOD = 1000000007n;
  for (let [num, i] of nums) {
    let leftRange = i - leftGreaterPrimeScore[i], rightRange = rightGreaterPrimeScore[i] - i;
    let subarraysToTake = Math.min(k, leftRange * rightRange);
    if (k === 0) break; 
    score = (score * modPow(BigInt(num), subarraysToTake, MOD)) % MOD;
    k -= subarraysToTake;
  }
  return score;
};

function getPrimeScore(n) {
  let res = new Set();
  for (let x = 2; (x * x) <= n; x++) {
    // loop while n is divisible by x
    while (n % x === 0) {
      res.add(x);
      n /= x;
    }
  }
  if (n > 1) res.add(n);
  return res.size;
}

// returns x^y % mod
function modPow(x, y, mod) { 
  let currPow = x, ans = 1n;
  while (y > 0) {
    if (y & 1) {
      ans = (ans * currPow) % mod;
    }
    currPow = (currPow * currPow) % mod;
    y >>= 1;
  }
  return ans;
}

// Two test cases
console.log(maximumScore([8,3,9,3,8], 2)) // 81
console.log(maximumScore([19,12,14,6,10,18], 3)) // 4788