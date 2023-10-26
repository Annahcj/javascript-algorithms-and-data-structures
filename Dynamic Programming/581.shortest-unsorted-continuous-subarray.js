// 581. Shortest Unsorted Continuous Subarray


// Solution 1: Sorting

// 1. Create a copy of nums
// 2. Sort the copy
// Find the leftmost and rightmost element where they don't match the original array.
// Return end - start + 1. 

// Time Complexity: O(n log(n)) 108ms
// Space Complexity: O(n) 43.3MB
var findUnsortedSubarray = function(nums) {
  let copy = [...nums];
  copy.sort((a, b) => a - b);
  let start = 0, end = nums.length - 1;
  while ((copy[start] === nums[start] || copy[end] === nums[end]) && start < end) {
    if (copy[start] === nums[start]) start++;
    if (copy[end] === nums[end]) end--;
  }
  return start < end ? end - start + 1 : 0;
};

// Solution 2: Linear Time 

// Create two arrays -> min and max
// min[i] represents the smallest number from i (inclusive) to the end
// max[i] represents the bigger number from 0 to i (inclusive)

// For e.g: for this array [ 2, 6, 4, 8, 10, 9, 15 ],
  // min = [ 2, 4, 4, 8, 9, 9, 15 ]
  // max = [ 2, 6, 6, 8, 10, 10, 15 ]

// Using two pointers -> start and end
// Find the leftmost index where min[start] is not equal to nums[start]
// Also find the rightmost index where max[end] is not equal to nums[end]

// Time Complexity: O(n) 92ms
// Space Complexity: O(n) 44.3MB
var findUnsortedSubarray = function(nums) {
  let n = nums.length;
  let min = Array(n), max = [];
  for (var i = n - 1; i >= 0; i--) {
    let prev = i < n - 1 ? min[i + 1] : Infinity;
    min[i] = Math.min(nums[i], prev);
  }
  for (var i = 0; i < n; i++) {
    let prev = i > 0 ? max[i - 1] : -Infinity;
    max[i] = Math.max(nums[i], prev);
  }
  let start = 0, end = n - 1;
  while ((nums[start] === min[start] || nums[end] === max[end]) && start < end) {
    if (nums[start] === min[start]) start++;
    if (nums[end] === max[end]) end--;
  }
  return start < end ? end - start + 1 : 0;
};

// Three test cases to run function on
console.log(findUnsortedSubarray([2,6,4,8,10,9,15])) // 5
console.log(findUnsortedSubarray([1,2,3,4])) // 0
console.log(findUnsortedSubarray([1])) // 0