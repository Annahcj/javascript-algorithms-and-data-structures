// 977. Squares of a Sorted Array
// Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.


// Solution: Two Pointers

// The square of negative numbers becomes positive, so only the absolute value matters.
// To populate the squares in descending order, 
// Use two pointers at the start and end of nums and take the maximum absolute value out of the two at each step.

// Time Complexity: O(n) 92ms
// Space Complexity: O(1) (excluding output) 55.4MB
var sortedSquares = function(nums) {
  let n = nums.length, squares = Array(n);
  let start = 0, end = n - 1;
  for (let i = n - 1; i >= 0; i--) {
    if (Math.abs(nums[start]) >= Math.abs(nums[end])) {
      squares[i] = nums[start] * nums[start];
      start++;
    } else {
      squares[i] = nums[end] * nums[end];
      end--;
    }
  }
  return squares;
};

// Two test cases 
console.log(sortedSquares([-4,-1,0,3,10])) // [0,1,9,16,100]
console.log(sortedSquares([-7,-3,2,3,11])) // [4,9,9,49,121]