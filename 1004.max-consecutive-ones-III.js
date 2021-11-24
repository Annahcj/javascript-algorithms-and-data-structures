// 1004. Max Consecutive Ones III
// Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.


// Solution: Sliding Window

// Keep track of two pointers -> left and right
// Count the number of zeros which have occured from nums[left] to nums[right]
// While the number of zeros are bigger than k, move the left pointer up and decrement zeros.
// Update the max length if necessary.

// Time Complexity: O(n) 84ms
// Space Complexity: O(1) 43.1MB
var longestOnes = function(nums, k) {
  let left = 0;
  let zeros = 0;
  let max = 0;
  for (var right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;
    while (zeros > k) {
      if (nums[left] === 0) zeros--;
      left++;
    }
    max = Math.max(max, right - left + 1);
  }   
  return max;
};

// Two test cases to run function on
console.log(longestOnes([1,1,1,0,0,0,1,1,1,1,0], 2)) // 6
console.log(longestOnes([0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3)) // 10