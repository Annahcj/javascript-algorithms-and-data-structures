// 1866. Number of Ways to Rearrange Sticks With K Sticks Visible
// There are n uniquely-sized sticks whose lengths are integers from 1 to n. You want to arrange the sticks such that exactly k sticks are visible from the left. A stick is visible from the left if there are no longer sticks to the left of it.
  // For example, if the sticks are arranged [1,3,2,5,4], then the sticks with lengths 1, 3, and 5 are visible from the left.
// Given n and k, return the number of such arrangements. Since the answer may be large, return it modulo 10^9 + 7.


// Solution: DP - Recursion w/ Memoization 

// Position the sticks from right to left since the visibility is from left to right. Sticks on the right will be taken care of before moving left.
// There are two situations:
  // 1. We take a visible stick: This will be the tallest stick we have
  // 2. We take a non-visible stick: This will be any stick that is not the tallest. It will always be non-visible because we know the tallest stick will be placed in a position in front of it later.
    // No matter which shorter stick we use, the result with the remaining sticks will still be the same.

// Memoize each dp(i, k), where i = number of sticks left, and k = amount of visible sticks left.

// Time Complexity: O(nk) 1159ms
// Space Complexity: O(nk) 92.2MB
var rearrangeSticks = function(n, k) {
  let memo = Array(n + 1).fill(0).map(() => Array(k + 1).fill(-1));
  let MOD = 10 ** 9 + 7;
  return dp(n, k);
  
  function dp(i, k) {
    if (i === 1) return k === 1 ? 1 : 0;
    if (k === 0) return 0;
    if (memo[i][k] !== -1) return memo[i][k];
    
    let ways = (dp(i - 1, k) * (i - 1)) % MOD; // take smaller stick
    ways = (ways + dp(i - 1, k - 1)) % MOD; // take tallest stick
    return memo[i][k] = ways;
  }  
};

// Three test cases
console.log(rearrangeSticks(3, 2)) // 3
console.log(rearrangeSticks(5, 5)) // 1
console.log(rearrangeSticks(20, 11)) // 647427950