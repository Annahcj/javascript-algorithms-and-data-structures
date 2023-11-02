// 152. Maximum Product Subarray
// Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product.
// It is guaranteed that the answer will fit in a 32-bit integer.
// A subarray is a contiguous subsequence of the array.


// Solution: Keeping Track of Min & Max

// Thoughts:
// If the numbers are all positive, the solution would be very simple, but because of the negative numbers, we now need to keep track of a minimum AND a maximum. 
// If a number is a big negative, it can be turned into a big positive once it encounters another negative number.
// Likewise, the big positive can be flipped into a big negative when it encounters a negative number.
// Three situations:
// Compare each max and min against 
// 1. itself * current number
// 2. the current number
// 3. the opposite (if max, then min, if min, then max) * current number

// Algorithm:
// Keep a currMax, currMin, and global max. Set them all to nums[0] initially.
// Loop through nums from 1 to end (pointer = i)
  // Save currMax in a variable 'prevMax' (because we need to compare currMin to currMax, and currMax may change before we compare it)
  // Set currMax to maximum of (currMax * nums[i], nums[i], currMin * nums[i])
  // Set currMin to minimum of (currMin * nums[i], nums[i], prevMax * nums[i])
  // Set max to maximum of (itself, currMax)
// Return max

// Time Complexity: O(n) 80ms
// Space Complexity: O(1) 40.1MB
  var maxProduct = function(nums) {
    let currMax = nums[0], currMin = nums[0], max = nums[0];
    for (var i = 1; i < nums.length; i++) {
      let prevMax = currMax;
      currMax = Math.max(currMax * nums[i], nums[i], currMin * nums[i]);
      currMin = Math.min(currMin * nums[i], nums[i], prevMax * nums[i]);
      max = Math.max(max, currMax);
    }  
    return max;
  };
  
  // Four test cases to run function on
  console.log(maxProduct([-4,-3,-2])) // 12
  console.log(maxProduct([-2,3,-4])) // 24
  console.log(maxProduct([2,3,-2,4])) // 6
  console.log(maxProduct([-2,0,-1])) // 0