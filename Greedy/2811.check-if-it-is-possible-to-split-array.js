// 2811. Check if it is Possible to Split Array
// You are given an array nums of length n and an integer m. You need to determine if it is possible to split the array into n non-empty arrays by performing a series of steps.
// In each step, you can select an existing array (which may be the result of previous steps) with a length of at least two and split it into two subarrays, if, for each resulting subarray, at least one of the following holds:
  // The length of the subarray is one, or
  // The sum of elements of the subarray is greater than or equal to m.
// Return true if you can split the given array into n arrays, otherwise return false.
// Note: A subarray is a contiguous non-empty sequence of elements within an array.


// Solution 1: DP 

// Memoize each dp(start, end), where dp(start, end) = whether the subarray (start, end) has a valid split.
// For each dp(start, end), try each split index:
  // Split the subarray into two subarrays (start, i) and (i + 1, end).
  // If both sides are valid (length is one or the sum of elements >= m), check whether dp(start, i) and dp(i + 1, end) is true.

// Time Complexity: O(n^3) 211ms
// Space Complexity: O(n^2) 50.8MB
var canSplitArray = function(nums, m) {
  let n = nums.length, memo = Array(n).fill(0).map(() => Array(n).fill(null));
  let pSum = [0, ...nums];
  for (let i = 1; i <= n; i++) {
    pSum[i] += pSum[i - 1];
  }
  return dp(0, n - 1);
  
  function dp(start, end) {
    if (start === end) return true;
    if (memo[start][end] !== null) return memo[start][end];
    
    let sum = pSum[end + 1] - pSum[start], leftSum = 0;
    for (let i = start; i < end; i++) { // split into (start, i) and (i + 1, end)
      leftSum += nums[i];
      let rightSum = sum - leftSum;
      let leftIsValid = leftSum >= m || i === start;
      let rightIsValid = rightSum >= m || i === end - 1;
      if (!leftIsValid || !rightIsValid) continue;
      if (dp(start, i) && dp(i + 1, end)) {
        return memo[start][end] = true;
      }
    }
    return memo[start][end] = false;
  }
};

// Solution 2: Greedy

// We can keep splitting the array into an array of length 1 and an array with the rest of the elements.
// Ultimately, this will only be possible if there exists a subarray of length 2 with a sum >= m, since all numbers are positive, the subarray sum will only get larger as the subarray size grows.
// Return true if there exists any nums[i] + nums[i + 1] >= m.

// Time Complexity: O(n) 53ms
// Space Complexity: O(1) 43.7MB
var canSplitArray = function(nums, m) {
  let n = nums.length;
  if (n <= 2) return true;
  for (let i = 0; i < n - 1; i++) {
    if (nums[i] + nums[i + 1] >= m) return true;
  }
  return false;
};

// Two test cases
console.log(canSplitArray([2,2,1], 4)) // true
console.log(canSplitArray([2,1,3], 5)) // false