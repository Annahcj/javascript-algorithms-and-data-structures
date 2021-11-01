// 376. Wiggle Subsequence

// Solution 1: DP

// Keep two arrays ->
  // up: up[i] = longest wiggle sequence up to position i, ending on a higher number
  // down: down[i] = longest wiggle sequence up to position i, ending on a lower number

// Three situations:
  // 1. Number is bigger than the one before it  
    // this is going up, so we take the last 'down' longest sequence and add 1.
  // 2. Number is smaller than the one before it
    // this is going down, so we take the last 'up' longest sequence and add 1.
  // 3. Number is equal to the one before it
    // this can't be included in our longest sequence, so we keep everything the same.

// In the end, return the max of up[nums.length - 1] and down[nums.length - 1]

// Time Complexity: O(n) 76ms
// Space Complexity: O(n) 39MB
var wiggleMaxLength = function(nums) {
  let up = [1];
  let down = [1];
  for (var i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      up[i] = down[i - 1] + 1;
      down[i] = down[i - 1];
    } else if (nums[i] < nums[i - 1]) {
      down[i] = up[i - 1] + 1;
      up[i] = up[i - 1];
    } else {
      down[i] = down[i - 1];
      up[i] = up[i - 1];
    }
  }  
  return Math.max(up[nums.length - 1], down[nums.length - 1]);
};

// Solution 2: DP with Optimized Space

// The same as Solution 1, but instead of keeping two arrays, we can just keep two variables.
// We only have to change the variables in two situations:
  // 1. Going up -> update up to down + 1
  // 2. Going down -> updown down to up + 1
// Return max of up and down

// Time Complexity: O(n) 68ms
// Space Complexity: O(1) 38.8MB
var wiggleMaxLength = function(nums) {
  let up = 1, down = 1;
  for (var i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      up = down + 1;
    } else if (nums[i] < nums[i - 1]) {
      down = up + 1;
    }
  }
  return Math.max(up, down);
};

// Three test cases to run function on
console.log(wiggleMaxLength([1,7,4,9,2,5])) // 6
console.log(wiggleMaxLength([1,17,5,10,13,15,10,5,16,8])) // 7
console.log(wiggleMaxLength([1,2,3,4,5,6,7,8,9])) // 2