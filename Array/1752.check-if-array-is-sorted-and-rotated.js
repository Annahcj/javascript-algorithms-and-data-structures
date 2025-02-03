// 1752. Check if Array Is Sorted and Rotated
// Given an array nums, return true if the array was originally sorted in non-decreasing order, then rotated some number of positions (including zero). Otherwise, return false.
// There may be duplicates in the original array.
// Note: An array A rotated by x positions results in an array B of the same length such that A[i] == B[(i+x) % A.length], where % is the modulo operation.


// Solution: 

// Find the split position where nums[i] > nums[i + 1].
// If the array is valid, there should only be one position where this is true.

// For the array to be valid, 
  // The prefix from index 0 to the split index must be non-decreasing.
  // The suffix from the split index to index n-1 must be non-decreasing.
  // nums[n - 1] must be smaller than or equal to nums[0].

// Time Complexity: O(n) 0ms
// Space Complexity: O(1) 48.87MB
function check(nums) {
  const n = nums.length;
  let j = -1;
  for (let i = 0; i < n - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      j = i + 1;
      break;
    }
  }
  if (j === -1) return true;
  if (nums[n - 1] > nums[0]) return false;
  for (let i = j; i < n - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      return false;
    }
  }
  return true;
};

// Three test cases
console.log(check([3,4,5,1,2])) // true
console.log(check([2,1,3,4])) // false
console.log(check([1,2,3])) // true