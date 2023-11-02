// 446. Arithmetic Slices II - Subsequence
// Given an integer array nums, return the number of all the arithmetic subsequences of nums.
// A sequence of numbers is called arithmetic if it consists of at least three elements and if the difference between any two consecutive elements is the same.
// For example, [1, 3, 5, 7, 9], [7, 7, 7, 7], and [3, -1, -5, -9] are arithmetic sequences.
// For example, [1, 1, 2, 5, 7] is not an arithmetic sequence.
// A subsequence of an array is a sequence that can be formed by removing some elements (possibly none) of the array.
// For example, [2,5,10] is a subsequence of [1,2,1,2,4,1,5,10].
// The test cases are generated so that the answer fits in 32-bit integer.


// Solution: Dynamic Programming

// n = nums.length
// Make a dp array the length of n, filled with hashmaps.
// These n hashmaps will contain the number of subsequences for some difference up to each i-th number

// For example: [1,2,3]
// dp = [
//   {}, {1: 1}, {1: 3, 2: 1}
// ]
// meaning: for num at index 1, there is 1 subsequence with a diff of 1
// and for index 2, there are 3 subsequences with a diff of 1 and 1 subsequence with a diff of 2
// please note that these subsequences are of length 2 and longer, so they are not the number of arithmetic slices.

// Time Complexity: O(n^2) 928ms
// Space Complexity: O(n^2) 80.3MB
var numberOfArithmeticSlices = function(nums) {
  let n = nums.length;
  let dp = Array(n);
  for(let i = 0; i < n; i++) {
    dp[i] = {};
  }
  let ans = 0;
  for (var i = 1; i < n; i++) {
    for (var j = 0; j < i; j++) {
      let diff = nums[i] - nums[j];
      if (diff < -(2 ** 31) || diff > 2 ** 31 - 1) continue;
      let sum = dp[j][diff] || 0;
      let curr = dp[i][diff] || 0;
      dp[i][diff] = curr + sum + 1;
      ans += sum;
    }
  }
  return ans;
};

// Two test cases to run function on
console.log(numberOfArithmeticSlices([2,4,6,8,10])) // 7
console.log(numberOfArithmeticSlices([7,7,7,7,7])) // 16