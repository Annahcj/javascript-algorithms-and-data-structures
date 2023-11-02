// 2856. Minimum Array Length After Pair Removals
// You are given a 0-indexed sorted array of integers nums.
// You can perform the following operation any number of times:
  // Choose two indices, i and j, where i < j, such that nums[i] < nums[j].
  // Then, remove the elements at indices i and j from nums. The remaining elements retain their original order, and the array is re-indexed.
// Return an integer that denotes the minimum length of nums after performing the operation any number of times (including zero).
// Note that nums is sorted in non-decreasing order.


// Solution: Counting 

// The number of pairs we can take is determined by the maximum occurance in nums.
// If the max count is larger than n / 2, then the number of pairs we can take is: n - maxCount (each max number can be paired with an "other" number)
// If the max count is smaller than n / 2, then we can take every pair: Math.floor(n / 2) 

// Time Complexity: O(n) 86ms
// Space Complexity: O(1) 42.9MB
var minLengthAfterRemovals = function(nums) {
  let n = nums.length, maxCount = 1, count = 1;
  for (let i = 0; i < n; i++) {
    if (i === 0 || nums[i] !== nums[i - 1]) {
      count = 1;
    } else {
      count++;
    }
    maxCount = Math.max(maxCount, count);
  }
  let pairs = maxCount > Math.floor(n / 2) ? n - maxCount : Math.floor(n / 2);
  return n - pairs * 2;
};

// Three test cases
console.log(minLengthAfterRemovals([1,3,4,9])) // 0
console.log(minLengthAfterRemovals([2,3,6,9])) // 0
console.log(minLengthAfterRemovals([1,1,2])) // 1