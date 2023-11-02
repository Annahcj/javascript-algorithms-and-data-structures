// 2719. Count of Integers
// You are given two numeric strings num1 and num2 and two integers max_sum and min_sum. We denote an integer x to be good if:
  // num1 <= x <= num2
  // min_sum <= digit_sum(x) <= max_sum.
// Return the number of good integers. Since the answer may be large, return it modulo 109 + 7.
// Note that digit_sum(x) denotes the sum of the digits of x.


// Solution: Digit DP 

// Memoize each dp(i, state1, state2, digitSum), where
  // i = index of current digit
  // state1 = state of current number compared to num1 (0 = smaller, 1 = equal, 2 = greater)
  // state2 = state of current number compared to num2 (0 = smaller, 1 = equal, 2 = greater)
  // digitSum = current digit sum

// For each dp(i, state1, state2, digitSum), try each possible digit as the next digit.
// Compute the new states compared to num1 and num2.

// Time Complexity: O(len(num2) * max_sum * 9) 360ms
// Space Complexity: O(len(num2) * max_sum * 9) 52.2MB
var count = function(num1, num2, min_sum, max_sum) {
  let memo = new Map(), MOD = 10 ** 9 + 7;
  return dp(0, 1, 1, 0);
  
  function dp(i, state1, state2, digitSum) {
    if (i === num2.length) return state1 > 0 && state2 < 2 && digitSum >= min_sum && digitSum <= max_sum ? 1 : 0;
    let key = `${i},${state1},${state2},${digitSum}`;
    if (memo.has(key)) return memo.get(key);
    
    let ans = (i > num1.length || (i === num1.length && state1 > 0)) && digitSum >= min_sum && digitSum <= max_sum ? 1 : 0; // the current sequence is valid if the current number is greater than or equal to num1 and the digit sum is within bounds
    for (let digit = 0; digit <= 9; digit++) {
      if (i === 0 && digit === 0) continue; // skip leading zeros
      let newState1 = getState(i, state1, digit, num1);
      let newState2 = getState(i, state2, digit, num2);
      ans = (ans + dp(i + 1, newState1, newState2, digitSum + digit)) % MOD;
    }
    memo.set(key, ans);
    return ans;
  }  
  
  function getState(i, state, digit, num) {
    if (i >= num.length) return 2; // length exceeds num, so will be greater
    if (state === 0 || state === 2) return state; // state stays the same if length is less than or equal
    if (digit > Number(num[i])) return 2; // state was the same, is greater now
    if (digit === Number(num[i])) return 1; // state was the same, and is still the same
    return 0; // state was the same, but is smaller now
  }
};

// Two test cases
console.log(count("1", "12", 1, 8)) // 11
console.log(count("1", "5", 1, 5)) // 5