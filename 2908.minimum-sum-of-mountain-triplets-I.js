// 2908. Minimum Sum of Mountain Triplets I
// You are given a 0-indexed array nums of integers.
// A triplet of indices (i, j, k) is a mountain if:
  // i < j < k
  // nums[i] < nums[j] and nums[k] < nums[j]
// Return the minimum possible sum of a mountain triplet of nums. If no such triplet exists, return -1.


// Solution: Prefix Minimum

// Anchor at each nums[j] and find the minimum number on the left and right of index i.
// Because we are taking the minimum number on the left and right, we are giving the best chance for a mountain triplet, as well as the minimum possible sum.

// 1. Preprocess the suffix minimum - the minimum number on the right of each index.
// 2. Go through nums and calculate the left minimum number on the fly, while also trying mountain triplets.

// Time Complexity: O(n) 61ms
// Space Complexity: O(n) 44MB
var minimumSum = function(nums) {
  let n = nums.length, minRight = [...nums];
  for (let i = n - 2; i >= 0; i--) {
    minRight[i] = Math.min(minRight[i + 1], nums[i]);
  }
  let minLeft = nums[0], minSum = Infinity;
  for (let i = 1; i < n - 1; i++) {
    if (minLeft < nums[i] && minRight[i + 1] < nums[i]) {
      minSum = Math.min(minSum, nums[i] + minLeft + minRight[i + 1]);
    }
    minLeft = Math.min(minLeft, nums[i]);
  }
  return minSum === Infinity ? -1 : minSum;
};

// Three test cases
console.log(minimumSum([8,6,1,5,3])) // 9
console.log(minimumSum([5,4,8,7,10,2])) // 13
console.log(minimumSum([6,5,4,3,4,5])) // -1