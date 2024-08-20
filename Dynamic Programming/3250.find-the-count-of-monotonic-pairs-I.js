// 3250.find-the-count-of-monotonic-pairs-I.js
// 3250. Find the Count of Monotonic Pairs I
// You are given an array of positive integers nums of length n.
// We call a pair of non-negative integer arrays (arr1, arr2) monotonic if:
  // The lengths of both arrays are n.
  // arr1 is monotonically non-decreasing, in other words, arr1[0] <= arr1[1] <= ... <= arr1[n - 1].
  // arr2 is monotonically non-increasing, in other words, arr2[0] >= arr2[1] >= ... >= arr2[n - 1].
  // arr1[i] + arr2[i] == nums[i] for all 0 <= i <= n - 1.
// Return the count of monotonic pairs.
// Since the answer may be very large, return it modulo 10^9 + 7.


// Solution: DP

// Memoize each dp(i, lastArr1), where
  // i = index in nums
  // lastArr1 = arr1[i - 1], the last value we took for arr1

// For each dp(i, lastArr1), 
  // We can infer the last value of arr2: nums[i - 1] - lastArr1.
  // Go through every possible value we can use for arr1[i].
  // Since arr1 is non-decreasing, and arr2 is non-increasing, there is a minimum value for arr1 that we can start at to reduce the amount of iterations.
  // e.g. lastArr1 = 5, lastArr2 = 7, nums1[i] = 10
    //  1   9
    //  2   8
    //  3  (7)
    //  4   6
    // (5)  5
    //  6   4
    //  7   3
    //  8   2
    //  9   1
  // The numbers in brackets are the minimum value for arr1[i] and maximum for arr2[i].
  // Take the minimum arr1[i] respecting the maximum needed for arr2[i], meaning the lowest position out of the two.

// n = length of nums, m = max(nums[i])
// Time Complexity: O(n * m^2) 224ms
// Space Complexity: O(nm) 55.4MB
var countOfPairs = function(nums) {
  let n = nums.length, max = Math.max(...nums);
  let memo = Array(n).fill(0).map(() => Array(max + 1).fill(-1));
  let MOD = 1000000007;
  return dp(0, 0);
  
  function dp(i, lastArr1) {
    if (i === n) return 1;
    if (memo[i][lastArr1] !== -1) return memo[i][lastArr1];
    
    let lastArr2 = i === 0 ? max : nums[i - 1] - lastArr1, pairs = 0;
    for (let j = Math.max(lastArr1, nums[i] - lastArr2); j <= nums[i]; j++) {
      pairs = (pairs + dp(i + 1, j, nums[i] - j)) % MOD;
    }
    return memo[i][lastArr1] = pairs;
  }
};

// Two test cases
console.log(countOfPairs([2,3,2])) // 4
console.log(countOfPairs([5,5,5,5])) // 126