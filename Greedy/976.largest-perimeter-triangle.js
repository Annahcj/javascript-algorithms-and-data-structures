// 976. Largest Perimeter Triangle
// Given an integer array nums, return the largest perimeter of a triangle with a non-zero area, formed from three of these lengths. If it is impossible to form any triangle of a non-zero area, return 0.


// Solution: Greedy w/ Sorting

// For three lengths, if the sum of the two smaller lengths are bigger than the largest length, we can form a triangle. (a + b > c)
// Let's refer to the two smaller lengths as "a" and "b", and the larger length as "c".
// For each length c, we want to take the longest and second longest length after length c.
// This is because we want the sum of the two smaller lengths to be as big as possible to be able to cover the longest length.

// Sort nums in asc order.
// Return the first sum where nums[i - 2] + nums[i - 1] > nums[i].

// Time Complexity: O(n log(n)) 186ms
// Space Complexity: O(log(n)) (space for sorting) 45.3MB
var largestPerimeter = function(nums) {
  let n = nums.length;
  nums.sort((a, b) => a - b);
  for (let i = n - 1; i > 1; i--) {
    if (nums[i - 2] + nums[i - 1] > nums[i]) {
      return nums[i - 2] + nums[i - 1] + nums[i];
    }
  }
  return 0;
};

// Three test cases
console.log(largestPerimeter([2,1,2])) // 5
console.log(largestPerimeter([1,2,1])) // 0
console.log(largestPerimeter([1,10,10,100])) // 21