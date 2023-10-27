// 908. Smallest Range I
// You are given an integer array nums and an integer k.
// In one operation, you can choose any index i where 0 <= i < nums.length and change nums[i] to nums[i] + x where x is an integer from the range [-k, k]. You can apply this operation at most once for each index i.
// The score of nums is the difference between the maximum and minimum elements in nums.
// Return the minimum score of nums after applying the mentioned operation at most once for each index in it.


// Solution: Find Min & Max

// Find the minimum and maximum number.
// Bring the minimum and maximum as close together as possible.
// Return (max - k) - (min + k).
// In the case when this results in a negative number, we can return 0 since we can always make them equal.

// Time Complexity: O(n) 64ms
// Space Complexity: O(1) 44.3MB
var smallestRangeI = function(nums, k) {
  let min = nums[0], max = nums[0];
  for (let num of nums) {
    min = Math.min(min, num);
    max = Math.max(max, num);
  }
  return Math.max(0, (max - k) - (min + k));
};

// Two test cases
console.log(smallestRangeI([1], 0)) // 0
console.log(smallestRangeI([0,2,10], 2)) // 6