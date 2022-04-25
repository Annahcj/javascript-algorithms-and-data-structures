// 1186. Maximum Subarray Sum with One Deletion
// Given an array of integers, return the maximum sum for a non-empty subarray (contiguous elements) with at most one element deletion. In other words, you want to choose a subarray and optionally delete one element from it so that there is still at least one element left and the sum of the remaining elements is maximum possible.
// Note that the subarray needs to be non-empty after deleting one element.


// Solution 1: Dynamic Programming - O(n) space

// Keep track of two state arrays: maxSum and maxSumDeleted.
  // maxSum[i] = maximum subarray sum up to index i
  // maxSumDeleted[i] = maximum subarray sum with at most 1 deletion

// State transitions:
// maxSum[i] = Math.max(maxSum[i - 1] + arr[i], arr[i]):
  // The classic maximum subarray sum -> max(total sum, arr[i])
// maxSumDeleted[i] = Math.max(maxSum[i - 1], maxSumDeleted[i - 1] + arr[i]):
  // max(max subarray sum deleting arr[i], previous maxSumDeleted + arr[i])

// Time Complexity: O(n) 74ms
// Space Complexity: O(n) 48.2MB
var maximumSum = function(arr) {
  let n = arr.length, ans = arr[0];
  let maxSum = Array(n).fill(arr[0]), maxSumDeleted = Array(n).fill(arr[0]);
  for (let i = 1; i < n; i++) {
    maxSum[i] = Math.max(maxSum[i - 1] + arr[i], arr[i]);
    maxSumDeleted[i] = Math.max(maxSum[i - 1], maxSumDeleted[i - 1] + arr[i]);
    ans = Math.max(ans, maxSum[i], maxSumDeleted[i]);
  }
  return ans;
};


// Solution 2: Dynamic Programming - O(1) space

// Since we only need to access the previous states, we can actually just use two variables.
// The only thing is that the order matters, so the state for maxSumDeleted must be calculated before maxSum since maxSumDeleted depends on the previous state of maxSum.

// State transitions:
// maxSumDeleted = Math.max(maxSum, maxSumDeleted + arr[i]): max(remove arr[i], take arr[i])
// maxSum = Math.max(maxSum + arr[i], arr[i]): max(total sum with arr[i], just take arr[i])

// Time Complexity: O(n) 81ms
// Space Complexity: O(1) 45.3MB
var maximumSum = function(arr) {
  let n = arr.length, ans = arr[0];
  let maxSum = arr[0], maxSumDeleted = arr[0];
  for (let i = 1; i < n; i++) {
    maxSumDeleted = Math.max(maxSum, maxSumDeleted + arr[i]); // remove arr[i], take arr[i]
    maxSum = Math.max(maxSum + arr[i], arr[i]); // total sum with arr[i], just arr[i]
    ans = Math.max(ans, maxSum, maxSumDeleted);
  }
  return ans;
};

// Three test cases to run function on
console.log(maximumSum([1,-2,0,3])) // 4
console.log(maximumSum([1,-2,-2,3])) // 3
console.log(maximumSum([-1,-1,-1,-1])) // -1