// 2012. Sum of Beauty in the Array
// You are given a 0-indexed integer array nums. For each index i (1 <= i <= nums.length - 2) the beauty of nums[i] equals:
// 2, if nums[j] < nums[i] < nums[k], for all 0 <= j < i and for all i < k <= nums.length - 1.
// 1, if nums[i - 1] < nums[i] < nums[i + 1], and the previous condition is not satisfied.
// 0, if none of the previous conditions holds.
// Return the sum of beauty of all nums[i] where 1 <= i <= nums.length - 2.


// Solution: DP

// Use dynamic programming for two arrays: left and right
// left: left[i] is the maximum number on the left of nums[i]
// right: right[i] is the minimum number on the right of nums[i]

// set count to 0.
// loop through nums from 1 to n - 2 (pointer = i)
  // if nums[i] is bigger than left[i] AND nums[i] is smaller than right[i], increment count by 2.
  // else if nums[i] is bigger than nums[i - 1] AND nums[i] is smaller than nums[i + 1], increment count by 1.
// return count.

// Time Complexity: O(n) 154ms
// Space Complexity: O(n) 58MB
var sumOfBeauties = function(nums) {
  let count = 0, n = nums.length;
  let left = Array(n), max = 0;
  for (var i = 0; i < n; i++) {
    left[i] = max;
    max = Math.max(max, nums[i]);
  }
  let right = Array(n), min = Infinity;
  for (i = n - 1; i >= 0; i--) {
    right[i] = min;
    min = Math.min(min, nums[i]);
  }
  for (i = 1; i < n - 1; i++) {
    let num = nums[i];
    if (num > left[i] && num < right[i]) count += 2;
    else if (num > nums[i - 1] && num < nums[i + 1]) count++;
  }
  return count;
};

// Three test cases to run function on
console.log(sumOfBeauties([1,2,3])) // 2
console.log(sumOfBeauties([2,4,6,4])) // 1
console.log(sumOfBeauties([3,2,1])) // 0