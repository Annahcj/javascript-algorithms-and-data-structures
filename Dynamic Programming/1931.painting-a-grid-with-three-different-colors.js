// 1931. Painting a Grid With Three Different Colors
// You are given two integers m and n. Consider an m x n grid where each cell is initially white. You can paint each cell red, green, or blue. All cells must be painted.
// Return the number of ways to color the grid with no two adjacent cells having the same color. Since the answer can be very large, return it modulo 10^9 + 7.


// Solution: DP 

// Since m <= 5, make m the number of columns and n the number of rows.
// Keep track of the previous row of colors.
// Since we can't have adjacent cells with the same color, there are maximum 3*2*2*2*2 = 48 combinations of a row, without considering adjacent colors in the previous row.

// Memoize each dp(prevRow, rowNumber), where the length of prevRow is m.
// For each dp(prevRow, rowNumber), we try all possibilities of the current row and count the number of different ways.

// k = maximum combinations of one row with no adjacent same colors
// Time Complexity: O(n * k^2) 1550ms
// Space Complexity: O(nk) 62.7MB
var colorTheGrid = function(m, n) {
  let memo = new Map(), MOD = 10 ** 9 + 7;
  return dp(Array(m).fill(0), 0);
  
  function dp(prevRow, rowNumber) {
    if (rowNumber === n) return 1;
    let key = `${prevRow.join(",")},${rowNumber}`;
    if (memo.has(key)) return memo.get(key);
    
    let newRowOptions = getNewRows(prevRow);
    let ways = 0;
    for (let row of newRowOptions) {
      ways = (ways + dp(row, rowNumber + 1)) % MOD;
    }
    memo.set(key, ways);
    return ways;
  }
  
  function getNewRows(prevRow) {
    let rows = [];
    backtrack([], prevRow, rows);
    return rows;
  }
  
  function backtrack(row, prevRow, rows) {
    if (row.length === prevRow.length) {
      rows.push([...row]);
      return;
    }
    // 1 = red, 2 = green, 3 = blue
    let index = row.length;
    for (let color = 1; color <= 3; color++) {
      if (color === prevRow[index]) continue; // same color vertically adjacent
      if (index > 0 && color === row[row.length - 1]) continue; // same color horizontally adjacent
      row.push(color);
      backtrack(row, prevRow, rows);
      row.pop();
    }
  }
}; 

// Three test cases
console.log(colorTheGrid(1, 1)) // 3
console.log(colorTheGrid(1, 2)) // 6
console.log(colorTheGrid(5, 5)) // 580986