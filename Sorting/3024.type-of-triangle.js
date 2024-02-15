// 3024. Type of Triangle
// You are given a 0-indexed integer array nums of size 3 which can form the sides of a triangle.
  // A triangle is called equilateral if it has all sides of equal length.
  // A triangle is called isosceles if it has exactly two sides of equal length.
  // A triangle is called scalene if all its sides are of different lengths.
// Return a string representing the type of triangle that can be formed or "none" if it cannot form a triangle.


// Solution: Sorting

// A triangle can be formed if the sum of the two shorter sides is larger than the longest side.
// If the sum of the two shorter sides are less, the two shorter sides can never touch.
// If the sum of the two shorter sides are equal, it'll become a flat line.

// Otherwise, check how many sides are equal after sorting to determine the triangle type.

// Time Complexity: O(1) 66ms
// Space Complexity: O(1) 50.6MB
var triangleType = function(nums) {
  nums.sort((a, b) => a - b);
  if (nums[0] + nums[1] <= nums[2]) {
    return 'none';
  }
  
  if (nums[0] === nums[1] && nums[1] === nums[2]) {
    return 'equilateral';
  } else if (nums[0] === nums[1] || nums[1] === nums[2]) {
    return 'isosceles';
  } else {
    return 'scalene';
  }
};

// Two test cases
console.log(triangleType([3,3,3])) // "equilateral"
console.log(triangleType([3,4,5])) // "scalene"