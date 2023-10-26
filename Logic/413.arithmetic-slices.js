// 413. Arithmetic Slices
// An integer array is called arithmetic if it consists of at least three elements and if the difference between any two consecutive elements is the same.
  // For example, [1,3,5,7,9], [7,7,7,7], and [3,-1,-5,-9] are arithmetic sequences.
// Given an integer array nums, return the number of arithmetic subarrays of nums.
// A subarray is a contiguous subsequence of the array.


// Solution: Linear Time

// Count the length of arithmetic slices.
// When nums[i] - nums[i - 1] is equal to the current difference
  // Increase the length by 1
  // If the length is bigger than or equal to 3, increment the answer by length - 2.
// Otherwise, reset the difference to the new difference and reset the length to 2.

// e.g: [1,2,3,4]
// count the number of subarrays of different length ending at index i
// when length is 3: [1,2,3], there is only 1 valid lengthed subarray ([1,2,3]) ending at index i.
// when length is 4: [1,2,3,4], there are 2 more valid lengthed subarrays ([2,3,4], [1,2,3,4]).
// when length is 5: [1,2,3,4,5], there are 3 more valid lengthed subarrays ([3,4,5], [2,3,4,5], [1,2,3,4,5]).

// Time Complexity: O(n) 86ms
// Space Complexity: O(1) 41.6MB
var numberOfArithmeticSlices = function(nums) {
  let n = nums.length, ans = 0;
  if (n <= 2) return 0; // edge case

  let diff = nums[1] - nums[0], len = 2;
  for (let i = 2; i < n; i++) {
    if (nums[i] - nums[i - 1] === diff) {
      len++;
      if (len >= 3) ans += len - 2; // number of different lengthed subarrays ending at i
    } else {
      diff = nums[i] - nums[i - 1];
      len = 2;
    }
  }
  return ans;
};

// Two test cases to run function on
console.log(numberOfArithmeticSlices([1,2,3,4])) // 3
console.log(numberOfArithmeticSlices([1])) // 0