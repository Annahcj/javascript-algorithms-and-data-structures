// 2257. Count Unguarded Cells in the Grid
// You are given two integers m and n representing a 0-indexed m x n grid. You are also given two 2D integer arrays guards and walls where guards[i] = [rowi, coli] and walls[j] = [rowj, colj] represent the positions of the ith guard and jth wall respectively.
// A guard can see every cell in the four cardinal directions (north, east, south, or west) starting from their position unless obstructed by a wall or another guard. A cell is guarded if there is at least one guard that can see it.
// Return the number of unoccupied cells that are not guarded.


// Solution: Simulation

// For each guard, traverse as far as possible in all four directions.
  // When we reach a wall or a guard, or an edge, break.

// We don't have to visit guard cells in a path 
// because we know that this direction will be covered by that guard cell (will be already covered or will be covered later).

// For each grid[i][j],
  // 0 = unvisited
  // 1 = visited
  // 2 = wall or guard

// Time Complexity: O(mn) 535ms
// Space Complexity: O(mn) 91.8MB
var countUnguarded = function(m, n, guards, walls) {
  let grid = Array(m).fill(0).map(() => Array(n).fill(0));
  let cells = m * n - guards.length - walls.length;
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  
  for (let [row, col] of walls) {
    grid[row][col] = 2; // wall
  }
  for (let [row, col] of guards) {
    grid[row][col] = 2; // guard
  }
  
  for (let [row, col] of guards) {
    for (let [x, y] of directions) {
      let r = row + x, c = col + y;
      
      while (r >= 0 && r < m && c >= 0 && c < n) {
        if (grid[r][c] === 2) break; // don't visit guards or walls
        if (grid[r][c] === 0) cells--;
        grid[r][c] = 1;
        r += x, c += y;
      }
    }
  }
  return cells;
};

// Two test cases to run function on
console.log(countUnguarded(4, 6, [[0,0],[1,1],[2,3]], [[0,1],[2,2],[1,4]])) // 7
console.log(countUnguarded(3, 3, [[1,1]], [[0,1],[1,0],[2,1],[1,2]])) // 4