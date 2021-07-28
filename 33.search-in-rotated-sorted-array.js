// 33. Search in Rotated Sorted Array
// There is an integer array nums sorted in ascending order (with distinct values).
// Prior to being passed to your function, nums is rotated at an unknown pivot index k (0 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].
// Given the array nums after the rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.


// Solution 1: Tweaked Binary Search

// Thoughts:
// There can be two scenarios:
// 1: The left half of the array is in correct order (from start to mid point) -> for e.g: [4,5,6,7,1,2,3] 
// 2: The left half of the array is not in correct order -> for e.g: [5,6,1,2,3,4]

// To solve this, we can test for both scenarios, then check for each possibility.
// Scenario 1: using [4,5,6,7,1,2,3]
// If mid (7) is bigger than target and start (4) is bigger than target, we must look in the right part of the array 
// If mid is smaller than target, (since anything to the left of mid is always smaller), we must look at the right part.
// Else, look in left part of array. 

// Scenario 2: using [5,6,1,2,3,4], target = 2
// If mid (1) is smaller than target and start (5) is bigger than target, we must look right.
// Else, look in left part of array.

// Algorithm:
// Set two pointers, start and end.
// Loop while start is smaller than or equal to end
  // Find middle element -> Math.floor((start + end) / 2)
  // If mid element is target, return mid.
  // If left half of array is sorted
    // If mid element is smaller than target OR mid element is bigger than target and start is bigger than target -> set start to mid + 1.
    // Else, set end to mid - 1.
  // Else (left half is not sorted)
    // If mid element is smaller than target AND start is bigger than target -> set start to mid + 1
    // Else, set end to mid - 1.
// If while loop finishes, return -1 (not found).

// Time Complexity: O(log(n)) 72ms
// Space Complexity: O(1) 39.9MB
  var search = function(nums, target) {
    let start = 0, end = nums.length - 1;
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      if (nums[mid] === target) return mid;
      if (nums[start] <= nums[mid]) {
        if (nums[mid] < target || (nums[mid] > target && nums[start] > target)) start = mid + 1;
        else end = mid - 1;
      } else {
        if (nums[mid] < target && nums[start] > target) start = mid + 1;
        else end = mid - 1;
      }
    }  
    return -1;
  };
  
  // Five test cases to run function on
  console.log(search([6,7,8,9,10,11,1,2,3,4,5], 5)) // 3
  console.log(search([5,1,2,3,4], 3)) // 3
  console.log(search([4,5,6,7,0,1,2], 0)) // 4
  console.log(search([4,5,6,7,0,1,2], 3)) // -1
  console.log(search([1], 0)) // -1