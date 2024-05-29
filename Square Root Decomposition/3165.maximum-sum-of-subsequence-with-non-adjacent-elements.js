// 3165. Maximum Sum of Subsequence With Non-adjacent Elements
// You are given an array nums consisting of integers. You are also given a 2D array queries, where queries[i] = [pos[i], x[i]].
// For query i, we first set nums[pos[i]] equal to x[i], then we calculate the answer to query i which is the maximum sum of a subsequence of nums where no two adjacent elements are selected.
// Return the sum of the answers to all queries.
// Since the final answer may be very large, return it modulo 10^9 + 7.
// A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.


// Solution: Square Root Decomposition

// Divide nums into sqrt(n) segments of size sqrt(n).
// For each query, 
  // 1. We recalculate the maximum sum for the sqrt segment only 
  // 2. Then recalculate the total maximum sum by combining the results from all sqrt segments.

// For each sqrt segment, we store four maximum sum results:
  // 1. Taking the first and last element.
  // 2. Taking the first and second last element.
  // 3. Taking the second and last element.
  // 4. Taking the second and second last element.
// These can be calculated using dynamic programming, keeping track of the maximum result taking the previous previous element, and previous element.
// At each step, we either take or skip the current element and record the maximum sum for both scenarios.

// When combining sqrt segments, go from left-to-right and keep track of the maximum sum for: 
  // 1. the second last element from the previous segment
  // 2. the last element from the previous segment
// To calculate the current segment's results, take:
  // 1. [Second last element] Maximum of:
    // a. Previous second last result + current first and second last result
    // b. Previous last result + current second and second last result
  // 2. [Last element] Maximum of:
    // a. Previous second last result + current first and last result
    // b. Previous last result + current second and last result

// n = length of nums, m = number of queries
// Time Complexity: O(n sqrt(n) + m sqrt(n)) 433ms
// Space Complexity: O(n) 76.6MB
function maximumSumSubsequence(nums, queries) {
  let n = nums.length, segments = [];  
  let segmentSize = Math.floor(Math.sqrt(n));
  for (let i = 0; i < n; i += segmentSize) {
    segments.push(getMaxSums(nums, i, i + segmentSize - 1));
  }
  let ans = 0n, MOD = 1000000007n;
  for (let [pos, x] of queries) {
    let segmentIndex = Math.floor(pos / segmentSize);
    nums[pos] = x;
    segments[segmentIndex] = getMaxSums(nums, segmentSize * segmentIndex, segmentSize * segmentIndex + segmentSize - 1);
    ans = (ans + BigInt(getTotalSum(segments))) % MOD;
  }
  return Number(ans);
};

function getMaxSums(nums, start, end) {
  let firstAndLast = 0, firstAndSecondLast = 0;
  let secondAndLast = 0, secondAndSecondLast = 0;
  for (let i = start; i <= Math.min(end, nums.length - 1); i++) {
    let newFirstAndLast = Math.max(firstAndSecondLast + nums[i], firstAndLast, nums[i]); // take current nums[i], or skip if that's better
    firstAndSecondLast = Math.max(firstAndSecondLast, firstAndLast); // skip current nums[i]
    firstAndLast = newFirstAndLast;
    
    if (i > start) {
      let newSecondAndLast = Math.max(secondAndSecondLast + nums[i], secondAndLast, nums[i]); // take current nums[i], or skip if that's better
      secondAndSecondLast = Math.max(secondAndSecondLast, secondAndLast); // skip current nums[i]
      secondAndLast = newSecondAndLast;
    }
  }
  return { firstAndLast, firstAndSecondLast, secondAndLast, secondAndSecondLast };
}

function getTotalSum(segments) {
  let prevPrev = 0, prev = 0;
  for (let { firstAndLast, firstAndSecondLast, secondAndLast, secondAndSecondLast } of segments) {
    let newPrevPrev = Math.max(prev + secondAndSecondLast, prevPrev + firstAndSecondLast);
    let newPrev = Math.max(prevPrev + firstAndLast, prev + secondAndLast);
    prevPrev = newPrevPrev;
    prev = newPrev;
  }
  return Math.max(prevPrev, prev);
}

// Two test cases
console.log(maximumSumSubsequence([0,3,3,3,1,-2], [[4,0],[1,0]])) // 9
console.log(maximumSumSubsequence([0,-1], [[0,-5]])) // 0