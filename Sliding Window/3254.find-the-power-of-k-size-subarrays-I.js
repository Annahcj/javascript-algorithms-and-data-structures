// 3254. Find the Power of K-Size Subarrays I
// You are given an array of integers nums of length n and a positive integer k.
// The power of an array is defined as:
  // Its maximum element if all of its elements are consecutive and sorted in ascending order.
  // -1 otherwise.
// You need to find the power of all subarrays of nums of size k.
// Return an integer array results of size n - k + 1, where results[i] is the power of nums[i..(i + k - 1)].


// Solution: Sliding Window

// Maintain a sliding window of size k.
// Keep track of a count of consecutive sorted adjacent pairs in the window.
// If the count is k - 1, then add the last element to the result array.

// n = length of nums
// Time Complexity: O(n) 77ms
// Space Complexity: O(1) 52MB
function resultsArray(nums, k) {
  let n = nums.length;
  if (k === 1 || n === 1) return nums;
  let consec = 0, results = [];
  for (let i = 1; i < n; i++) {
    consec += nums[i] - nums[i - 1] === 1 ? 1 : 0;
    if (i >= k) {
      consec -= nums[i - k + 1] - nums[i - k] === 1 ? 1 : 0;
    }
    if (i >= k - 1) {
      results.push(consec === k - 1 ? nums[i] : -1);
    }
  }
  return results;
};

// Three test cases
console.log(resultsArray([1,2,3,4,3,2,5], 3)) // [3,4,-1,-1,-1]
console.log(resultsArray([2,2,2,2,2], 4)) // [-1,-1]
console.log(resultsArray([3,2,3,2,3,2], 2)) // [-1,3,-1,3,-1]