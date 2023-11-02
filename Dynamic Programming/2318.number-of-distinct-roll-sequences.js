// 2318. Number of Distinct Roll Sequences
// You are given an integer n. You roll a fair 6-sided dice n times. Determine the total number of distinct sequences of rolls possible such that the following conditions are satisfied:
  // 1. The greatest common divisor of any adjacent values in the sequence is equal to 1.
  // 2. There is at least a gap of 2 rolls between equal valued rolls. More formally, if the value of the ith roll is equal to the value of the jth roll, then abs(i - j) > 2.
// Return the total number of distinct sequences possible. Since the answer may be very large, return it modulo 109 + 7.
// Two sequences are considered distinct if at least one element is different.


// Solution: Dynamic Programming w/ Memoization & GCD

// Keep track of the prevoius and previous previous dice value.
// Only pursue paths which satisfy the two conditions.

// dp(i, j, k) 
  // i = number of rolls
  // j = previous previous value
  // k = previous value

// Time Complexity: O(n * 6^3) 639ms
// Space Complexity: O(n * 6 * 6) 82.7MB
var distinctSequences = function(n) {  
  let memo = Array(n).fill(0).map(() => Array(7).fill(0).map(() => Array(7).fill(-1)));
  let mod = 10 ** 9 + 7;
  return dp(0, 0, 0);
  
  function dp(i, prevPrevVal, prevVal) {
    if (i === n) return 1;
    if (memo[i][prevPrevVal][prevVal] !== -1) return memo[i][prevPrevVal][prevVal];
    
    let ans = 0;
    for (let j = 1; j <= 6; j++) {
      if (j === prevPrevVal || j === prevVal || (prevVal !== 0 && gcd(j, prevVal) !== 1)) continue;
      ans = (ans + dp(i + 1, prevVal, j)) % mod;
    }
    return memo[i][prevPrevVal][prevVal] = ans;
  }
};

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

// Three test cases
console.log(distinctSequences(2)) // 22
console.log(distinctSequences(3)) // 66
console.log(distinctSequences(4)) // 184