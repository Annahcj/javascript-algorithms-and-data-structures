// 1728. Cat and Mouse II
// A game is played by a cat and a mouse named Cat and Mouse.
// The environment is represented by a grid of size rows x cols, where each element is a wall, floor, player (Cat, Mouse), or food.
  // Players are represented by the characters 'C'(Cat),'M'(Mouse).
  // Floors are represented by the character '.' and can be walked on.
  // Walls are represented by the character '#' and cannot be walked on.
  // Food is represented by the character 'F' and can be walked on.
  // There is only one of each character 'C', 'M', and 'F' in grid.
// Mouse and Cat play according to the following rules:
  // Mouse moves first, then they take turns to move.
  // During each turn, Cat and Mouse can jump in one of the four directions (left, right, up, down). They cannot jump over the wall nor outside of the grid.
  // catJump, mouseJump are the maximum lengths Cat and Mouse can jump at a time, respectively. Cat and Mouse can jump less than the maximum length.
  // Staying in the same position is allowed.
  // Mouse can jump over Cat.
// The game can end in 4 ways:
  // If Cat occupies the same position as Mouse, Cat wins.
  // If Cat reaches the food first, Cat wins.
  // If Mouse reaches the food first, Mouse wins.
  // If Mouse cannot get to the food within 1000 turns, Cat wins.
// Given a rows x cols matrix grid and two integers catJump and mouseJump, return true if Mouse can win the game if both Cat and Mouse play optimally, otherwise return false.


// Solution: DP - Recursion w/ Memoization 

// Memoize each dp(mouseRow, mouseColumn, catRow, catColumn, turn, mouseMoves)
// There are at most 64 * 64 * 2 * 128 possible states.
  // The cat and mouse positions can be up to 64 * 64 possible combinations.
  // mouseMoves: If the mouse can't reach the food within m * n * 2 moves, the cat will always win.

// For each move, try every length of jump (<= catJump/mouseJump) in every direction.

// Time Complexity: O((mn)^2 * 2mn * m+n) 3838ms
// Space Complexity: O((mn)^2 * 2mn) 93MB
var canMouseWin = function(grid, catJump, mouseJump) {
  const directions = [[0, 1], [-1, 0], [1, 0], [0, -1]];
  let memo = new Map();
  let m = grid.length, n = grid[0].length;
  let mouseRow, mouseCol, catRow, catCol;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 'M') {
        mouseRow = i, mouseCol = j;
      } else if (grid[i][j] === 'C') {
        catRow = i, catCol = j;
      }
    }
  }
  return dp(mouseRow, mouseCol, catRow, catCol, 0, 0);
  
  function dp(mouseRow, mouseCol, catRow, catCol, turn, mouseMoves) {
    if (mouseMoves > m * n * 2) return false; 
    if (catRow === mouseRow && catCol === mouseCol) return false;
    if (grid[catRow][catCol] === 'F') return false;
    if (grid[mouseRow][mouseCol] === 'F') return true;
    let key = `${mouseRow},${mouseCol},${catRow},${catCol},${turn},${mouseMoves}`;
    if (memo.has(key)) return memo.get(key);
    
    for (let [x, y] of directions) {
      if (turn === 0) { // mouse's turn
        let newRow = mouseRow + x, newCol = mouseCol + y;
        let currMoves = 1;
        while (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n && grid[newRow][newCol] !== '#' && currMoves <= mouseJump) {
          if (dp(newRow, newCol, catRow, catCol, 1, mouseMoves + 1)) {
            memo.set(key, true);
            return true;
          }  
          newRow += x, newCol += y;
          currMoves++;
        }
      } else { // cat's turn
        let newRow = catRow + x, newCol = catCol + y;
        let currMoves = 1;
        while (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n && grid[newRow][newCol] !== '#' && currMoves <= catJump) {
          if (!dp(mouseRow, mouseCol, newRow, newCol, 0, mouseMoves)) {
            memo.set(key, false);
            return false;
          }  
          newRow += x, newCol += y;
          currMoves++;
        }
      }
    }
    let samePosition = turn === 0 ? dp(mouseRow, mouseCol, catRow, catCol, 1, mouseMoves + 1) : dp(mouseRow, mouseCol, catRow, catCol, 0, mouseMoves);
    memo.set(key, samePosition);
    return samePosition;
  }  
};

// Three test cases
console.log(canMouseWin(["####F","#C...","M...."], 1, 2)) // true
console.log(canMouseWin(["M.C...F"], 1, 4)) // true
console.log(canMouseWin(["M.C...F"], 1, 3)) // false