// 3300. Minimum Element After Replacement With Digit Sum
// You are given an integer array nums.
// You replace each element in nums with the sum of its digits.
// Return the minimum element in nums after all replacements.


// Solution:

// n = length of nums
// Time Complexity: O(n log(n)) 70ms
// Space Complexity: O(1) 51.5MB
function minElement(nums) {
  let min = Infinity;
  for (let num of nums) {
    min = Math.min(min, getDigitSum(num));
  }
  return min;
};

function getDigitSum(num) {
  let digitSum = 0;
  while (num > 0) {
    digitSum += num % 10;
    num = Math.floor(num / 10);
  }
  return digitSum;
}

// Three test cases
console.log(minElement([10,12,13,14])) // 1
console.log(minElement([1,2,3,4])) // 1
console.log(minElement([999,19,199])) // 10