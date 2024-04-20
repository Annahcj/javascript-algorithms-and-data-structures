// 3105. Longest Strictly Increasing or Strictly Decreasing Subarray
// You are given an array of integers nums. Return the length of the longest subarray of nums which is either strictly increasing or strictly decreasing.


// Solution: Counting

// Keep track of the running count of consecutively increasing and decreasing numbers.
// Reset the counts once it is no longer increasing or decreasing.

// Time Complexity: O(n) 43ms
// Space Complexity: O(1) 50.1MB
var longestMonotonicSubarray = function(nums) {
  let n = nums.length, inc = 1, dec = 1, ans = 1;
  for (let i = 1; i < n; i++) {
    inc = nums[i - 1] < nums[i] ? inc + 1 : 1;
    dec = nums[i - 1] > nums[i] ? dec + 1 : 1;
    ans = Math.max(ans, inc, dec);
  }
  return ans;
};

// Three test cases
console.log(longestMonotonicSubarray([1,4,3,3,2])) // 2
console.log(longestMonotonicSubarray([3,3,3,3])) // 1
console.log(longestMonotonicSubarray([3,2,1])) // 3