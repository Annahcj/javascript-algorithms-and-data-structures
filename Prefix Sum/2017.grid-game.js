// 2017. Grid Game
// You are given a 0-indexed 2D array grid of size 2 x n, where grid[r][c] represents the number of points at position (r, c) on the matrix. Two robots are playing a game on this matrix.
// Both robots initially start at (0, 0) and want to reach (1, n-1). Each robot may only move to the right ((r, c) to (r, c + 1)) or down ((r, c) to (r + 1, c)).
// At the start of the game, the first robot moves from (0, 0) to (1, n-1), collecting all the points from the cells on its path. For all cells (r, c) traversed on the path, grid[r][c] is set to 0. Then, the second robot moves from (0, 0) to (1, n-1), collecting the points on its path. Note that their paths may intersect with one another.
// The first robot wants to minimize the number of points collected by the second robot. In contrast, the second robot wants to maximize the number of points it collects. If both robots play optimally, return the number of points collected by the second robot.


// Solution: Prefix Sum

// The first approach that comes to mind is to maximize the number of points for the first robot, turn them into 0, then maximize the number of points for the second robot.
// However, this is a misconception which yields an incorrect answer.
// One must literally minimize the number of points collected by the second robot.
// We notice that the robot can only move downward once, so we try all the paths where the first robot moves down.

// In a path where the first robot passes through, those points would now all be worth 0. 
// We calculate the total sum of the points on the upper row, and store in a variable 'upper'
// We set a variable 'lower' to 0, as we will be adding to it as we go, and removing from upper at the same time.
// Set ans (answer) to Infinity

// Loop through the length of a row in grid (pointer = j)
  // (this is basically robot1 going down to grid[1][j] as a simulation path)
  // decrement upper by grid[0][j] (robot2 can never collect the starting value)
  // let ans be Math.min(ans, Math.max(upper, lower)) (robot2 will take the best path, max(upper, lower), and we need to take the minimum path for robot2)
  // increment lower by grid[1][j] 
// Return ans

// Time Complexity: O(n) 108ms
// Space Complexity: O(1) 51MB
var gridGame = function(grid) {
  let n = grid[0].length;
  let upper = 0, lower = 0;
  let ans = Infinity;
  for (let j = 0; j < n; j++) upper += grid[0][j];
  for (let j = 0; j < n; j++) {
    upper -= grid[0][j];
    ans = Math.min(ans, Math.max(upper, lower));
    lower += grid[1][j];
  }
  return ans;
};

// Four test cases
console.log(gridGame([[20,3,20,17,2,12,15,17,4,15],[20,10,13,14,15,5,2,3,14,3]])) // 63
console.log(gridGame([[2,5,4],[1,5,1]])) // 4
console.log(gridGame([[3,3,1],[8,5,2]])) // 4
console.log(gridGame([[1,3,1,15],[1,3,3,1]])) // 7