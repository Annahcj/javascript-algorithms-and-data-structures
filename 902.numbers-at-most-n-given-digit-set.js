// 902. Numbers At Most N Given Digit Set
// Given an array of digits which is sorted in non-decreasing order. You can write numbers using each digits[i] as many times as we want. For example, if digits = ['1','3','5'], we may write numbers such as '13', '551', and '1351315'.
// Return the number of positive integers that can be generated that are less than or equal to a given integer n.


// Solution 1: 

// nDigits = number of digits in n, digitsSize = length of digits

// count all numbers that have less amount of digits than nDigits (since all numbers with less digits are guaranteed to be smaller)
  // e.g: ["1","3","5","7"], 100
  // x, xx = 4^1 + 4^2 = 20

// then compute all possible numbers that have the same amount of digits as nDigits
  // e.g: ["1","2","3"], 287
  // 1xx = digitsSize ^ 2 = 3^2 = 9 (the remaining two digits can have 9 different permutations)
  // 11x = digitsSize ^ 1 = 3^1 = 3 (the remaining digit can have 3 different permutations)
  // etc..

// Time Complexity: O(log(n)) 70ms
// Space Complexity: O(log(n)) 38.7MB
var atMostNGivenDigitSet = function(digits, n) {
  let ans = 0;
  n = n.toString();
  let nDigits = n.length, digitsSize = digits.length;
  for (var i = 1; i < nDigits; i++) {
    ans += digitsSize ** i;
  }

  for (var i = 0; i < nDigits; i++) {
    let digitsMatch = false;
    for (var digit of digits) {
      if (digit < n[i]) {
        ans += digitsSize ** (nDigits - i - 1);
      } else if (digit === n[i]) {
        digitsMatch = true;
      }
    }
    if (!digitsMatch) return ans;
  }
  return ans + 1;
};


// Solution 2: Digit DP

// Memoize each dp(i, state), where
  // i = the number of digits we currently have
  // state = whether the current number is tracking smaller, the same, or greater than n.
    // 0: smaller
    // 1: same
    // 2: greater

// Try each digit in digits as the next digit.
  // If digit < n[index], set state to 0 (smaller) if it's currently 1 (equal).
  // If digit === n[index], keep it to whatever state we currently have.  
  // If digit > n[index], set state to 2 (bigger) if it's currently 1 (equal).

// Note: Subtract one from the final answer for the first case with 0 digits.

// d = number of digits in digits, k = number of digits in n
// Time Complexity: O(k * 3 * d) = O(kd) 67ms
// Space Complexity: O(k * 3) = O(k) 41.9MB
var atMostNGivenDigitSet = function(digits, n) {
  let str = n.toString(), size = str.length;
  let memo = Array(size).fill(0).map(() => Array(3).fill(-1));
  return dp(0, 1) - 1;
  
  function dp(i, state) { 
    if (i === size) return state === 2 ? 0 : 1;
    if (memo[i][state] !== -1) return memo[i][state];
    
    let ans = 1;
    for (let digit of digits) {
      if (digit < str[i]) {
        ans += dp(i + 1, state === 1 ? 0 : state);
      } else if (digit === str[i]) {
        ans += dp(i + 1, state);
      } else {
        ans += dp(i + 1, state === 1 ? 2 : state);
      }
    }
    return memo[i][state] = ans;
  }  
};

// Five test cases to run function on
console.log(atMostNGivenDigitSet(["1","3","5","7"], 100)) // 20
console.log(atMostNGivenDigitSet(["1","4","9"], 1000000000)) // 29523
console.log(atMostNGivenDigitSet(["7"], 8)) // 1
console.log(atMostNGivenDigitSet(["1", "2"], 12)) // 4
console.log(atMostNGivenDigitSet(["3","5"], 4)) // 1