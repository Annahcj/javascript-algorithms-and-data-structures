// 2905. Find Indices With Index and Value Difference II
// You are given a 0-indexed integer array nums having length n, an integer indexDifference, and an integer valueDifference.
// Your task is to find two indices i and j, both in the range [0, n - 1], that satisfy the following conditions:
  // abs(i - j) >= indexDifference, and
  // abs(nums[i] - nums[j]) >= valueDifference
// Return an integer array answer, where answer = [i, j] if there are two such indices, and answer = [-1, -1] otherwise. If there are multiple choices for the two indices, return any of them.
// Note: i and j may be equal.


// Solution: 

// Keep track of the minimum and maximum number on the left of each index i, with a gap of indexDifference.
// If the difference between the minimum and nums[i] or maximum and nums[i] >= valueDifference, then we have found a pair.

// Time Complexity: O(n) 88ms
// Space Complexity: O(1) 52.4MB
var findIndices = function(nums, indexDifference, valueDifference) {
  let n = nums.length, minIndex = 0, maxIndex = 0;
  for (let i = indexDifference; i < n; i++) {
    let numLeft = nums[i - indexDifference];
    if (nums[minIndex] > numLeft) minIndex = i - indexDifference;
    if (nums[maxIndex] < numLeft) maxIndex = i - indexDifference;
    if (Math.abs(nums[minIndex] - nums[i]) >= valueDifference) {
      return [minIndex, i];
    }
    if (Math.abs(nums[maxIndex] - nums[i]) >= valueDifference) {
      return [maxIndex, i];
    }
  }
  return [-1, -1];
};

// Three test cases
console.log(findIndices([5,1,4,1], 2, 4)) // [0,3]
console.log(findIndices([2,1], 0, 0)) // [0,0]
console.log(findIndices([1,2,3], 2, 4)) // [-1,-1]