// 1411. Number of Ways to Paint N × 3 Grid
// You have a grid of size n x 3 and you want to paint each cell of the grid with exactly one of the three colors: Red, Yellow, or Green while making sure that no two adjacent cells have the same color (i.e., no two cells that share vertical or horizontal sides have the same color).
// Given n the number of rows of the grid, return the number of ways you can paint this grid. As the answer may grow large, the answer must be computed modulo 10^9 + 7.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(i, a, b, c), where 
  // i = row number
  // (a, b, c) = values from the previous row

// For each row i, try every valid combination of new row values.
  // Adjacent colors cannot be equal.
  // Check that a color is not the same as the previous color and the color directly above it.

// Time Complexity: O(n * 3^3 * 3^3) 1257ms
// Space Complexity: O(n * 3^3) 104.8MB
var numOfWays = function(n) {
  let mod = 10 ** 9 + 7, memo = Array(n).fill(0).map(() => Array(4).fill(0).map(() => Array(4).fill(0).map(() => Array(4).fill(-1))));
  return dp(0, 3, 3, 3);
  
  function dp(i, a, b, c) { 
    if (i === n) return 1;
    if (memo[i][a][b][c] !== -1) return memo[i][a][b][c];
    
    let ways = 0;
    for (let newA = 0; newA < 3; newA++) {
      if (newA === a) continue;
      for (let newB = 0; newB < 3; newB++) {
        if (newA === newB || newB === b) continue;
        for (let newC = 0; newC < 3; newC++) {
          if (newB === newC || newC === c) continue;
          ways = (ways + dp(i + 1, newA, newB, newC)) % mod;
        }
      }
    }
    return memo[i][a][b][c] = ways;
  }
};

// Two test cases to run function on
console.log(numOfWays(1)) // 12
console.log(numOfWays(500)) // 350959293