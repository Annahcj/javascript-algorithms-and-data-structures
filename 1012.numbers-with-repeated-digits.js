// 1012. Numbers With Repeated Digits
// Given an integer n, return the number of positive integers in the range [1, n] that have at least one repeated digit.


// Solution: Digit DP

// Memoize each dp(i, mask, state, hasRepeat), where
  // i = the ith digit
  // mask = bitmask which indicates which digit we have already used
  // state = indicates whether the current number is tracking smaller, equal, or greater than n 
    // 0 = smaller
    // 1 = equal
    // 2 = greater
  // hasRepeat = whether we have a repeated digit 

// If hasRepeat is true (1), count it as 1 way.
// For each state, count the total number of ways after appending each digit (0 - 9).

// state:
  // If digit < n[index], update state to 0 (smaller) if state is currently 1 (equal). 
  // If digit === n[index], keep state the same.
  // If digit > n[index], update state to 2 (greater) if state is currently 1 (equal).

// d = number of digits in n
// Time Complexity: O(d * 2^10 * 3 * 2 * 10) 488ms
  // d * 2^10 * 3 * 2 = the number of different states we can have
  // 10 = at each state we have 10 options for digits 0-9
// Space Complexity: O(d * 2^10 * 3 * 2) 62MB
var numDupDigitsAtMostN = function(n) {
  let str = n.toString(), size = str.length, memo = new Map();
  return dp(0, 0, 1, 0);
  
  function dp(i, mask, state, hasRepeat) {
    if (i === size) return state < 2 && hasRepeat ? 1 : 0;
    let key = `${i},${mask},${state},${hasRepeat}`;
    if (memo.has(key)) return memo.get(key);
    
    let ans = hasRepeat;
    for (let digit = 0; digit <= 9; digit++) {
      if (i === 0 && digit === 0) continue;
      let newMask = mask | (1 << digit), repeat = hasRepeat || (mask === newMask ? 1 : 0);
      if (digit < Number(str[i])) {
        ans += dp(i + 1, newMask, state === 1 ? 0 : state, repeat);
      } else if (digit === Number(str[i])) {
        ans += dp(i + 1, newMask, state, repeat);
      } else {
        ans += dp(i + 1, newMask, state === 1 ? 2 : state, repeat);
      }
    }
    memo.set(key, ans);
    return ans;
  }  
};

// Three test cases to run function on
console.log(numDupDigitsAtMostN(20)) // 1
console.log(numDupDigitsAtMostN(100)) // 10
console.log(numDupDigitsAtMostN(1000)) // 262