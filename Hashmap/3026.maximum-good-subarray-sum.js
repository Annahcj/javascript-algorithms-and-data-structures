// 3026. Maximum Good Subarray Sum
// You are given an array nums of length n and a positive integer k.
// A subarray of nums is called good if the absolute difference between its first and last element is exactly k, in other words, the subarray nums[i..j] is good if |nums[i] - nums[j]| == k.
// Return the maximum sum of a good subarray of nums. If there are no good subarrays, return 0.


// Solution: Hashmap & Prefix Sum

// Take an approach similar to Two Sum.
// For each nums[i], store the minimum prefix sum for each nums[i].
// By recording the minimum prefix sum for a value nums[i], we will exclude the numbers that will make the subarray sum smaller. 
  // e.g: [1,-3,1,2]
    // i = 0 (1): prefix sum = 0
    // i = 1 (-3): prefix sum = 1
    // i = 2 (1): prefix sum = -2
    // For the number 1, we should store the prefix sum -2, not 0.
    // Later, when we create a subarray sum, we will be able to ensure that the subarray sum is the maximum possible.

// For each ending number i, 
  // Get the minimum out of map[nums[i] - k] and map[nums[i] + k]
  // The subarray sum = current prefix sum - min(map[nums[i] - k], map[nums[i] + k])

// Record and return the maximum subarray sum.

// Time Complexity: O(n) 156ms
// Space Complexity: O(n) 77.2MB
var maximumSubarraySum = function(nums, k) {
  let map = new Map(), n = nums.length;
  let sum = 0, ans = -Infinity;
  for (let i = 0; i < n; i++) {
    sum += nums[i];
    if (map.has(nums[i] - k)) {
      ans = Math.max(ans, sum - map.get(nums[i] - k));
    }
    if (map.has(nums[i] + k)) {
      ans = Math.max(ans, sum - map.get(nums[i] + k));
    }
    map.set(nums[i], Math.min(map.get(nums[i]) ?? Infinity, sum - nums[i]));
  }
  return ans > -Infinity ? ans : 0;
};

// Three test cases
console.log(maximumSubarraySum([1,2,3,4,5,6], 1)) // 11
console.log(maximumSubarraySum([-1,3,2,4,5], 3)) // 11
console.log(maximumSubarraySum([-1,-2,-3,-4], 2)) // -6