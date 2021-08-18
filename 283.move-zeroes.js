// 283. Move Zeroes
// Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
// Note that you must do this in-place without making a copy of the array.


// Solution 1: Two Pointer

// Algorithm: 
// Set idx to 0 (the index of the current first zero) 
// Loop through nums (pointer = i)
  // Loop through nums while idx is smaller than i, find the next zero.
  // If nums[i] is not 0
    // Swap nums[idx] with nums[i]

// Time Complexity: O(n) 84ms
// Space Complexity: O(1) 40.5MB
  var moveZeroes = function(nums) {
    let idx = 0;
    for (var i = 0; i < nums.length; i++) {
      while (nums[idx] !== 0 && idx < i) idx++;
      if (nums[i] !== 0) {
        let temp = nums[idx];
        nums[idx] = nums[i];
        nums[i] = temp;
      }
    }  
    // testing purposes only
    console.log(nums)
  };
  
  // Solution: Optimized Two Pointer
  
  // Instead of looping through to find the next 0, simply increase idx by one.
  // Since we have to make a swap immediately when a non-zero number is found, the next index of a zero will always be the next index.
  
  // Algorithm:
  // Set idx to 0
  // Loop through nums (pointer = i)
    // If nums[i] is not 0
      // swap nums[idx] with nums[i]
      // increment idx
  
  // Time Complexity: O(n) 64ms
  // Space Complexity: O(1) 40.4MB
  var moveZeroes = function(nums) {
    let idx = 0;
    for (var i = 0; i < nums.length; i++) {
      if (nums[i] !== 0) {
        let temp = nums[idx];
        nums[idx] = nums[i];
        nums[i] = temp;
        idx++;
      }
    }  
    // testing purposes only
    console.log(nums)
  };
  
  // Two test cases to run function on
  console.log(moveZeroes([0,1,0,3,12])) // [1,3,12,0,0]
  console.log(moveZeroes([0])) // [0]