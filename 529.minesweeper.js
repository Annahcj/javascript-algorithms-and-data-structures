// 529. Minesweeper
// You are given an m x n char matrix board representing the game board where:
// 'M' represents an unrevealed mine,
// 'E' represents an unrevealed empty square,
// 'B' represents a revealed blank square that has no adjacent mines (i.e., above, below, left, right, and all 4 diagonals),
// digit ('1' to '8') represents how many mines are adjacent to this revealed square, and
// 'X' represents a revealed mine.
// You are also given an integer array click where click = [clickr, clickc] represents the next click position among all the unrevealed squares ('M' or 'E').
// Return the board after revealing this position according to the following rules:
// If a mine 'M' is revealed, then the game is over. You should change it to 'X'.
// If an empty square 'E' with no adjacent mines is revealed, then change it to a revealed blank 'B' and all of its adjacent unrevealed squares should be revealed recursively.
// If an empty square 'E' with at least one adjacent mine is revealed, then change it to a digit ('1' to '8') representing the number of adjacent mines.
// Return the board when no more squares will be revealed.


// Solution 1: BFS

// Initiate a new queue, with the first coordinates [click[0], click[1]]
// Keep shifting from the queue until it becomes empty
  // x = row position, y = column position
  // count the number of mines in the eight adjacent positions, push new empty cells into an array 'nextCells'
  // if there are mines (mines > 0), change board[x][y] to the number of mines
  // otherwise,
    // change board[x][y] into 'B'
    // loop through the coordinates [row, col] in nextCells
      // push [row, col] into queue
      // change board[row][col] into 'B' (to avoid being added again)
// Return board.

// Time Complexity: O(n) 163ms
// Space Complexity: O(n) 44.4MB
var updateBoard = function(board, click) {
  let [i, j] = click;
  let width = board[0].length, length = board.length;
  if (board[i][j] === 'M') {
    board[i][j] = 'X';
    return board;
  }
  let queue = [[i, j]];
  while (queue.length) {
    let [x, y] = queue.shift();
    let mines = 0, nextCells = [];
    for (var newX = x - 1; newX <= x + 1; newX++) {
      for (var newY = y - 1; newY <= y + 1; newY++) {
        if (newX > -1 && newX < length && newY > -1 && newY < width && (newX !== x || newY !== y)) {
          let cell = board[newX][newY];
          if (cell === 'M') mines++;
          else if (cell === 'E') nextCells.push([newX, newY]);
        }
      }
    }
    if (mines) board[x][y] = mines.toString();
    else {
      board[x][y] = 'B';
      for (var [row, col] of nextCells) {
        next.push([row, col]);
        board[row][col] = 'B';
      }
    }
  }
  return board;
};

// Solution 2: BFS with Two Queues

// Almost the same as solution 1, except we use two queues, working in a level-by-level manner so that items are popped from the end and not shifted from the beginning of the queue.

// Time Complexity: O(n) 134ms
// Space Complexity: O(n) 44.4MB
var updateBoard = function(board, click) {
  let [i, j] = click;
  let width = board[0].length, length = board.length;
  if (board[i][j] === 'M') {
    board[i][j] = 'X';
    return board;
  }
  let queue = [[i, j]];
  while (queue.length) {
    let next = [];
    while (queue.length) {
      let [x, y] = queue.pop();
      let mines = 0, nextCells = [];
      for (var newX = x - 1; newX <= x + 1; newX++) {
        for (var newY = y - 1; newY <= y + 1; newY++) {
          if (newX > -1 && newX < length && newY > -1 && newY < width && (newX !== x || newY !== y)) {
            let cell = board[newX][newY];
            if (cell === 'M') mines++;
            else if (cell === 'E') nextCells.push([newX, newY]);
          }
        }
      }
      if (mines) board[x][y] = mines.toString();
      else {
        board[x][y] = 'B';
        for (var [row, col] of nextCells) {
          next.push([row, col]);
          board[row][col] = 'B';
        }
      }
    }
    queue = next;
  }
  return board;
};

// Solution 3: Recursive DFS

// Using recursion instead of a queue.

// Time Complexity: O(n) 124ms
// Space Complexity: O(n) (call stack) 46.6MB
var updateBoard = function(board, click) {
  let [i, j] = click;
  let width = board[0].length, length = board.length;
  if (board[i][j] === 'M') {
    board[i][j] = 'X';
    return board;
  }
  dfs(i, j);
  return board;
  function dfs(x, y) {
    let mines = 0, nextCells = [];
    for (var newX = x - 1; newX <= x + 1; newX++) {
      for (var newY = y - 1; newY <= y + 1; newY++) {
        if (newX > -1 && newX < length && newY > -1 && newY < width && (newX !== x || newY !== y)) {
          let cell = board[newX][newY];
          if (cell === 'M') mines++;
          else if (cell === 'E') nextCells.push([newX, newY]);
        }
      }
    }
    if (mines > 0) board[x][y] = mines.toString();
    else {
      board[x][y] = 'B';
      for (var [row, col] of nextCells) {
        board[row][col] = 'B';
        dfs(row, col);
      }
    }
  }
};

// Three test cases to run function on
console.log(updateBoard([['E','E','E'], ['E','E','E'],['E','E','E']], [2,0]))
console.log(updateBoard([["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]], [3,0])) // [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]
console.log(updateBoard([["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]], [1,2])) // [["B","1","E","1","B"],["B","1","X","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]