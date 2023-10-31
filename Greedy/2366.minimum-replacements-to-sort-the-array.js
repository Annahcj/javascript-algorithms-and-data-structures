// 2366. Minimum Replacements to Sort the Array
// You are given a 0-indexed integer array nums. In one operation you can replace any element of the array with any two elements that sum to it.
  // For example, consider nums = [5,6,7]. In one operation, we can replace nums[1] with 2 and 4 and convert nums to [5,2,4,7].
// Return the minimum number of operations to make an array that is sorted in non-decreasing order.


// Solution: Greedy 

// Process nums from right to left, starting from nums[n - 2].
// Every time we come across nums[i] > next number, split nums[i] into batches as larger as possible, but smaller than the next number.
  // Number of splits: Math.ceil(nums[i] / next number)
    // e.g: nums[i] = 11, nums[i + 1] = 4. split 11 -> [3,4,4], count of numbers after split = 3
  // Left most number after the splits: Math.floor(nums[i] / number of splits)
    // e.g: split 11 -> [3,4,4], Math.floor(11 / 3) = 3

// Time Complexity: O(n) 60ms
// Space Complexity: O(1) 52.2MB
var minimumReplacement = function(nums) {
  let n = nums.length, operations = 0, next = nums[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] > next) {
      let splitCount = Math.ceil(nums[i] / next);
      operations += splitCount - 1;
      next = Math.floor(nums[i] / splitCount);
    } else {
      next = nums[i];
    }
  }
  return operations;
};

// Two test cases
console.log(minimumReplacement([3,9,3])) // 2
console.log(minimumReplacement([1,2,3,4,5])) // 0