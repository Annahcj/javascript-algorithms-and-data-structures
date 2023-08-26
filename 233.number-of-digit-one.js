// 233. Number of Digit One
// Given an integer n, count the total number of digit 1 appearing in all non-negative integers less than or equal to n.


// Solution: Digit DP

// Memoize each dp(i, state, ones), where
  // i = number of digits in the current number
  // state = (0: smaller than n, 1: same as n, 2: greater than n) this indicates how the current number is tracking in relation to n
  // ones = number of ones in the current number

// For each dp(i, state, ones),
  // Try each digit (0-9) as the next digit in the current number.
  // Base case: If the current number has the same amount of digits as n, return ones if the number is less than n, otherwise return 0.

// m = number of digits in n (< 10)
// Time Complexity: O(m^2 * 27) 55ms
// Space Complexity: O(m^2 * 3) 42.2MB
var countDigitOne = function(n) {
  let num = n.toString().split("").map(Number), m = num.length;
  let memo = Array(m + 1).fill(0).map(() => Array(3).fill(0).map(() => Array(m).fill(-1)));
  return dp(0, 1, 0);
  
  function dp(i, state, ones) {
    if (i === m) return state <= 1 ? ones : 0;
    if (memo[i][state][ones] !== -1) return memo[i][state][ones];
    
    let ans = ones; // the current number is always smaller than n since the number of digits is less than in n
    for (let digit = 0; digit <= 9; digit++) {
      if (digit === 0 && i === 0) continue; // no leading zero
      if (digit === 1) ans += dp(i + 1, getNewState(i, state, num, digit), ones + 1);
      else ans += dp(i + 1, getNewState(i, state, num, digit), ones);
    }
    return memo[i][state][ones] = ans;
  }  
};

function getNewState(i, state, num, newDigit) {
  if (state === 0 || state === 2) return state;
  if (newDigit === num[i]) return 1;
  return newDigit < num[i] ? 0 : 2;
}

// Two test cases
console.log(countDigitOne(0)) // 0
console.log(countDigitOne(13)) // 6