// 189. Rotate Array
// Given an array, rotate the array to the right by k steps, where k is non-negative.


// Solution 1: Extra Array

// Whether we rotate the array k times or k % n times, the result will be the same, so turn k into k % n.
// Keep an extra array 'res', and set each res[i] to nums[(i + n - k) % n]. i + n - k will give us the correct number from the right.
// Copy the numbers in res back to nums.

// Time Complexity: O(n) 96ms
// Space Complexity: O(n) 49.9MB
var rotate = function(nums, k) {
  let n = nums.length, res = Array(n);
  k %= n;
  for (var i = 0; i < n; i++) {
    res[i] = nums[(i + n - k) % n];
  }
  for (i = 0; i < n; i++) nums[i] = res[i];
};

// Solution 2: Reversing

// e.g: [1,2,3,4,5,6,7], k = 3
// 1. Reverse from 0 to n - k - 1: [4,3,2,1,5,6,7]
// 2. Reverse from n - k to n - 1: [4,3,2,1,7,6,5]
// 3. Reverse the entire array: [5,6,7,1,2,3,4]

// Time Complexity: O(n) 112ms
// Space Complexity: O(1) 48.7MB
var rotate = function(nums, k) {
  let n = nums.length;
  k %= n;
  reverse(0, n - k - 1);
  reverse(n - k, n - 1);
  reverse(0, n - 1);
  
  function reverse(start, end) {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++, end--;
    }
  }
};

// Three test cases to run function on
console.log(rotate([1,2,3,4,5,6,7], 3)) // [5,6,7,1,2,3,4]
console.log(rotate([-1,-100,3,99], 2)) // [3,99,-1,-100]
console.log(rotate([1,2], 3)) // [2,1]