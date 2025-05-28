// 3552. Grid Teleportation Traversal
// You are given a 2D character grid matrix of size m x n, represented as an array of strings, where matrix[i][j] represents the cell at the intersection of the ith row and jth column. Each cell is one of the following:
  // '.' representing an empty cell.
  // '#' representing an obstacle.
  // An uppercase letter ('A'-'Z') representing a teleportation portal.
// You start at the top-left cell (0, 0), and your goal is to reach the bottom-right cell (m - 1, n - 1). You can move from the current cell to any adjacent cell (up, down, left, right) as long as the destination cell is within the grid bounds and is not an obstacle.
// If you step on a cell containing a portal letter and you haven't used that portal letter before, you may instantly teleport to any other cell in the grid with the same letter. This teleportation does not count as a move, but each portal letter can be used at most once during your journey.
// Return the minimum number of moves required to reach the bottom-right cell. If it is not possible to reach the destination, return -1.


// Solution: BFS

// BFS to find the minimum moves to reach each cell.
// We only visit each cell once, the first time is the minimum number of moves.

// We will never use the same portal letter more than once because using a portal letter more than once would result in a greater number of moves.
// Hence, naturally we wouldn't use the same portal letter more than once.

// If the first cell is a portal letter, we can visit all connected portals in 0 moves.
// When visiting neighbor cells, if the neighbor cell is a portal letter, visit all connected portals in the same move.

// At the end, return the moves taken to reach the bottom right cell.

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 2554ms
// Space Complexity: O(mn) 149MB
function minMoves(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const moves = Array(m).fill(0).map(() => Array(n).fill(Infinity));
  const portalCells = Array(26).fill(0).map(() => []);
  let queue = [];
  if (matrix[0][0] === '.') {
    queue.push([0, 0]);
    moves[0][0] = 0;
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === '#' || matrix[i][j] === '.') continue;
      portalCells[matrix[i].charCodeAt(j) - 65].push([i, j]);
      if (matrix[i][j] === matrix[0][0]) {
        queue.push([i, j]);
        moves[i][j] = 0;
      }
    }
  }
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let currMoves = 0;
  while (queue.length) {
    const next = [];
    while (queue.length) {
      const [row, col] = queue.pop();
      for (let [x, y] of directions) {
        const newRow = row + x, newCol = col + y;
        if (
          newRow < 0 ||
          newRow >= m ||
          newCol < 0 ||
          newCol >= n ||
          matrix[newRow][newCol] === '#' ||
          moves[newRow][newCol] !== Infinity
        ) continue;
        if (matrix[newRow][newCol] === '.') {
          next.push([newRow, newCol]);
          moves[newRow][newCol] = currMoves + 1;
        } else {
          for (let [portalCellRow, portalCellCol] of portalCells[matrix[newRow].charCodeAt(newCol) - 65]) {
            next.push([portalCellRow, portalCellCol]);
            moves[portalCellRow][portalCellCol] = currMoves + 1;
          }
        }
      }
    }
    queue = next;
    currMoves++;
  }
  return moves[m - 1][n - 1] === Infinity ? -1 : moves[m - 1][n - 1];
};

// Two test cases
console.log(minMoves(["A..",".A.","..."])) // 2
console.log(minMoves([".#...",".#.#.",".#.#.","...#."])) // 13