// 334. Increasing Triplet Subsequence
// Given an integer array nums, return true if there exists a triple of indices (i, j, k) such that i < j < k and nums[i] < nums[j] < nums[k]. If no such indices exists, return false.


// Solution: DP 

// Loop over each index j,
  // Keep track of the minimum number on the left 
  // Keep track of the maximum number on the right
// If minimum on the left < nums[j] AND nums[j] < maximum on the right, return true.

// Time Complexity: O(n) 156ms
// Space Complexity: O(n) 59.9MB
var increasingTriplet = function(nums) {
  if (nums.length < 3) return false;
  let n = nums.length, maxRight = Array(n).fill(-Infinity); // maxRight[i] = maximum number on the right with index >= i
  maxRight[n - 1] = nums[n - 1];
  for (let k = n - 2; k >= 0; k--) {
    maxRight[k] = Math.max(maxRight[k + 1], nums[k]);
  }
  let minLeft = nums[0];
  for (let j = 1; j < n - 1; j++) {
    if (minLeft < nums[j] && nums[j] < maxRight[j + 1]) return true;
    minLeft = Math.min(minLeft, nums[j]);
  }
  return false;
};

// Three test cases to run function on
console.log(increasingTriplet([1,2,3,4,5])) // true
console.log(increasingTriplet([5,4,3,2,1])) // false
console.log(increasingTriplet([2,1,5,0,4,6])) // true