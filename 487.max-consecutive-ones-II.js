// 487. Max Consecutive Ones II
// Given a binary array nums, return the maximum number of consecutive 1's in the array if you can flip at most one 0.


// Solution: Sliding Window

// Keep a count of zeros
// Keep two pointers -> left and right
// When nums[right] is 0, increment zeros counter.
// Move left pointer up until zeros counter is less than 2.
// Keep updating the answer (max consecutive ones) when necessary.

// Time Complexity: O(n) 84ms
// Space Complexity: O(1) 41.8MB
var findMaxConsecutiveOnes = function(nums) {
  let zeros = 0, max = 0;
  let left = 0;
  for (var right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;
    while (zeros > 1) {
      if (nums[left] === 0) zeros--;
      left++;
    }
    max = Math.max(max, right - left + 1);
  }
  return max;
};

// Three test cases to run function on
console.log(findMaxConsecutiveOnes([1,0,1,1,0])) // 4
console.log(findMaxConsecutiveOnes([1,0,1,1,0,1])) // 4
console.log(findMaxConsecutiveOnes([1,1])) // 2