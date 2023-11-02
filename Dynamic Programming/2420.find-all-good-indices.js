// 2420. Find All Good Indices
// You are given a 0-indexed integer array nums of size n and a positive integer k.
// We call an index i in the range k <= i < n - k good if the following conditions are satisfied:
  // The k elements that are just before the index i are in non-increasing order.
  // The k elements that are just after the index i are in non-decreasing order.
// Return an array of all good indices sorted in increasing order.


// Solution: Dynamic Programming 

// Compare adjacent numbers and populate left and right, where
  // left[i] = length of non-increasing subarray ending at index i
  // right[i] = length of non-decreasing subarray starting at index i

// Good indices have left[i - 1] >= k and right[i + 1] >= k.

// Time Complexity: O(n) 272ms
// Space Complexity: O(n) 62.6MB
var goodIndices = function(nums, k) {
  let n = nums.length, left = Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    if (nums[i] <= nums[i - 1]) {
      left[i] += left[i - 1];
    }
  }
  let right = Array(n).fill(1);
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] <= nums[i + 1]) {
      right[i] += right[i + 1];
    }
  }
  
  let goodIndices = [];
  for (let i = k; i < n - k; i++) {
    if (left[i - 1] >= k && right[i + 1] >= k) {
      goodIndices.push(i);
    }
  }
  return goodIndices;
};

// Two test cases
console.log(goodIndices([2,1,1,1,3,4,1,1], 2)) // [2,3]
console.log(goodIndices([2,1,1,2], 2)) // []