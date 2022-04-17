// 813. Largest Sum of Averages
// You are given an integer array nums and an integer k. You can partition the array into at most k non-empty adjacent subarrays. The score of a partition is the sum of the averages of each subarray.
// Note that the partition must use every integer in nums, and that the score is not necessarily an integer.
// Return the maximum score you can achieve of all the possible partitions. Answers within 10-6 of the actual answer will be accepted.


// Solution: Dynamic Programming - Recursion w/ Memoization

// It is always optimal to split nums into as many groups as possible for the maximum sum of averages.
// This means that we will always split nums into k groups.

// From here, we can do dynamic programming to try out all possibilities of splitting nums into k groups.
// Memoize the results to avoid repeated subproblems.
// Recursion base cases:
  // i === n: reached the end of nums, return 0 if k is 0, otherwise return -Infinity because it is invalid.
  // k === 0: return -Infinity since we know that i < n so it is invalid.

// Time Complexity: O(n^2 * k) 86ms
// Space Complexity: O(nk) 44.1MB
var largestSumOfAverages = function(nums, k) {
  let n = nums.length, memo = Array(n).fill(0).map(() => Array(k + 1).fill(-1));
  return dfs(0, k);
  
  function dfs(i, k) {
    if (i === n) return k === 0 ? 0 : -Infinity;
    if (k === 0) return -Infinity;
    if (memo[i][k] !== -1) return memo[i][k];
    
    let ans = 0, sum = 0;
    for (let idx = i; idx < n; idx++) {
      sum += nums[idx];
      let avg = sum / (idx - i + 1);
      ans = Math.max(ans, dfs(idx + 1, k - 1) + avg);
    }
    return memo[i][k] = ans;
  }
};

// Two test cases to run function on
console.log(largestSumOfAverages([9,1,2,3,9], 3)) // 20.00000
console.log(largestSumOfAverages([1,2,3,4,5,6,7], 4)) // 20.50000