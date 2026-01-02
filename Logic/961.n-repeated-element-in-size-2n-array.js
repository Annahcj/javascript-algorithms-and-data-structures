// 961. N-Repeated Element in Size 2N Array
// You are given an integer array nums with the following properties:
  // nums.length == 2 * n.
  // nums contains n + 1 unique elements.
  // Exactly one element of nums is repeated n times.
// Return the element that is repeated n times.


// Solution: Logic

// The fact that there are n+1 unique elements, and one element repeated n times, means that
// we are bound to at least have one pair of equal numbers either directly adjacent or 2 numbers apart.

// 2 numbers apart: e.g. [5,1,5,2,5,3] or [1,5,2,5,3,5]
// Directly adjacent: e.g. [1,2,5,3,5,5]
// Edge case: n = 4 -> [1,2,3,1]. Return nums[0]

// So we just need to check if nums[i] === nums[i - 1] or nums[i] === nums[i - 2].

// Time Complexity: O(n) 0ms
// Space Complexity: O(1) 57MB
function repeatedNTimes(nums) {
  const n = nums.length;
  for (let i = 1; i < n; i++) {
    if (nums[i] === nums[i - 1] || (i >= 2 && nums[i] === nums[i - 2])) {
      return nums[i];
    } 
  }
  return nums[0];
};

// Three test cases
console.log(repeatedNTimes([1,2,3,3])) // 3
console.log(repeatedNTimes([2,1,2,5,3,2])) // 2
console.log(repeatedNTimes([5,1,5,2,5,3,5,4])) // 5