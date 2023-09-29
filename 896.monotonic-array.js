// 896. Monotonic Array
// An array is monotonic if it is either monotone increasing or monotone decreasing.
// An array nums is monotone increasing if for all i <= j, nums[i] <= nums[j]. An array nums is monotone decreasing if for all i <= j, nums[i] >= nums[j].
// Given an integer array nums, return true if the given array is monotonic, or false otherwise.


// Solution: 

// Use two flags: isInc and isDec, to determine whether nums is increasing or decreasing.
// Set the flags to false when the condition is not met. Invalid conditions:
  // isInc: nums[i - 1] > nums[i]
  // isDec: nums[i - 1] < nums[i]

// Time Complexity: O(n) 83ms
// Space Complexity: O(1) 52.7MB
var isMonotonic = function(nums) {
  let n = nums.length, isInc = true, isDec = true;
  for (let i = 1; i < n; i++) {
    isInc = nums[i - 1] > nums[i] ? false : isInc;
    isDec = nums[i - 1] < nums[i] ? false : isDec;
  }
  return isInc || isDec;
};

// Three test cases
console.log(isMonotonic([1,2,2,3])) // true
console.log(isMonotonic([6,5,4,4])) // true
console.log(isMonotonic([1,3,2])) // false