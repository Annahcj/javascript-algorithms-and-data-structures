// 3201. Find the Maximum Length of Valid Subsequence I
// You are given an integer array nums.
// A subsequence sub of nums with length x is called valid if it satisfies:
  // (sub[0] + sub[1]) % 2 == (sub[1] + sub[2]) % 2 == ... == (sub[x - 2] + sub[x - 1]) % 2.
// Return the length of the longest valid subsequence of nums.
// A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.


// Solution: DP

// Store the longest subsequence length for each even and odd summed subsequence ending at even and odd numbers.
// evenSum:
  // evenSum[0] = longest subsequence length for an even-summed subsequence ending at an even number
  // evenSum[1] = longest subsequence length for an even-summed subsequence ending at an odd number
// oddSum: 
  // oddSum[0] = longest subsequence length for an odd-summed subsequence ending at an even number
  // oddSum[1] = longest subsequence length for an odd-summed subsequence ending at an even number

// Go through nums,
  // even-summed subsequence: If num is even, we need the previous number to be even. If num is odd, previous number must also be odd.
  // odd-summed subsequence: If num is even, previous number needs to be odd. If num is odd, previous number must be even.

// At the end, return the maximum of the four states.

// Time Complexity: O(n) 92ms
// Space Complexity: O(1) 63.5MB
var maximumLength = function(nums) {
  let evenSum = Array(2).fill(0), oddSum = Array(2).fill(0);
  for (let num of nums) {
    evenSum[num % 2] = 1 + (num % 2 === 0 ? evenSum[0] : evenSum[1]);
    oddSum[num % 2] = 1 + (num % 2 === 0 ? oddSum[1] : oddSum[0]);
  }
  return Math.max(evenSum[0], evenSum[1], oddSum[0], oddSum[1]);
};

// Three test cases
console.log(maximumLength([1,2,3,4])) // 4
console.log(maximumLength([1,2,1,1,2,1,2])) // 6
console.log(maximumLength([1,3])) // 2