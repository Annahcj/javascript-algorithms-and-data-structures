// 2971. Find Polygon With the Largest Perimeter
// You are given an array of positive integers nums of length n.
// A polygon is a closed plane figure that has at least 3 sides. The longest side of a polygon is smaller than the sum of its other sides.
// Conversely, if you have k (k >= 3) positive real numbers a1, a2, a3, ..., ak where a1 <= a2 <= a3 <= ... <= ak and a1 + a2 + a3 + ... + ak-1 > ak, then there always exists a polygon with k sides whose lengths are a1, a2, a3, ..., ak.
// The perimeter of a polygon is the sum of lengths of its sides.
// Return the largest possible perimeter of a polygon whose sides can be formed from nums, or -1 if it is not possible to create a polygon.

 
// Solution: Greedy w/ Sorting

// It's optimal to take as many numbers as possible on the "left side" (the non-longest sides), to give as much chance as possible to be larger than the longest side.
// Sort nums in asc order.
// Find the rightmost nums[i] where sum(nums[0], ..., nums[i - 1]) > nums[i].

// Time Complexity: O(n log(n)) 289ms
// Space Complexity: O(log(n)) (space for sorting) 58.3MB
var largestPerimeter = function(nums) {
  let n = nums.length, leftSum = nums.reduce((acc, num) => acc + num);
  nums.sort((a, b) => a - b);
  for (let i = n - 1; i > 1; i--) {
    leftSum -= nums[i];
    if (leftSum > nums[i]) return leftSum + nums[i];
  }
  return -1;
};

// Three test cases
console.log(largestPerimeter([5,5,5])) // 15
console.log(largestPerimeter([1,12,1,2,5,50,3])) // 12
console.log(largestPerimeter([5,5,50])) // -1