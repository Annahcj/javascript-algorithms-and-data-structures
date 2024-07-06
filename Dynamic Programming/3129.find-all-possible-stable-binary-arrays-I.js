// 3129. Find All Possible Stable Binary Arrays I
// You are given 3 positive integers zero, one, and limit.
// A binary array arr is called stable if:
  // The number of occurrences of 0 in arr is exactly zero.
  // The number of occurrences of 1 in arr is exactly one.
  // Each subarray of arr with a size greater than limit must contain both 0 and 1.
// Return the total number of stable binary arrays.
// Since the answer may be very large, return it modulo 10^9 + 7.


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(zeros, ones, last), where
  // zeros = number of zeros in the array
  // ones = number of ones in the array
  // last = the last number in the array

// For each dp(zeros, ones, last), 
  // We must take some consecutive amount of the other binary number (not the last number).
  // Go through each count up to limit and get the total number of ways over each.

// Time Complexity: O(zero * one * limit * 2) 1026ms
// Space Complexity: O(zeros * one * 2) 55.7MB
var numberOfStableArrays = (zero, one, limit) => {
  let memo = Array(zero + 1).fill(0).map(() => Array(one + 1).fill(0).map(() => Array(2).fill(-1)));
  const MOD = 1000000007;
  return (dp(0, 0, 0) + dp(0, 0, 1)) % MOD;
  
  function dp(zeros, ones, last) {
    if (zeros > zero || ones > one) return 0;
    if (zeros === zero && ones === one) return 1;
    if (memo[zeros][ones][last] !== -1) return memo[zeros][ones][last];
    
    let ans = 0;
    for (let i = 1; i <= limit; i++) {
      if (last === 0) {
        ans = (ans + dp(zeros, ones + i, 1)) % MOD;
      } else {
        ans = (ans + dp(zeros + i, ones, 0)) % MOD;
      }
    }
    return memo[zeros][ones][last] = ans;
  }  
};


// Solution 2: Bottom-Up Iterative DP

// lastOne[zeros][ones] = number of stable arrays with `zeros` zeros and `ones` ones, ending with 1.
// lastZero[zeros][ones] = number of stable arrays with `zeros` zeros and `ones` ones, ending with 0.

// For each state of zeros and ones, loop through each consecutive amount `i` up to limit and try to take `i` zeros and `i` ones (must follow arrays ending with opposite binary number).

// Time Complexity: O(zero * one * limit * 2) 297ms
// Space Complexity: O(zero * one * 2) 56.8MB
var numberOfStableArrays = (zero, one, limit) => {
  let lastOne = Array(zero + 1).fill(0).map(() => Array(one + 1).fill(0));
  let lastZero = Array(zero + 1).fill(0).map(() => Array(one + 1).fill(0));
  const MOD = 1000000007;
  for (let zeros = 0; zeros <= zero; zeros++) {
    for (let ones = 0; ones <= one; ones++) {
      if (zeros === 0 && ones === 0) {
        lastOne[zeros][ones] = 1;
        lastZero[zeros][ones] = 1;
        continue;
      }
      for (let i = 1; i <= limit; i++) {
        if (i <= zeros) { // take i zeros, must follow arrays ending with 0
          lastOne[zeros][ones] = (lastOne[zeros][ones] + lastZero[zeros - i][ones]) % MOD; 
        }
        if (i <= ones) { // take i ones, must follow arrays ending with 1
          lastZero[zeros][ones] = (lastZero[zeros][ones] + lastOne[zeros][ones - i]) % MOD;
        }
      }
    }
  }
  return (lastOne[zero][one] + lastZero[zero][one]) % MOD;
};

// Three test cases
console.log(numberOfStableArrays(1, 1, 2)) // 2
console.log(numberOfStableArrays(1, 2, 1)) // 1
console.log(numberOfStableArrays(3, 3, 2)) // 14