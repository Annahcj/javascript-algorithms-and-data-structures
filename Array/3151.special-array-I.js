// 3151. Special Array I
// An array is considered special if every pair of its adjacent elements contains two numbers with different parity.
// You are given an array of integers nums. Return true if nums is a special array, otherwise, return false.


// Solution: Compare Adjacent

// Compare the parity of each adjacent pair of numbers.

// Time Complexity: O(n) 53ms
// Space Complexity: O(1) 51.3MB
var isArraySpecial = function(nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] % 2 === nums[i + 1] % 2) {
      return false;
    }
  }
  return true;
};

// Three test cases
console.log(isArraySpecial([1])) // true
console.log(isArraySpecial([2,1,4])) // true
console.log(isArraySpecial([4,3,1,6])) // false