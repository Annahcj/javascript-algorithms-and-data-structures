// 209. Minimum Size Subarray Sum
// Given an array of positive integers nums and a positive integer target, return the minimal length of a contiguous subarray [numsl, numsl+1, ..., numsr-1, numsr] of which the sum is greater than or equal to target. If there is no such subarray, return 0 instead.


// Solution: Sliding Window

// Time Complexity: O(n) 72ms
// Space Complexity: O(1) 39.8MB
var minSubArrayLen = function(target, nums) {
  let min = Infinity, sum = 0;
  let left = 0;
  for (var right = 0; right < nums.length; right++) {
    sum += nums[right];
    // slide the window across (since all are bigger than 1, we know that if the sum is >= target, following windows will only be larger, so shift it)
    while (sum >= target) {
      // update the smallest window if necessary
      min = Math.min(min, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }
  return min === Infinity ? 0 : min;
};

// Four test cases to run function on
console.log(minSubArrayLen(11, [1,2,3,4,5])) // 3
console.log(minSubArrayLen(7, [2,3,1,2,4,3])) // 2
console.log(minSubArrayLen(4, [1,4,4])) // 1
console.log(minSubArrayLen(11, [1,1,1,1,1,1,1,1])) // 0