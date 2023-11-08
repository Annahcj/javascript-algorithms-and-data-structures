// 1001. Grid Illumination
// There is a 2D grid of size n x n where each cell of this grid has a lamp that is initially turned off.
// You are given a 2D array of lamp positions lamps, where lamps[i] = [rowi, coli] indicates that the lamp at grid[rowi][coli] is turned on. Even if the same lamp is listed more than once, it is turned on.
// When a lamp is turned on, it illuminates its cell and all other cells in the same row, column, or diagonal.
// You are also given another 2D array queries, where queries[j] = [rowj, colj]. For the jth query, determine whether grid[rowj][colj] is illuminated or not. After answering the jth query, turn off the lamp at grid[rowj][colj] and its 8 adjacent lamps if they exist. A lamp is adjacent if its cell shares either a side or corner with grid[rowj][colj].
// Return an array of integers ans, where ans[j] should be 1 if the cell in the jth query was illuminated, or 0 if the lamp was not.


// Solution: Hashmaps

// Use hashmaps to count the number of lamps in each row, column, L-R diagonal, and R-L diagonal.
// Because we use a hashmap, we have at maximum lamps.length * 4 values.

// For each query, 
  // Check whether any of the hashmaps contain the current cell's coordinates.
  // Update each hashmap to decrement the counts for the current cell and each adjacent cell.

// m = number of lamps, k = number of queries
// Time Complexity: O(m + 8k) 454ms
// Space Complexity: O(4m) 115MB
var gridIllumination = function(n, lamps, queries) {
  let rowMap = {}, colMap = {}, diagonalMap = {}, antiDiagonalMap = {};
  let lampsSet = new Set();
  for (let [x, y] of lamps) {
    if (lampsSet.has(`${x},${y}`)) continue;
    lampsSet.add(`${x},${y}`);
    rowMap[x] = (rowMap[x] || 0) + 1;
    colMap[y] = (colMap[y] || 0) + 1;
    diagonalMap[x - y] = (diagonalMap[x - y] || 0) + 1;
    antiDiagonalMap[x + y] = (antiDiagonalMap[x + y] || 0) + 1;
  }
  let ans = [];
  const directions = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];
  for (let [row, col] of queries) {
    let illuminated = !!rowMap[row] || !!colMap[col] || !!diagonalMap[row - col] || !!antiDiagonalMap[row + col];
    ans.push(illuminated ? 1 : 0);
    
    if (lampsSet.has(`${row},${col}`)) {
      decrementCounts(row, col);
      lampsSet.delete(`${row},${col}`);
    }
    for (let [x, y] of directions) {
      let newRow = row + x, newCol = col + y;
      if (newRow < 0 || newRow >= n || newCol < 0 || newCol >= n) continue;
      if (lampsSet.has(`${newRow},${newCol}`)) {
        decrementCounts(newRow, newCol);
        lampsSet.delete(`${newRow},${newCol}`);
      }
    }
  }
  return ans;
  
  function decrementCounts(row, col) {
    rowMap[row]--;
    colMap[col]--;
    diagonalMap[row - col]--;
    antiDiagonalMap[row + col]--;
  }
};

// Three test cases
console.log(gridIllumination(5, [[0,0],[4,4]], [[1,1],[1,0]])) // [1,0]
console.log(gridIllumination(5, [[0,0],[4,4]], [[1,1],[1,1]])) // [1,1]
console.log(gridIllumination(5, [[0,0],[0,4]], [[0,4],[0,1],[1,4]])) // [1,1,0]