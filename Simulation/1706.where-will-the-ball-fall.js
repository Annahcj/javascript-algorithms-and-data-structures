// 1706. Where Will the Ball Fall
// You have a 2-D grid of size m x n representing a box, and you have n balls. The box is open on the top and bottom sides.
// Each cell in the box has a diagonal board spanning two corners of the cell that can redirect a ball to the right or to the left.
  // A board that redirects the ball to the right spans the top-left corner to the bottom-right corner and is represented in the grid as 1.
  // A board that redirects the ball to the left spans the top-right corner to the bottom-left corner and is represented in the grid as -1.
// We drop one ball at the top of each column of the box. Each ball can get stuck in the box or fall out of the bottom. A ball gets stuck if it hits a "V" shaped pattern between two boards or if a board redirects the ball into either wall of the box.
// Return an array answer of size n where answer[i] is the column that the ball falls out of at the bottom after dropping the ball from the ith column at the top, or -1 if the ball gets stuck in the box.


// Solution: Simulation 

// For each ball, we can go through row by row:
  // For each row, we can move it two possible directions:
    // 1 -> 1 (\ \): Which means we move 1 column to the right.
    // -1 -> -1 (/ /): Which means we move 1 column to the left.
    // If 1 -> -1 (\ /): The ball will get stuck.
  // Then, we move down a row and repeat the above.
// Credit to lee215 

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 141ms
// Space Complexity: O(n) 44.8MB
var findBall = function(grid) {
  let m = grid.length, n = grid[0].length;
  let res = Array(n);
  for (let j = 0; j < n; j++) {
    let col = j;
    for (let i = 0; i < m; i++) {
      let newCol = col + grid[i][col];
      if (newCol < 0 || newCol >= n || grid[i][col] !== grid[i][newCol]) {
        col = -1;
        break;
      }
      col = newCol;
    }
    res[j] = col;
  }
  return res;
};

// Three test cases
console.log(findBall([[1,1,1,-1,-1],[1,1,1,-1,-1],[-1,-1,-1,1,1],[1,1,1,1,-1],[-1,-1,-1,-1,-1]])) // [1,-1,-1,-1,-1]
console.log(findBall([[-1]])) // [-1]
console.log(findBall([[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1],[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1]])) // [0,1,2,3,4,-1]