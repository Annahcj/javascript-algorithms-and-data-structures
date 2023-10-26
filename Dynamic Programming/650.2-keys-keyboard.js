// 650. 2 Keys Keyboard
// There is only one character 'A' on the screen of a notepad. You can perform two operations on this notepad for each step:
  // Copy All: You can copy all the characters present on the screen (a partial copy is not allowed).
  // Paste: You can paste the characters which are copied last time.
// Given an integer n, return the minimum number of operations to get the character 'A' exactly n times on the screen.


// Solution: Recursion w/ Memoization

// Keep track of the length of the current string, and the length of the copied string.
// Start off with length: 1, copied length: 1 (operations: 1)

// At each state, we have two choices
  // 1. Paste what was copied : 1 operation
  // 2. Copy current string, then paste it: 2 operations
// Record and return the best choice out of the two

// Time Complexity: O(n^2) 488ms
// Space Complexity: O(n^2) 69.2MB
var minSteps = function(n) {
  let memo = Array(n + 1);
  for (var i = 0; i <= n; i++) memo[i] = Array(n + 1);
  if (n === 1) return 0;
  return recurse(1, 1) + 1;

  function recurse(len, copied) {
    if (len === n) return 0;
    if (len > n) return Infinity;
    if (memo[len][copied] !== undefined) return memo[len][copied];
    let ans = Math.min(recurse(len + copied, copied) + 1, recurse(len + len, len) + 2);
    memo[len][copied] = ans;
    return ans;
  }  
};

// Two test cases to run function on
console.log(minSteps(3)) // 3
console.log(minSteps(1)) // 0