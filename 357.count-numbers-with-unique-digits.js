// 357. Count Numbers with Unique Digits
// Given an integer n, return the count of all numbers with unique digits, x, where 0 <= x < 10^n.


// Solution: Digit DP

// Memoize each dp(i, mask, state), where
  // i = the number of digits we have
  // mask = bitmask of which digits we have used
  // state = whether the current number is 
    // 0: smaller
    // 1: the same
    // 2: bigger
  // than the maximum number

// For each state, try to append each digit (0-9) to the current number.
// If the digit is a leading zero or the digit has already been used, skip it.
// We use "state" to keep track of whether the number is tracking smaller, equal, or bigger than the maximum number.

// m = number of digits in 10^n
// Time Complexity: O(m * 2^10 * 10) 114ms
// Space Complexity: O(m * 2^10) 44.8MB
var countNumbersWithUniqueDigits = function(n) {
  let max = (10 ** n - 1).toString(), m = max.length;
  let memo = Array(m).fill(0).map(() => Array(1 << 10).fill(0).map(() => Array(3).fill(-1)));
  return dp(0, 0, 1);
  
  function dp(i, mask, state) {
    if (i === m) return state < 2 ? 1 : 0;
    if (memo[i][mask][state] !== -1) return memo[i][mask][state];
    
    let ans = 1;
    for (let digit = 0; digit <= 9; digit++) {
      if (i === 0 && digit === 0) continue; // no leading zeros
      if ((mask >> digit) & 1) continue; // digit already used
      if (state === 1) {
        let newState = digit === Number(max[i]) ? 1 : digit > Number(max[i]) ? 2 : 0;
        ans += dp(i + 1, mask | (1 << digit), newState);
      } else {
        ans += dp(i + 1, mask | (1 << digit), state);
      }
    }
    return memo[i][mask][state] = ans;
  }  
};

// Three test cases to run function on
console.log(countNumbersWithUniqueDigits(0)) // 1
console.log(countNumbersWithUniqueDigits(1)) // 10
console.log(countNumbersWithUniqueDigits(2)) // 91