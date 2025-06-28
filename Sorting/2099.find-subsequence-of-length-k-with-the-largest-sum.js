// 2099. Find Subsequence of Length K With the Largest Sum
// You are given an integer array nums and an integer k. You want to find a subsequence of nums of length k that has the largest sum.
// Return any such subsequence as an integer array of length k.
// A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.


// Solution: Sorting

// For each nums[i], store a reference to the original index in nums, before sorting in desc order.
// Take first k largest numbers and sort by their original index.

// Time Complexity: O(n log(n)) 5ms
// Space Complexity: O(n) 57MB
function maxSubsequence(nums, k) {
  nums = nums.map((num, i) => [num, i]).sort((a, b) => b[0] - a[0]);
  let seq = [];
  for (let i = 0; i < k; i++) {
    seq.push(nums[i]);
  }
  return seq.sort((a, b) => a[1] - b[1]).map(([num]) => num);
};

// Two test cases
console.log(maxSubsequence([2,1,3,3], 2)) // [3,3]
console.log(maxSubsequence([-1,-2,3,4], 3)) // [-1,3,4]