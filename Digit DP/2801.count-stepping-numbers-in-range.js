// 2801. Count Stepping Numbers in Range
// Given two positive integers low and high represented as strings, find the count of stepping numbers in the inclusive range [low, high].
// A stepping number is an integer such that all of its adjacent digits have an absolute difference of exactly 1.
// Return an integer denoting the count of stepping numbers in the inclusive range [low, high].
// Since the answer may be very large, return it modulo 10^9 + 7.
// Note: A stepping number should not have a leading zero.


// Solution: Digit DP

// Memoize each dp(i, prev, stateLow, stateHigh), where
  // i = the number of digits we currently have
  // prev = the previous character in the sequence
  // stateLow = whether the current number is tracking smaller, the same, or greater than low (0 = smaller, 1 = same, 2 = greater)
  // stateHigh = whether the current number is tracking smaller, the same, or greater than high (0 = smaller, 1 = same, 2 = greater)

// For each dp(i, prev, stateLow, stateHigh), we have two possible next digits: [prev - 1, prev + 1].
// Calculate and return the total combinations.

// n = length of high
// Time Complexity: O(n * 90) 212ms
// Space Complexity: O(n * 90) 55MB
var countSteppingNumbers = function(low, high) {
  let n = high.length, memo = Array(n).fill(0).map(() => Array(10).fill(0).map(() => Array(3).fill(0).map(() => Array(3).fill(-1)))); // [n][10][3][3]
  let ans = 0, MOD = 10 ** 9 + 7;
  for (let i = 1; i <= 9; i++) {
    ans = (ans + dp(1, i, getState(0, 1, i, low), getState(0, 1, i, high))) % MOD; 
  }
  return ans;
  
  function dp(i, prev, stateLow, stateHigh) {
    if (i === high.length) return (stateLow >= 1 && stateHigh <= 1) ? 1 : 0;
    if (memo[i][prev][stateLow][stateHigh] !== -1) return memo[i][prev][stateLow][stateHigh];
    
    let ans = (i > low.length || (i === low.length && stateLow >= 1)) ? 1 : 0; // the current state is valid if the current number is within bounds of low and high
    let digits = [prev - 1, prev + 1];
    for (let digit of digits) {
      if (digit < 0 || digit > 9) continue;
      let newStateLow = getState(i, stateLow, digit, low);
      let newStateHigh = getState(i, stateHigh, digit, high);
      ans = (ans + dp(i + 1, digit, newStateLow, newStateHigh)) % MOD;
    }
    return memo[i][prev][stateLow][stateHigh] = ans;
  }  
};

function getState(i, state, digit, num) {
  if (i >= num.length) return 2; // length exceeds num, so will be greater
  if (state === 0 || state === 2) return state; // state stays the same if length is less than or equal
  if (digit > Number(num[i])) return 2; // state was the same, is greater now
  if (digit === Number(num[i])) return 1; // state was the same, and is still the same
  return 0; // state was the same, but is smaller now
}

// Two test cases
console.log(countSteppingNumbers("1", "11")) // 10
console.log(countSteppingNumbers("98", "101")) // 2