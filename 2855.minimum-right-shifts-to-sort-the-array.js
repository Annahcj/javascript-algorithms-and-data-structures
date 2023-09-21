// 2855. Minimum Right Shifts to Sort the Array
// You are given a 0-indexed array nums of length n containing distinct positive integers. Return the minimum number of right shifts required to sort nums and -1 if this is not possible.
// A right shift is defined as shifting the element at index i to index (i + 1) % n, for all indices.


// Solution: Find Rotated Index

// If the array is truly a rotated sorted array, then 
  // 1. There should be exactly one instance where nums[i - 1] > nums[i], or no instances of this which means the array is already perfectly sorted.
  // 2. If there exists nums[i - 1] > nums[i], then the end of the array MUST be smaller than the start of the array (e.g: [3,4,5,1,2])

// Time Complexity: O(n) 59ms
// Space Complexity: O(1) 44MB
var minimumRightShifts = function(nums) {
  let n = nums.length, rotatedIndex = -1;
  for (let i = 1; i < n; i++) {
    if (nums[i - 1] > nums[i]) {
      if (rotatedIndex !== -1) return -1;
      rotatedIndex = i;
    }
  }
  if (rotatedIndex === -1) return 0; // perfectly sorted already
  if (nums[n - 1] > nums[0]) return -1; // end must be greater than start for a rotated sorted array
  return n - rotatedIndex;
};

// Three test cases
console.log(minimumRightShifts([3,4,5,1,2])) // 2
console.log(minimumRightShifts([1,3,5])) // 0
console.log(minimumRightShifts([2,1,4])) // -1