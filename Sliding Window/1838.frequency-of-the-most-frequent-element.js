// 1838. Frequency of the Most Frequent Element
// The frequency of an element is the number of times it occurs in an array.
// You are given an integer array nums and an integer k. In one operation, you can choose an index of nums and increment the element at that index by 1.
// Return the maximum possible frequency of an element after performing at most k operations.


// Solution: Sliding Window & Sorting

// First, sort nums in asc order.
// Maintain a sliding window with two pointers (i, j), where the sum of differences of all elements compared to nums[j] is at most k.

// Move index j up incrementally, and update the difference sum every time we increase j: diffSum += (nums[j] - nums[j - 1]) * window size
  // Explanation: Every element will gain a difference of nums[j] - nums[j - 1] since we move j up by 1.
// Move up index i while the difference sum exceeds k.
// Record the maximum window size.

// Time Complexity: O(n log(n)) 188ms
// Space Complexity: O(log(n)) (space for sorting) 56.8MB
var maxFrequency = function(nums, k) {
  nums.sort((a, b) => a - b);
  let n = nums.length, diffSum = 0, maxFreq = 1;
  for (let j = 0, i = 0; j < n; j++) {
    if (j > 0) {
      let diff = nums[j] - nums[j - 1];
      let windowSize = j - i;
      diffSum += diff * windowSize;
    }
    while (diffSum > k) {
      diffSum -= (nums[j] - nums[i]);
      i++;
    }
    maxFreq = Math.max(maxFreq, j - i + 1);
  }
  return maxFreq;
};

// Two test cases
console.log(maxFrequency([1,2,4], 5)) // 3
console.log(maxFrequency([1,4,8,13], 5)) // 2