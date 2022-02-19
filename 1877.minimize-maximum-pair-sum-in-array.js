// 1877. Minimize Maximum Pair Sum in Array
// The pair sum of a pair (a,b) is equal to a + b. The maximum pair sum is the largest pair sum in a list of pairs.
  // For example, if we have pairs (1,5), (2,3), and (4,4), the maximum pair sum would be max(1+5, 2+3, 4+4) = max(6, 5, 8) = 8.
// Given an array nums of even length n, pair up the elements of nums into n / 2 pairs such that:
  // Each element of nums is in exactly one pair, and
  // The maximum pair sum is minimized.
// Return the minimized maximum pair sum after optimally pairing up the elements.


// Solution: Sorting & Two Pointers

// It's always optimal to get the smallest max sum by summing the smallest + biggest.
// e.g: [1,5,5,8]
// 1 + 8 = 9
// 5 + 5 = 10
// If we want to get a smaller sum: 1 + 5 = 6, then 5 is left with 8, creating a bigger sum.
// So min + max is always the best option.

// Time Complexity: O(n log(n)) 324ms
// Space Complexity: O(log(n)) (space for sorting) 57.3MB
var minPairSum = function(nums) {
  nums.sort((a, b) => a - b);
  let ans = 0;
  let start = 0, end = nums.length - 1;
  while (start < end) {
    ans = Math.max(ans, nums[start] + nums[end]);
    start++, end--;
  }
  return ans;
};

// Two test cases to run function on
console.log(minPairSum([3,5,2,3])) // 7
console.log(minPairSum([3,5,4,2,4,6])) // 8