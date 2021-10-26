// 338. Counting Bits
// Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.


// Solution 1: Brute Force

// Count the number of bits for each number from 0 to n.

// Time Complexity: O(32n) 96ms
// Space Complexity: O(1) 44.7MB
var countBits = function(n) {
  let bits = [];
  for (var i = 0; i <= n; i++) {
    bits.push(countBits(i));
  }  
  return bits;

  function countBits(num) {
    let ans = 0;
    for (var i = 0; i < 32; i++) {
      // check whether the last bit of num is 1
      ans += (num & 1);
      // shift off the last bit
      num >>= 1;
    }
    return ans;
  }
};

// Solution 2: Dynamic Programming 

// This solution almost reminds me of the coin problem.
// Create a dp array the size of n + 1, filled with 0's.
// Loop through from 1 to n
  // if offset * 2 is equal to i,
    // update offset to offset * 2
  // set dp[i] to dp[i - offset] + 1
// Return dp.

// Time Complexity: O(n) 100ms
// Space Complexity: O(1) 44.5MB
var countBits = function(n) {
  let dp = Array(n+1).fill(0);
  let offset = 1;
  for (var i = 1; i <= n; i++) {
    // offset: keep track of the latest 'double' -> 1,2,4,8,16,32,64,128...
    if (offset * 2 === i) {
      offset *= 2;
    }
    dp[i] = dp[i - offset] + 1;
  }  
  return dp;
};

// Two test cases to run function on
console.log(countBits(2)) // [0,1,1]
console.log(countBits(5)) // [0,1,1,2,1,2]