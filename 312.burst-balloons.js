// 312. Burst Balloons
// You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons.
// If you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or i + 1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it.
// Return the maximum coins you can collect by bursting the balloons wisely.


// Solution: Recursion w/ Memoization

// For each value in nums, take it as the last ballon to pop IN the subarray of range [start, end]
// memo[start][end] = maximum score obtained from popping all the balloons in the range of [start, end].

// Time Complexity: O(n^3) 791ms
// Space Complexity: O(n^2) 41.1MB
var maxCoins = function(nums) {
  nums = [1, ...nums, 1]; // pat with 1's so that we don't have to deal with the edge cases
  let n = nums.length;
  let memo = Array(n);
  for (var i = 0; i < n; i++) memo[i] = Array(n);
  return recurse(1, n - 2);

  function recurse(start, end) {
    if (start > end) return 0;
    if (memo[start][end] !== undefined) return memo[start][end];
    let max = 0;
    for (var i = start; i <= end; i++) {
      let currCoins = nums[start - 1] * nums[i] * nums[end + 1];
      let coins = recurse(start, i - 1) + currCoins + recurse(i + 1, end);
      max = Math.max(max, coins);
    }
    memo[start][end] = max;
    return max;
  }
};
 
// Two test cases to run function on
console.log(maxCoins([1,5])) // 10
console.log(maxCoins([3,1,5,8])) // 167