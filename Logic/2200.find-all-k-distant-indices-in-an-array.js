// 2200. Find All K-Distant Indices in an Array
// You are given a 0-indexed integer array nums and two integers key and k. A k-distant index is an index i of nums for which there exists at least one index j such that |i - j| <= k and nums[j] == key.
// Return a list of all k-distant indices sorted in increasing order.


// Solution: Expand From Keys

// When we find a key, check the surroundings distance k both ways.
// To avoid processing indices more than once, start at the last index in the result.

// Time Complexity: O(n) 68ms
// Space Complexity: O(1) (not including output) 44.5MB
var findKDistantIndices = function(nums, key, k) {
  let res = [], n = nums.length;
  for (let i = 0; i < n; i++) {
    if (nums[i] === key) {
      let start = res.length ? res[res.length - 1] + 1 : 0; // start at last index to avoid processing indices more than once
      for (let j = Math.max(start, i - k); j < n && j <= i + k; j++) {
        res.push(j);
      }
    }
  }
  return res;
};

// Two test cases
console.log(findKDistantIndices([3,4,9,1,3,9,5], 9, 1)) // [1,2,3,4,5,6]
console.log(findKDistantIndices([2,2,2,2,2], 2, 2)) // [0,1,2,3,4]