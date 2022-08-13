// 396. Rotate Function
// You are given an integer array nums of length n.
// Assume arr_k to be an array obtained by rotating nums by k positions clock-wise. We define the rotation function F on nums as follow:
  // F(k) = 0 * arr_k[0] + 1 * arr_k[1] + ... + (n - 1) * arr_k[n - 1].
// Return the maximum value of F(0), F(1), ..., F(n-1).
// The test cases are generated so that the answer fits in a 32-bit integer.


// Solution: Math Logic

// Separate nums into two parts:
  // 1. nums[0], which goes from 0 value to full value (nums[0] * n)
  // 2. every other element, which all lose one instance of value as they are all shifted left by one place.
// Loop over every i, where i indicates the number of times nums has been rotated.
  // Although we don't physically rotate the array, we simulate that nums[i] is at index 0.

// Time Complexity: O(n) 143ms
// Space Complexity: O(1) 52.3MB
var maxRotateFunction = function(nums) {
  let n = nums.length, sum = 0, value = 0;
  for (let i = 0; i < n; i++) {
    sum += nums[i];
    value += (nums[i] * i);
  }
  
  let ans = value;
  for (let i = 0; i < n - 1; i++) { // rotated i times
    let fullValue = nums[i] * n;
    value = value - sum + fullValue;
    ans = Math.max(ans, value);
  }
  return ans;
};

// Two test cases to run function on
console.log(maxRotateFunction([4,3,2,6])) // 26
console.log(maxRotateFunction([100])) // 0