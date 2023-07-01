// 664. Strange Printer
// There is a strange printer with the following two special properties:
  // The printer can only print a sequence of the same character each time.
  // At each turn, the printer can print new characters starting from and ending at any place and will cover the original existing characters.
// Given a string s, return the minimum number of turns the printer needed to print it.


// Solution: DP

// Memoize each dp(left, right).
// For each dp(left, right), 
  // 1. Find the current same sequence (index i). 
    // We can stop the printer here: dp(i, right) + 1.
  // 2. Find all occurances of s[j] === s[left]. 
    // We can extend the sequence and not use the printer yet: dp(i, j - 1) + dp(j, right).
    // dp(j, right): extends the current sequence to print later
    // dp(i, j - 1): this will be printed on top of the current sequence

// Time Complexity: O(n^3) 100ms
// Space Complexity: O(n^2) 45.6MB
var strangePrinter = function(s) {
  let n = s.length, memo = Array(n).fill(0).map(() => Array(n).fill(-1));
  return dp(0, n - 1);
  
  function dp(left, right) {
    if (left > right) return 0;
    if (memo[left][right] !== -1) return memo[left][right];
    
    let i = left;
    while (i <= right && s[i] === s[left]) i++;
    let ans = 1 + dp(i, right); // print current sequence
    for (let j = i + 1; j <= right; j++) {
      if (s[j] === s[left]) {
        ans = Math.min(ans, dp(i, j - 1) + dp(j, right)); // extend current sequence
      }
    }
    return memo[left][right] = ans;
  }
};

// Two test cases
console.log(strangePrinter("aaabbb")) // 2
console.log(strangePrinter("aba")) // 2