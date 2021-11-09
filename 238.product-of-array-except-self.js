// 238. Product of Array Except Self
// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
// You must write an algorithm that runs in O(n) time and without using the division operation.


// Solution 1: Prefix Sum (Two Pass)

// For each i, calculate the product of all items on its left and right.
// For example -> [1,2,3,4]
  // left:  [1,1,2,6]
  // right: [24,12,4,1]

// To get the answer for each i, simply multiply left[i] with right[i].
// The answer will be: [24,12,8,6]

// Time Complexity: O(n) 124ms
// Space Complexity: O(n) 50.7MB
var productExceptSelf = function(nums) {
  let n = nums.length;
  let left = Array(n);
  let right = Array(n);
  left[0] = 1;
  right[n - 1] = 1;
  for (var i = 1; i < n; i++) {
    left[i] = left[i - 1] * nums[i - 1];
  }  
  for (i = n - 2; i >= 0; i--) {
    right[i] = right[i + 1] * nums[i + 1];
  }
  let res = [];
  for (i = 0; i < n; i++) res.push(left[i] * right[i]);
  return res;
};

// Solution 2: Optimized Space

// Perform the left pass as solution 1 -> store in an array 'res'.
// For the right pass, keep track of a variable 'right', initially set to 1.
  // multiply res[i] with right.
  // update right -> multiply by nums[i + 1]
// Now, res will be correctly populated, so we return res.

// Time Complexity: O(n) 116ms
// Space Complexity: O(1) (the output array is O(n)) 50.7MB
var productExceptSelf = function(nums) {
  let n = nums.length;
  let res = Array(n);
  res[0] = 1;
  for (var i = 1; i < n; i++) {
    res[i] = res[i - 1] * nums[i - 1];
  }  
  let right = 1;
  for (i = n - 1; i >= 0; i--) {
    res[i] *= right;
    right *= nums[i];
  }
  return res;
};

// Two test cases to run function on
console.log(productExceptSelf([1,2,3,4])) // [24,12,8,6]
console.log(productExceptSelf([-1,1,0,-3,3])) // [0,0,9,0,0]