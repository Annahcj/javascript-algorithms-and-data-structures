// 485. Max Consecutive Ones
// Given a binary array nums, return the maximum number of consecutive 1's in the array.


// Set max to 0, temp to 0
// Loop through each num in nums
  // if num is 1, increment temp by one
  // if num is 0, update max if necessary, then set temp to 0
// Final check, update max if necessary
// Return max

// Time Complexity: O(n) 76ms
// Space Complexity: O(1) 42.1MB
var findMaxConsecutiveOnes = function(nums) {
  let max = 0, temp = 0;
  for (var num of nums) {
    if (num === 1) temp++;
    else {
      max = Math.max(max, temp);
      temp = 0;
    }
  }  
  max = Math.max(max, temp);
  return max;
};

// Two test cases to run function on
console.log(findMaxConsecutiveOnes([1,1,0,1,1,1])) // 3
console.log(findMaxConsecutiveOnes([1,0,1,1,0,1])) // 2