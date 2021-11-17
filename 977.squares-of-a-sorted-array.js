// 977. Squares of a Sorted Array
// Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.


// Solution: Two Pointers

// Set two pointers on both ends of nums.
// Loop through nums from back to front (pointer = i)
  // If the absolute value of nums[start] is bigger than the absolute value of nums[end]
    // set result[i] to the square of nums[start]
    // increment start
  // Otherwise,
    // set result[i] to the square of nums[end]
    // decrement end
// Return result

// Time Complexity: O(n) 104ms
// Space Complexity: O(1) (not including the output array) 46.1MB
var sortedSquares = function(nums) {
  let n = nums.length;
  let res = Array(n);
  let start = 0, end = n - 1;
  for (var i = n - 1; i >= 0; i--) {
    if (Math.abs(nums[start]) > Math.abs(nums[end])) { // nums[start] is a bigger square than nums[end]
      res[i] = nums[start] * nums[start];
      start++;
    } else { 
      res[i] = nums[end] * nums[end];
      end--;
    }
  }
  return res;
};

// Two test cases to run function on
console.log(sortedSquares([-4,-1,0,3,10])) // [0,1,9,16,100]
console.log(sortedSquares([-7,-3,2,3,11])) // [4,9,9,49,121]