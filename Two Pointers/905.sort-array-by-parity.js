// 905. Sort Array By Parity
// Given an integer array nums, move all the even integers at the beginning of the array followed by all the odd integers.
// Return any array that satisfies this condition.


// Solution: Two Pointers

// j = ongoing pointer in nums
// i = index of next even number's position in nums

// When we find an even number, swap it to position i and increment i.

// Time Complexity: O(n) 127ms
// Space Complexity: O(1) 44.5MB
var sortArrayByParity = function(nums) {
  for (let j = 0, i = 0; j < nums.length; j++) {
    if (nums[j] % 2 === 0) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
    }
  }
  return nums;
};

// Two test cases 
console.log(sortArrayByParity([3,1,2,4])) // [2,4,3,1]
console.log(sortArrayByParity([0])) // [0]