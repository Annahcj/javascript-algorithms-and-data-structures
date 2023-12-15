// 2958. Length of Longest Subarray With at Most K Frequency
// You are given an integer array nums and an integer k.
// The frequency of an element x is the number of times it occurs in an array.
// An array is called good if the frequency of each element in this array is less than or equal to k.
// Return the length of the longest good subarray of nums.
// A subarray is a contiguous non-empty sequence of elements within an array.


// Solution: Sliding Window

// Maintain a sliding window where frequencies of all elements <= k.
// Move the right pointer up incrementally, and move the left pointer up while the frequency of an element exceeds k.

// Time Complexity: O(n) 138ms
// Space Complexity: O(n) 54.9MB
var maxSubarrayLength = function(nums, k) {
  let n = nums.length, freq = {}, maxLen = 0;
  for (let j = 0, i = 0; j < n; j++) {
    freq[nums[j]] = (freq[nums[j]] || 0) + 1;
    while (freq[nums[j]] > k) {
      freq[nums[i]]--;
      i++;
    }
    maxLen = Math.max(maxLen, j - i + 1);
  }
  return maxLen;
};

// Three test cases
console.log(maxSubarrayLength([1,2,3,1,2,3,1,2], 2)) // 6
console.log(maxSubarrayLength([1,2,1,2,1,2,1,2], 1)) // 2
console.log(maxSubarrayLength([5,5,5,5,5,5,5], 4)) // 4