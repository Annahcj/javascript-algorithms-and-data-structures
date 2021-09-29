// 325. Maximum Size Subarray Sum Equals k
// Given an integer array nums and an integer k, return the maximum length of a subarray that sums to k. If there isn't one, return 0 instead.


// Solution: Hashmap w/ Prefix Sum

// We can store prefix sum values in a hashmap, then look for the opposite sum (prefixSum - k). 
// For each prefix sum, we store the index of it's first occurance, since we are looking for subarrays as long as possible.

// Time Complexity: O(n) 404MB
// Space Complexity: O(n) 81.5MB
var maxSubArrayLen = function(nums, k) {
  let indices = {0: -1}, prefixSum = 0, max = 0;
  for (var i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    if (indices[prefixSum - k] !== undefined) max = Math.max(max, i - indices[prefixSum - k]);
    if (indices[prefixSum] === undefined) indices[prefixSum] = i;
  }  
  return max;
};

// Two test cases to run function on
console.log(maxSubArrayLen([1,-1,5,-2,3], 3)) // 4
console.log(maxSubArrayLen([-2,-1,2,1], 1)) // 2