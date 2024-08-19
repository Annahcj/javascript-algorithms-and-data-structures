// 650. 2 Keys Keyboard
// There is only one character 'A' on the screen of a notepad. You can perform two operations on this notepad for each step:
  // Copy All: You can copy all the characters present on the screen (a partial copy is not allowed).
  // Paste: You can paste the characters which are copied last time.
// Given an integer n, return the minimum number of operations to get the character 'A' exactly n times on the screen.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(a, copied), where
  // a = number of a's we have on the notepad
  // copied = the number of a's we have copied

// For each dp(a, copied), we have two choices:
  // 1. Copy all and paste: 2 + dp(a + a, a)
    // Note that we must paste once we copy, since there is no point doing the copy operation twice, not to mention it leads to an infinite loop.
  // 2. Paste what we have: 1 + dp(a + copied, copied)

// Memoize and return the minimum moves.

// Time Complexity: O(n^2) 207ms
// Space Complexity: O(n^2) 73.9MB
var minSteps = function(n) {
  let memo = Array(n).fill(0).map(() => Array(Math.floor(n / 2) + 1).fill(-1));
  return n === 1 ? 0 : 1 + dp(1, 1);
  
  function dp(a, copied) {
    if (a === n) return 0;
    if (a > n || copied > Math.floor(n / 2)) return Infinity;
    if (memo[a][copied] !== -1) return memo[a][copied];
    
    return memo[a][copied] = Math.min(2 + dp(a + a, a), 1 + dp(a + copied, copied));
  }
};

// Two test cases
console.log(minSteps(3)) // 3
console.log(minSteps(1)) // 0