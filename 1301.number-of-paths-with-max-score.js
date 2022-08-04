// 1301. Number of Paths with Max Score
// You are given a square board of characters. You can move on the board starting at the bottom right square marked with the character 'S'.
// You need to reach the top left square marked with the character 'E'. The rest of the squares are labeled either with a numeric character 1, 2, ..., 9 or with an obstacle 'X'. In one move you can go up, left or up-left (diagonally) only if there is no obstacle there.
// Return a list of two integers: the first integer is the maximum sum of numeric characters you can collect, and the second is the number of such paths that you can take to get that maximum sum, taken modulo 10^9 + 7.
// In case there is no path, return [0, 0].


// Solution 1: DP - Tabulation

// Keep track of the max score and number of paths.
// Start from the bottom right corner and traverse the three possible paths from each position: right, bottom right, bottom

// If the score is bigger than the current max score, update it to the new score and number of paths from that path.
// If the score is equal to the current max score, add to the number of paths.

// Things to keep in mind:
  // Remember there is no path for 'X'.
  // Only calculate the score for the current square if it's a number (not 'S' or 'E').

// Time Complexity: O(n^2) 246ms
// Space Complexity: O(n^2) 61.8MB
var pathsWithMaxScore = function(board) {
  let n = board.length, dp = Array(n + 1).fill(0).map(() => Array(n + 1).fill(0).map(() => [-Infinity, 0]));
  let mod = 10 ** 9 + 7;
  dp[n - 1][n - 1] = [0, 1]; // [max score, number of paths]
  
  for (let i = n - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (board[i][j] === 'X' || board[i][j] === 'S') continue;
      
      let paths = [dp[i][j + 1], dp[i + 1][j + 1], dp[i + 1][j]];
      for (let [maxScore, numPaths] of paths) {
        if (dp[i][j][0] < maxScore) {
          dp[i][j] = [maxScore, numPaths];
        } else if (dp[i][j][0] === maxScore) {
          dp[i][j][1] = (dp[i][j][1] + numPaths) % mod;
        }
      }
      let score = board[i][j] === 'E' ? 0 : Number(board[i][j]);
      dp[i][j][0] += score;
    }
  }
  return dp[0][0][1] === 0 ? [0, 0] : dp[0][0];
};

// Solution 2: DP - Recursion w/ Memoization

// The same idea as solution 1, but a different approach using recursion and memoization.

// Time Complexity: O(n^2) 167ms
// Space Complexity: O(n^2) 59.4MB
var pathsWithMaxScore = function(board) {
  let n = board.length, memo = Array(n).fill(0).map(() => Array(n).fill(0).map(() => null));
  let mod = 10 ** 9 + 7;
  let res = dp(n - 1, n - 1);
  return res[1] === 0 ? [0, 0] : res;
  
  function dp(i, j) {
    if (i < 0 || j < 0 || board[i][j] === 'X') return [-Infinity, 0];
    if (i === 0 && j === 0) return [0, 1];
    if (memo[i][j] !== null) return memo[i][j];
    
    let ans = [-Infinity, 0];
    let paths = [dp(i, j - 1), dp(i - 1, j - 1), dp(i - 1, j)];
    for (let [maxScore, numPaths] of paths) {
      if (maxScore > ans[0]) {
        ans = [maxScore, numPaths];
      } else if (maxScore === ans[0]) {
        ans[1] = (ans[1] + numPaths) % mod;
      }
    }
    if (ans[0] !== -Infinity && board[i][j] !== 'S') ans[0] += Number(board[i][j]);
    return memo[i][j] = ans;
  }
};

// Three test cases to run function on
console.log(pathsWithMaxScore(["E23","2X2","12S"])) // [7,1]
console.log(pathsWithMaxScore(["E12","1X1","21S"])) // [4,2]
console.log(pathsWithMaxScore(["E11","XXX","11S"])) // [0,0]