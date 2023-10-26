// 474. Ones and Zeroes
// You are given an array of binary strings strs and two integers m and n.
// Return the size of the largest subset of strs such that there are at most m 0's and n 1's in the subset.
// A set x is a subset of a set y if all elements of x are also elements of y.


// Solution 1: DP - Recursion w/ Memoization

// Try all possible combinations of the strs and the amount of m and n we have left -> dp(index, m, n)
// For each strs[i], try the two situations:
  // 1. Don't take strs[i] -> dp(i + 1, m, n)
  // 2. If we have enough m's and n's leftover for strs[i], take strs[i] -> dp(i + 1, newM, newN) + 1
// Save the results of each [index][m][n] so that we don't recompute overlapping subproblems.

// l = strs.length
// Time Complexity: O(lmn) 838ms
// Space Complexity: O(lmn) 131.7MB
var findMaxForm = function(strs, m, n) {
  let memo = Array(strs.length).fill(0).map(() => Array(m + 1).fill(0).map(() => Array(n + 1).fill(-1)));
  return dp(0, m, n);
  
  function dp(i, m, n) {
    if (i === strs.length) return 0;
    if (memo[i][m][n] !== -1) return memo[i][m][n];
    
    let ans = 0, [newM, newN] = isEnough(strs[i], m, n);
    ans = dp(i + 1, m, n); // don't take strs[i]
    if (newM >= 0 && newN >= 0) ans = Math.max(ans, dp(i + 1, newM, newN) + 1); // take strs[i]
    return memo[i][m][n] = ans;
  }
  
  function isEnough(str, m, n) {
    for (let char of str) {
      m -= char === '0' ? 1 : 0;
      n -= char === '1' ? 1 : 0;
      if (m < 0 || n < 0) return [-1, -1];
    }
    return m >= 0 && n >= 0 ? [m, n] : [-1, -1];
  }
};

// Solution 2: Bottom Up DP - Tabulation

// Knapsack-like approach
// Keep the previous state of the matrix.

// For each strs[i], 
  // 1. Get the count of zeros and ones
  // 2. Try every situation of previous zero and one counts.
    // Take the best result of either taking the current string or not taking it

// Time Complexity: O(lmn) 230ms
// Space Complexity: O(mn) 49.3MB
var findMaxForm = function(strs, m, n) {
  let prev = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  for (let i = 0; i < strs.length; i++) {
    let [mCount, nCount] = getCounts(strs[i]);
    let curr = [...prev].map(mat => [...mat]);
    for (let j = mCount; j <= m; j++) {
      for (let k = nCount; k <= n; k++) {
        curr[j][k] = Math.max(curr[j][k], 1 + prev[j - mCount][k - nCount]);
      }
    }
    prev = curr;
  }
  return prev[m][n];
  
  function getCounts(str) {
    let m = 0, n = 0;
    for (let char of str) {
      m += char === '0' ? 1 : 0;
      n += char === '1' ? 1 : 0;
    }
    return [m, n];
  }
};

// Two test cases to run function on
console.log(findMaxForm(["10","0001","111001","1","0"], 5, 3)) // 4
console.log(findMaxForm(["10","0","1"], 1, 1)) // 2