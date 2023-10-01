// 2873. Maximum Value of an Ordered Triplet I
// You are given a 0-indexed integer array nums.
// Return the maximum value over all triplets of indices (i, j, k) such that i < j < k. If all such triplets have a negative value, return 0.
// The value of a triplet of indices (i, j, k) is equal to (nums[i] - nums[j]) * nums[k].


// Solution 1: Prefix Max

// Summary: Anchor at nums[j].

// We want nums[i] and nums[k] to be as larger as possible, and nums[j] to be as small as possible to ensure the maximum value.

// 1. Calculate the maximum value on the right of each index i: maxRight[i] = maximum value from index i to n - 1
// 2. Go through nums from left to right and take each element as nums[j].
  // Keep track of the maximum value on the left.
  // Get the maximum value on the left and right of nums[j].
  // Record the maximum value.

// Time Complexity: O(n) 63ms
// Space Complexity: O(n) 42.9MB
var maximumTripletValue = function(nums) {
  let n = nums.length, maxRight = [...nums];
  for (let i = n - 2; i >= 0; i--) {
    maxRight[i] = Math.max(nums[i], maxRight[i + 1]);
  }
  let maxLeft = 0, ans = 0;
  for (let j = 0; j < n; j++) {
    if (j > 0 && j < n - 1) {
      ans = Math.max(ans, (maxLeft - nums[j]) * maxRight[j + 1]);
    }
    maxLeft = Math.max(maxLeft, nums[j]);
  }
  return ans;
};

// Solution 2: Constant Space

// Summary: Anchor at nums[k]

// Keep track of the maximum nums[i] - nums[j] so far.

// Time Complexity: O(n) 67ms
// Space Complexity: O(1) 42.4MB
var maximumTripletValue = function(nums) {
  let n = nums.length, maxI = 0, maxDiff = 0, maxValue = 0;
  for (let i = 0; i < n; i++) {
    maxValue = Math.max(maxValue, maxDiff * nums[i]); // take nums[i] as nums[k]
    maxDiff = Math.max(maxDiff, maxI - nums[i]); // take nums[i] as nums[j], maxI as nums[i]
    maxI = Math.max(maxI, nums[i]); // take nums[i] as nums[i]
  }
  return maxValue;
};

// Three test cases
console.log(maximumTripletValue([12,6,1,2,7])) // 77
console.log(maximumTripletValue([1,10,3,4,19])) // 133
console.log(maximumTripletValue([1,2,3])) // 0