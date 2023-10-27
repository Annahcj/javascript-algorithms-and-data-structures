// 1143. Longest Common Subsequence


// Solution 1: Recursion w/ Memoization

// Use a 2d array to store the longest subsequences at each position
// Call recurse(0, 0)
// recurse: (i (index in text1), j (index in text2))
  // base case: if i has gone out of bounds OR j has gone out of bounds, return 0
  // base case2: if memo already contains [i, j], return memo[i][j]
  // let ans be 0
  // if text1[i] matches text2[j]
    // (move both pointers forward one since they both match)
    // set ans to 1 + recurse(i + 1, j + 1)
  // otherwise,
    // (try moving either one forward)
    // set ans to Math.max(ans, recurse(i + 1, j), recurse(i, j + 1))
  // store the best result (ans) in memo
  // return ans

// Time Complexity: O(nm) 132ms
// Space Complexity: O(mn) 52.5MB
var longestCommonSubsequence = function(text1, text2) {
  let n = text1.length, m = text2.length;
  let memo = Array(n);
  for (let i = 0; i < n; i++) {
    memo[i] = Array(m);
  }
  return recurse(0, 0);

  function recurse(i, j) {
    if (i === text1.length || j === text2.length) return 0;
    if (memo[i][j]) return memo[i][j];
    let ans = 0;
    if (text1[i] === text2[j]) {
      ans = 1 + recurse(i + 1, j + 1);
    } else {
      ans = Math.max(ans, recurse(i + 1, j), recurse(i, j + 1));
    }
    memo[i][j] = ans;
    return ans;
  }  
};

// Solution 2: Dynamic Programming

// Instead of using recursion, we can use bottom-up dynamic programming.
// Create an n + 1 by m + 1 matrix filled with 0's
// Loop through backwards from n - 1 to 0 (pointer = i)
  // loop through backwards from m - 1 to 0 (pointer = j)
    // set ans to 0 
    // if text1[i] matches text2[j]
      // set ans to 1 + dp[i + 1][j + 1]
    // otherwise,
      // set ans to Math.max(dp[i + 1][j], dp[i][j + 1])
    // set dp[i][j] to ans
// return dp[0][0]

// Time Complexity: O(nm) 136ms
// Space Complexity: O(nm) 48.4MB
var longestCommonSubsequence = function(text1, text2) {
  let n = text1.length, m = text2.length;
  let dp = Array(n + 1);
  for (let i = 0; i <= n; i++) {
    dp[i] = Array(m + 1).fill(0);
  }

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      let ans = 0;
      if (text1[i] === text2[j]) {
        ans = 1 + dp[i + 1][j + 1];
      } else {
        ans = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
      dp[i][j] = ans;
    }
  }
  return dp[0][0];
};

// Three test cases
console.log(longestCommonSubsequence("abcde", "ace")) // 3
console.log(longestCommonSubsequence("abc", "abc")) // 3
console.log(longestCommonSubsequence("abc", "def")) // 0