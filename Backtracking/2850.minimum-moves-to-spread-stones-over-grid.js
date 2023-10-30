// 2850. Minimum Moves to Spread Stones Over Grid
// You are given a 0-indexed 2D integer matrix grid of size 3 * 3, representing the number of stones in each cell. The grid contains exactly 9 stones, and there can be multiple stones in a single cell.
// In one move, you can move a single stone from its current cell to any other cell if the two cells share a side.
// Return the minimum number of moves required to place one stone in each cell.

 
// Solution: Backtracking 

// For each cell with no stones, use backtracking to try each possibility of getting a stone from another cell.

// For each cells with no stones, there are at most three other cells with more than one stone (if three cells have 2 stones, then no other cells can have more than one stone).
// For each grid state, we go over each cell (n^2), and there are three possiblities for each empty cell. Time complexity is O(3^(n^2))

// Time Complexity: O(3^(n^2)) 372ms
// Space Complexity: O(n^2) 42.5MB
var minimumMoves = function(grid) {
  if (isComplete(grid)) return 0;

  let ans = Infinity;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (grid[row][col] === 0) { 
        for (let row2 = 0; row2 < 3; row2++) {
          for (let col2 = 0; col2 < 3; col2++) {
            if (grid[row2][col2] > 1) {
              grid[row][col]++;
              grid[row2][col2]--;
              let dist = Math.abs(row - row2) + Math.abs(col - col2);
              ans = Math.min(ans, dist + minimumMoves(grid));
              grid[row][col]--;
              grid[row2][col2]++;
            }
          }
        }
      }
    }
  }
  return ans;
};

function isComplete(grid) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] !== 1) return false;
    }
  }
  return true;
}

// Two test cases
console.log(minimumMoves([[1,1,0],[1,1,1],[1,2,1]])) // 3
console.log(minimumMoves([[1,3,0],[1,0,0],[1,0,3]])) // 4