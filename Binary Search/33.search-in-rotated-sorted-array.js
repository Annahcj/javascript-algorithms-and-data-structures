// 33. Search in Rotated Sorted Array
// There is an integer array nums sorted in ascending order (with distinct values).
// Prior to being passed to your function, nums is rotated at an unknown pivot index k (0 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].
// Given the array nums after the rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.


// Solution: Modified Binary Search

// For each mid index, we have three cases:
  // 1. nums[mid] is the target
  // 2. target is in* the left subarray (low, mid - 1)
  // 3. target is in* the right subarray (mid + 1, high)

// To check whether a subarray has the correct number range for the target, we have two cases:
  // 1. The subarray is increasing (nums[start] < nums[end]) e.g: [1,2,3,4]
    // We are within range if the target is between nums[start] and nums[end] - e.g: [1,2,3,4], target = 2
  // 2. The subarray is not increasing (nums[start] > nums[end]) e.g: [6,7,1,2]
    // We are within range if nums[start] >= target OR nums[end] <= target - e.g: [6,7,1,2], target = 7 or 2

// * in the subarray meaning the number range is correct. It may not actually exist in the subarray, but that is the correct subarray if it exists.

// Time Complexity: O(log(n)) 44ms
// Space Complexity: O(1) 42MB
var search = function(nums, target) {
  let n = nums.length, low = 0, high = n - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return mid;
    if (correctSubarray(nums, low, mid - 1, target)) high = mid - 1;
    else low = mid + 1;
  }
  return -1;
};

function correctSubarray(nums, start, end, target) {
  if (start >= end) return nums[start] === target;
  if (nums[start] < nums[end]) {
    return nums[start] <= target && nums[end] >= target;
  } else {
    return nums[end] >= target || nums[start] <= target;
  }
}
  
// Five test cases 
console.log(search([6,7,8,9,10,11,1,2,3,4,5], 5)) // 3
console.log(search([5,1,2,3,4], 3)) // 3
console.log(search([4,5,6,7,0,1,2], 0)) // 4
console.log(search([4,5,6,7,0,1,2], 3)) // -1
console.log(search([1], 0)) // -1