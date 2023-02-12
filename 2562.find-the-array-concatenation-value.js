// 2562. Find the Array Concatenation Value
// You are given a 0-indexed integer array nums.
// The concatenation of two numbers is the number formed by concatenating their numerals.
  // For example, the concatenation of 15, 49 is 1549.
// The concatenation value of nums is initially equal to 0. Perform this operation until nums becomes empty:
  // If there exists more than one number in nums, pick the first element and last element in nums respectively and add the value of their concatenation to the concatenation value of nums, then delete the first and last element from nums.
  // If one element exists, add its value to the concatenation value of nums, then delete it.
// Return the concatenation value of the nums.


// Solution: Two Pointers

// Maintain two pointers from the start and end of nums and move them towards each other until i >= j.
// To get the concatenation value, 
  // find the number of digits in nums[j] and raise it to power of 10, then multiply it to nums[i]. 
  // e.g: concat (25, 84)
    // 25 -> 2500 (since 84 has two digits)
    // 2500 + 84 = 2584

// Time Complexity: O(n log(n)) 76ms
// Space Complexity: O(1) 43.1MB
var findTheArrayConcVal = function(nums) {
  let i = 0, j = nums.length - 1, ans = 0;
  while (i <= j) {
    if (i === j) {
      ans += nums[i];
    } else {
      ans += nums[i] * (10 ** numDigits(nums[j])) + nums[j];
    }
    i++, j--;
  }
  return ans;
};

function numDigits(num) {
  let digits = 0;
  while (num > 0) {
    num = Math.floor(num / 10);
    digits++;
  }
  return digits;
}

// Two test cases
console.log(findTheArrayConcVal([7,52,2,4])) // 596
console.log(findTheArrayConcVal([5,14,13,8,12])) // 673