// 1464. Maximum Product of Two Elements in an Array
// Given the array of integers nums, you will choose two different indices i and j of that array. Return the maximum value of (nums[i]-1)*(nums[j]-1).
 

// Solution: Maximum Two Numbers

// Find the two maximum numbers in nums and multiply them together after subtracting one from both.

// Time Complexity: O(n) 53ms
// Space Complexity: O(1) 43.9MB
var maxProduct = function(nums) {
  let max = 0, secondMax = 0;
  for (let num of nums) {
    if (num > max) {
      secondMax = max;
      max = num;
    } else if (num > secondMax) {
      secondMax = num;
    }
  }
  return (max - 1) * (secondMax - 1);
};

// Three test cases
console.log(maxProduct([3,4,5,2])) // 12
console.log(maxProduct([1,5,4,5])) // 16
console.log(maxProduct([3,7])) // 12