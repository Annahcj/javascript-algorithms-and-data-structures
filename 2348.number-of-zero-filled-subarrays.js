// 2348. Number of Zero-Filled Subarrays
// Given an integer array nums, return the number of subarrays filled with 0.
// A subarray is a contiguous non-empty sequence of elements within an array.


// Solution: Math Logic

// Count the number of zero-filled subarrays ending at each index i.
// Keep track of the number of consective zeros so far.
// At each index i, there are <zeros> number of zero-filled subarrays ending at index i. 

// e.g: [1,0,0,0,1]
// i = 0: zeros = 0, new zero-filled subarrays ending at index 0: []
// i = 1: zeros = 1, new zero-filled subarrays ending at index 1: [[0]]
// i = 2: zeros = 2, new zero-filled subarrays ending at index 2: [[0],[0,0]]
// i = 3: zeros = 3, new zero-filled subarrays ending at index 3: [[0],[0,0],[0,0,0]]
// i = 4: zeros = 0, new zero-filled subarrays ending at index 4: []

// Time Complexity: O(n) 149ms
// Space Complexity: O(1) 53.9MB
var zeroFilledSubarray = function(nums) {
  let zeros = 0, ans = 0;
  for (let num of nums) {
    zeros = num === 0 ? zeros + 1 : 0;
    ans += zeros;
  }
  return ans;
};

// Three test cases
console.log(zeroFilledSubarray([1,3,0,0,2,0,0,4])) // 6
console.log(zeroFilledSubarray([0,0,0,2,0,0])) // 9
console.log(zeroFilledSubarray([2,10,2019])) // 0