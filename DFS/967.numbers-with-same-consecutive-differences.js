// 967. Numbers With Same Consecutive Differences
// Return all non-negative integers of length n such that the absolute difference between every two consecutive digits is k.
// Note that every number in the answer must not have leading zeros. For example, 01 has one leading zero and is invalid.
// You may return the answer in any order.


// Solution: DFS

// Note: We will never have 0 as a starting digit since n >= 2.
// Start each number with digits 1 to 9.

// dfs:
  // 1. Get the last digit of the number
  // 2. Get the two possible next digits: lastDigit - k, lastDigit + k
  // 3. If the two next digits are in the range of [0,...,9], add them as the next digit.
  // Repeat the above steps until the number has n digits.
  // Note: When k is 0, we only want to take 1 next digit to avoid generating duplicate numbers.

// Time Complexity: O(2^n) 93ms
// Space Complexity: O(2^n) 42.6MB
var numsSameConsecDiff = function(n, k) {
  let res = [];
  for (let i = 1; i <= 9; i++) {
    dfs(i, 1);
  }
  return res;
  
  function dfs(num, digits) {
    if (digits === n) {
      res.push(num);
      return;
    }
    const lastDigit = num % 10;
    const less = lastDigit - k, more = lastDigit + k;
    if (less >= 0) dfs(num * 10 + less, digits + 1); 
    if (k !== 0 && more <= 9) dfs(num * 10 + more, digits + 1);
  }
};

// Two test cases 
console.log(numsSameConsecDiff(3, 7)) // [181,292,707,818,929]
console.log(numsSameConsecDiff(2, 1)) // [10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98]