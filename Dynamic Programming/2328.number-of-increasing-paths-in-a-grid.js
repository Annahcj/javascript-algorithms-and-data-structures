// 2328. Number of Increasing Paths in a Grid
// You are given an m x n integer matrix grid, where you can move from a cell to any adjacent cell in all 4 directions.
// Return the number of strictly increasing paths in the grid such that you can start from any cell and end at any cell. Since the answer may be very large, return it modulo 10^9 + 7.
// Two paths are considered different if they do not have exactly the same sequence of visited cells.


// Solution: DFS w/ Recursion & Memoization

// DFS from every cell to count the number of paths from each cell.
// Memoize the results of each dfs(row, column).
// This solution works because each path must be strictly increasing, insuring that we never revisit a cell.

// Time Complexity: O(mn) 450ms
// Space Complexity: O(mn) 86.7MB
var countPaths = function(grid) {
  let m = grid.length, n = grid[0].length, mod = 10 ** 9 + 7;
  let ans = 0, memo = Array(m).fill(0).map(() => Array(n).fill(-1));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      ans = (ans + dfs(i, j)) % mod;
    }
  }
  return ans;

  function dfs(i, j) {
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    if (memo[i][j] !== -1) return memo[i][j];
    let ans = 1;
    for (let [x, y] of directions) {
      let newX = i + x, newY = j + y;
      if (newX < 0 || newX >= m || newY < 0 || newY >= n || grid[newX][newY] <= grid[i][j]) continue;
      ans = (ans + dfs(newX, newY)) % mod;
    }
    return memo[i][j] = ans;
  }     
};

// Two test cases
console.log(countPaths([[1,1],[3,4]])) // 8
console.log(countPaths([[1],[2]])) // 3