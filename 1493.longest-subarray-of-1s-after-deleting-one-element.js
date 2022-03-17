// 1493. Longest Subarray of 1's After Deleting One Element
// Given a binary array nums, you should delete one element from it.
// Return the size of the longest non-empty subarray containing only 1's in the resulting array. Return 0 if there is no such subarray.


// Solution: Sliding Window

// Sliding window with at most one 0.
// When we have two 0s, move up the left pointer until there is only one 0 left.

// Time Complexity: O(n) 111ms
// Space Complexity: O(1) 45.7MB
var longestSubarray = function(nums) {
  let ans = 0, zeros = 0;
  for (let j = 0, i = 0; j < nums.length; j++) {
    if (nums[j] === 0) zeros++;
    while (zeros > 1) {
      if (nums[i] === 0) zeros--;
      i++;
    }
    ans = Math.max(ans, j - i);
  }
  return ans;
};

// Three test cases to run function on
console.log(longestSubarray([1,1,0,1])) // 3
console.log(longestSubarray([0,1,1,1,0,1,1,0,1])) // 5
console.log(longestSubarray([1,1,1])) // 2