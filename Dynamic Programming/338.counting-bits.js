// 338. Counting Bits
// Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.


// Solution 1: Brute Force

// Count the number of bits for each number from 0 to n.

// Time Complexity: O(n log(n)) 75ms
// Space Complexity: O(1) 47.5MB
var countBits = function(n) {
  let ans = Array(n + 1);
  for (let i = 0; i <= n; i++) {
    ans[i] = countOnes(i);
  }
  return ans;
};

function countOnes(num) {
  let ones = 0;
  while (num > 0) {
    ones += (num & 1);
    num >>= 1;
  }
  return ones;
}


// Solution 2: DP

// Use the previously computed results to calculate the answer for each number.
// For each number i, reuse the result from ans[i >> 1]. If the rightmost bit of i is 1, then we need to increment the result by 1.
// The idea: We shift all bits right by 1 to remove the rightmost bit. If that rightmost bit is 1, then we add one to our result.

// Time Complexity: O(n) 66ms
// Space Complexity: O(n) 47.4MB
var countBits = function(n) {
  let ans = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    ans[i] = ans[i >> 1] + (i & 1);
  }
  return ans;
};

// Two test cases 
console.log(countBits(2)) // [0,1,1]
console.log(countBits(5)) // [0,1,1,2,1,2]