// 2334. Subarray With Elements Greater Than Varying Threshold
// You are given an integer array nums and an integer threshold.
// Find any subarray of nums of length k such that every element in the subarray is greater than threshold / k.
// Return the size of any such subarray. If there is no such subarray, return -1.
// A subarray is a contiguous non-empty sequence of elements within an array.


// Solution: Monotonic Increasing Stack

// Use a monotonic increasing stack to find the closest index with a smaller element in relation to each nums[i].
  // Pop off all larger elements from the top of the stack.
  // We need this in both directions - left and right.

// Take each nums[i] as the smallest element in the subarray.
// The subarray size is determined by the closest smallest element on the left and right of nums[i].

// It is optimal to include as many smaller elements in the subarray as possible because threshold / k will get smaller as the subarray size grows.

// Time Complexity: O(n) 109ms
// Space Complexity: O(n) 56.1MB
var validSubarraySize = function(nums, threshold) {
  let n = nums.length, rightSmallest = Array(n).fill(n);
  let stack = [];
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && nums[stack[stack.length - 1]] >= nums[i]) stack.pop();
    rightSmallest[i] = stack.length ? stack[stack.length - 1] : n;
    stack.push(i);
  }
  stack = [];
  let size = 0;
  for (let i = 0; i < n; i++) {
    while (stack.length && nums[stack[stack.length - 1]] >= nums[i]) stack.pop();
    let leftSmallest = stack.length ? stack[stack.length - 1] : -1;
    let subarraySize = rightSmallest[i] - leftSmallest - 1;
    if (nums[i] > threshold / subarraySize) {
      size = Math.max(size, subarraySize);
    }
    stack.push(i);
  }
  return size > 0 ? size : -1;
};

// Two test cases
console.log(validSubarraySize([1,3,4,3,1], 6)) // 3
console.log(validSubarraySize([6,5,6,5,8], 7)) // 5