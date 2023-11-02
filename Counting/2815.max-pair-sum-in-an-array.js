// 2815. Max Pair Sum in an Array
// You are given a 0-indexed integer array nums. You have to find the maximum sum of a pair of numbers from nums such that the maximum digit in both numbers are equal.
// Return the maximum sum or -1 if no such pair exists.


// Solution: Store Max Number per Max Digit

// Go through each number and get the maximum digit from the number.
// Store the maximum number for each maximum digit: maxNum[maxDigit] = the maximum number for numbers with maxDigit as the maximum digit
// Return the maximum maxNum[maxDigit] + num.

// n = length of nums
// Time Complexity: O(n log(n)) 123ms
// Space Complexity: O(1) 47MB
var maxSum = function(nums) {
  let maxNum = Array(10).fill(0), ans = 0;
  for (let num of nums) {
    let maxDigit = getMaxDigit(num);
    if (maxNum[maxDigit] > 0) {
      ans = Math.max(ans, maxNum[maxDigit] + num);
    }
    maxNum[maxDigit] = Math.max(maxNum[maxDigit], num);
  }
  return ans === 0 ? -1 : ans;
};

function getMaxDigit(num) {
  let maxDigit = 0;
  while (num > 0) {
    maxDigit = Math.max(maxDigit, num % 10);
    num = Math.floor(num / 10);
  }
  return maxDigit;
}

// Two test cases
console.log(maxSum([51,71,17,24,42])) // 88
console.log(maxSum([1,2,3,4])) // -1