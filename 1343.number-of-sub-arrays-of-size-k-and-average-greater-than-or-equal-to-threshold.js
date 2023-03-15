// 1343. Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold
// Given an array of integers arr and two integers k and threshold, return the number of sub-arrays of size k and average greater than or equal to threshold.


// Solution: Sliding Window

// Maintain a sliding window of size k.
// Keep track of the current sum of elements in the window.
// For each window, if the sum / k >= threshold, add to the count.

// Time Complexity: O(n) 79ms
// Space Complexity: O(1) 49.8MB
var numOfSubarrays = function(arr, k, threshold) {
  let n = arr.length, sum = 0, count = 0;
  for (let i = 0; i < n; i++) {
    sum += arr[i];
    if (i >= k) sum -= arr[i - k];
    if (i >= k - 1) count += (sum / k >= threshold) ? 1 : 0;
  }
  return count;
};

// Two test cases
console.log(numOfSubarrays([2,2,2,2,5,5,5,8], 3, 4)) // 3
console.log(numOfSubarrays([11,13,17,23,29,31,7,5,2,3], 3, 5)) // 6