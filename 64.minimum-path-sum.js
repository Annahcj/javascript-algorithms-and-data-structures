// 64. Minimum Path Sum
// Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.
// Note: You can only move either down or right at any point in time.


// Solution 1: [TLE] Brute Force

// recurse: (i, j)
  // base case: if we are at the bottom right corner, return the value at that position.
  // base case: if i is out of bounds OR j is out of bounds, return Infinity.
  // let min be grid[i][j] + Math.min(recurse down 1 step, recurse right 1 step)
  // return min

// Time Complexity: O(2^m+n)
// Space Complexity: m + n
var minPathSum = function(grid) {
  let width = grid[0].length, length = grid.length;
  return recurse(0, 0, 0);
  function recurse(i, j) {
    if (i === length - 1 && j === width - 1) return grid[i][j];
    if (i >= length || j >= width) return Infinity;
    let min = grid[i][j] + Math.min(recurse(i + 1, j), recurse(i, j + 1));
    return min;
  }  
};


// Solution 2: Dynamic Programming 2D 

// Make an empty 2d matrix with the same width and length as grid.
// Initialize the bottom right corner to the bottom right corner value in grid.
// Loop backwards and bottom up, 
  // set two values, down and right
  // if row is last row (can't go down), set down to Infinity. Otherwise set down to grid[i + 1][j]
  // if column is last column (can't go right), set right to Infinity. Otherwise set right to grid[i][j + 1]
  // set dp[i][j] to be Math.min(down, right)
// Return dp[0][0]

// Time Complexity: O(mn) 111ms
// Space Complexity: O(mn) 40.9MB
var minPathSum = function(grid) {
  let width = grid[0].length, length = grid.length;
  let dp = Array(length);
  for (var i = 0; i < length; i++) {
    dp[i] = Array(width);
  }
  for (var i = length - 1; i >= 0; i--) {
    for (var j = width - 1; j >= 0; j--) {
      if (i === length - 1 && j === width - 1) dp[i][j] = grid[i][j];
      else {
        let down = i === length - 1 ? Infinity : dp[i + 1][j];
        let right = j === width - 1 ? Infinity : dp[i][j + 1];
        dp[i][j] = grid[i][j] + Math.min(down, right);
      }
    }
  }
  return dp[0][0];
};

// Solution 3: Dynamic Programming 1D

// It turns out that we can use just one array the length of grid[0].length (the width of grid) 
// Fill the last item of dp with bottom right corner value of grid.
// (Note: The last row in dp can never move down)
// Loop backwards from length - 1 to 0
  // loop backwards from width - 1 to 0
    // Set right to dp[j + 1] if we aren't at the last column
    // Set down to dp[j] itself if we aren't at the last row
    // set dp[j] to grid[i][j] + Math.min(down, right)
    // (Since we set the bottom right corner before we start, we will always be able to go either right or down)
// Return dp[0]

// Time Complexity: O(mn) 80ms
// Space Complexity: O(n) 40.7MB
var minPathSum = function(grid) {
  let width = grid[0].length, length = grid.length;
  let dp = Array(width);
  for (var i = length - 1; i >= 0; i--) {
    for (var j = width - 1; j >= 0; j--) {
      if (i === length - 1 && j === width - 1) dp[j] = grid[i][j];
      else {
        let down = i === length - 1 ? Infinity : dp[j];
        let right = j === width - 1 ? Infinity : dp[j + 1];
        dp[j] = grid[i][j] + Math.min(down, right);
      }
    }
  }
  return dp[0];
};

// Solution 4: Constant Space

// Note: This solution modifies the original grid
// Instead of storing the sums in an extra matrix, we can modify the actual grid.
// If we are at the bottom right corner, continue.
// set down to grid[i + 1][j] or Infinity if we are at the last row
// set right to grid[i][j + 1] or Infinity if we are at the last column
// increment grid[i][j] by Math.min(down, right)
// Return grid[0][0]

// Time Complexity: O(mn) 111ms
// Space Complexity: O(1) 40.7MB
var minPathSum = function(grid) {
  let width = grid[0].length, length = grid.length;
  for (var i = length - 1; i >= 0; i--) {
    for (var j = width - 1; j >= 0; j--) {
      if (i === length - 1 && j === width - 1) continue
      let down = i === length - 1 ? Infinity : grid[i + 1][j];
      let right = j === width - 1 ? Infinity : grid[i][j + 1];
      grid[i][j] += Math.min(down, right);
    }
  }
  return grid[0][0];
};

// Two test cases to run function on
console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]])) // 7
console.log(minPathSum([[1,2,3],[4,5,6]])) // 12