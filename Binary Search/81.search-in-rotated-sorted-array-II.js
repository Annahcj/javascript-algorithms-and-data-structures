// 81. Search in Rotated Sorted Array II
// There is an integer array nums sorted in non-decreasing order (not necessarily with distinct values).
// Before being passed to your function, nums is rotated at an unknown pivot index k (0 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,4,4,5,6,6,7] might be rotated at pivot index 5 and become [4,5,6,6,7,0,1,2,4,4].
// Given the array nums after the rotation and an integer target, return true if target is in nums, or false if it is not in nums.
// You must decrease the overall operation steps as much as possible.


// Solution: Modified Binary Search

// The binary search logic can be approached in the same way as the original problem - 33. Search in Rotated Sorted Array
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

// To deal with duplicates, we need to move the two pointers closer incrementally when they are equal to each other and not equal to the target.

// Time Complexity: O(n) worst case, O(log(n)) best case
// Space Complexity: O(1)
var search = function(nums, target) {
  let n = nums.length, low = 0, high = n - 1;
  while (low <= high) {
    // move low and high towards each other while they are equal and not equal to the target
    while (low <= high && nums[low] === nums[high] && nums[low] !== target) {
      low++, high--;
    }
    let mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return true;
    if (subarrayIsCorrect(nums, low, mid - 1, target)) high = mid - 1; // checks if the left subarray has the correct range for target to be present
    else low = mid + 1;
  }
  return false;
};

function subarrayIsCorrect(nums, start, end, target) {
  // move low and high towards each other while they are equal and not equal to the target
  while (start <= end && nums[start] === nums[end] && nums[start] !== target) start++, end--;
  if (start >= end) return nums[start] === target;
  if (nums[start] < nums[end]) {
    return target >= nums[start] && target <= nums[end];
  } else {
    return target >= nums[start] || target <= nums[end];
  }
}

// Two test cases
console.log(search([2,5,6,0,0,1,2], 0)) // true
console.log(search([2,5,6,0,0,1,2], 3)) // false