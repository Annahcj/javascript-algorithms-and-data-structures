// 279. Perfect Squares
// Given an integer n, return the least number of perfect square numbers that sum to n.
// A perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.


// Solution: Dynamic Programming

// Similar approach to the Coin Change problem
// Instead of some coins, we just create our own array from squares.
// Create a dp array the size of n + 1, filled with Infinity
// set dp[0] to 0
// Loop through from 1 to n (pointer = i)
  // loop through all the squares (pointer = j)
    // if i is smaller than square[j] (impossible to put bigger coin)
    // update dp[i] if (dp[i - squares[j]] + 1) is smaller
// Return dp[n]

// Time Complexity: O(n * √n) 225ms
// Space Complexity: O(n) 44.5MB
var numSquares = function(n) {
  // placeholder 0 to bump up indexes by 1
  let squares = [0];
  // pre-compute the squares
  for (var i = 1; i * i <= n; i++) {
    squares.push(i * i);
  } 
  let dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;
  for (var i = 1; i <= n; i++) {
    for (var j = 1; j < squares.length; j++) {
      if (i < squares[j]) break;
      dp[i] = Math.min(dp[i], dp[i - squares[j]] + 1);
    }
  } 
  return dp[n];
};

// Three test cases to run function on
console.log(numSquares(1)) // 1
console.log(numSquares(12)) // 3
console.log(numSquares(13)) // 2