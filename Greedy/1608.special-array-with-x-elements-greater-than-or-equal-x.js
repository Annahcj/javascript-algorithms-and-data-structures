// 1608. Special Array With X Elements Greater Than or Equal X
// You are given an array nums of non-negative integers. nums is considered special if there exists a number x such that there are exactly x numbers in nums that are greater than or equal to x.
// Notice that x does not have to be an element in nums.
// Return x if the array is special, otherwise, return -1. It can be proven that if nums is special, the value for x is unique.


// Solution: Greedy & Sorting

// Sort nums in desc order.
// Traverse through each index i in nums and see if we can take x as i+1.
// This is only possible if all the following are met:
  // i + 1 <= nums[i] (x must be smaller or equal to nums[i] so that the count of numbers greater than or equal is accurate)
  // There is a gap between nums[i] and the next number, or we are at the end of the array (if x <= nums[i + 1], the count is inaccurate because nums[i + 1] also needs to be included in the count, and possibly other numbers on the right)

// Examples:
  // [5,5] -> Pick x = 2
  // [5,5,5,4] -> Pick x = 4
  // [3,2,2,2,2] -> Can't pick any
    // x = 3: There is only 1
    // x = 2: There are 5

// Time Complexity: O(n log(n)) 51ms
// Space Complexity: O(log(n)) (space for sorting) 49MB
var specialArray = function(nums) {
  nums.sort((a, b) => b - a);
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    let x = i + 1;
    if (x <= nums[i] && (i === n - 1 || x > nums[i + 1])) {
      return x;
    }
  }
  return -1;
};

// Three test cases
console.log(specialArray([3,5])) // 2
console.log(specialArray([0,0])) // -1
console.log(specialArray([0,4,3,0,4])) // 3