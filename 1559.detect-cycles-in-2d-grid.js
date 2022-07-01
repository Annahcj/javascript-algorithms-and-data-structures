// 1559. Detect Cycles in 2D Grid
// Given a 2D array of characters grid of size m x n, you need to find if there exists any cycle consisting of the same value in grid.
// A cycle is a path of length 4 or more in the grid that starts and ends at the same cell. From a given cell, you can move to one of the cells adjacent to it - in one of the four directions (up, down, left, or right), if it has the same value of the current cell.
// Also, you cannot move to the cell that you visited in your last move. For example, the cycle (1, 1) -> (1, 2) -> (1, 1) is invalid because from (1, 2) we visited (1, 1) which was the last visited cell.
// Return true if any cycle of the same value exists in grid, otherwise, return false.


// Solution: DFS

// DFS from each unvisited cell in grid.
// Avoid visiting the previous cell we just came from.
// When we get to a cell we have seen before, we have a cycle.

// Time Complexity: O(mn) 481ms
// Space Complexity: O(mn) 119.6MB
var containsCycle = function(grid) {
  let m = grid.length, n = grid[0].length;
  let seen = Array(m).fill(0).map(() => Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!seen[i][j] && hasCycle(i, j, -1, -1)) { 
        return true;
      }
    }
  }
  return false;
  
  function hasCycle(row, col, prevRow, prevCol) {
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    seen[row][col] = 1;
    for (let [x, y] of directions) {
      let newX = row + x, newY = col + y;
      if (newX < 0 || newX >= m || newY < 0 || newY >= n) continue; // out of bounds
      if (grid[newX][newY] !== grid[row][col] || (newX === prevRow && newY === prevCol)) continue; // value not the same OR visiting cell we just came from
      if (seen[newX][newY]) return true; // found a cycle
      if (hasCycle(newX, newY, row, col)) return true; 
    }
    return false;
  }
};

// Three test cases to run function on
console.log(containsCycle([["a","a","a","a"],["a","b","b","a"],["a","b","b","a"],["a","a","a","a"]])) // true
console.log(containsCycle([["c","c","c","a"],["c","d","c","c"],["c","c","e","c"],["f","c","c","c"]])) // true
console.log(containsCycle([["a","b","b"],["b","z","b"],["b","b","a"]])) // false