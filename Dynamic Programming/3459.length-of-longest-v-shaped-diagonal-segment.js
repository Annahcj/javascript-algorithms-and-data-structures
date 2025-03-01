// 3459. Length of Longest V-Shaped Diagonal Segment
// You are given a 2D integer matrix grid of size n x m, where each element is either 0, 1, or 2.
// A V-shaped diagonal segment is defined as:
  // The segment starts with 1.
  // The subsequent elements follow this infinite sequence: 2, 0, 2, 0, ....
  // The segment:
    // Starts along a diagonal direction (top-left to bottom-right, bottom-right to top-left, top-right to bottom-left, or bottom-left to top-right).
    // Continues the sequence in the same diagonal direction.
    // Makes at most one clockwise 90-degree turn to another diagonal direction while maintaining the sequence.


// Solution: DP

// Memoize every dp(row, col, dir, hasPivoted), where
  // dir = the current direction we are heading.
  // hasPivoted = boolean indicating if have turned direction once already.

// For every dp(row, col, dir, hasPivoted),
  // We have two choices:
    // 1. Go straight in the same direction.
    // 2. Turn 90 degrees clockwise if we haven't pivoted before.
  // Traversal is only possible if the next cell has the alternate value (2 -> 0, 0 -> 2).
  // Base case: If there are no valid next cells.
  // Memoize and return the longest path out of all options.

// Time Complexity: O(mn * 4 * 2 * 3)
// Space Complexity: O(mn * 4 * 2)
function lenOfVDiagonal(grid) {
  const m = grid.length, n = grid[0].length;
  const memo = Array(m).fill(0).map(() => Array(n).fill(0).map(() => Array(4).fill(0).map(() => Array(2).fill(-1))));
  // 0 = top left -> bottom right, 1 = top right -> bottom left, 2 = bottom left -> top right, 3 = bottom right -> top left
  const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  const nextClockwiseDir = [1, 3, 0, 2];
  let maxLen = -Infinity;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        for (let dir = 0; dir <= 3; dir++) {
          maxLen = Math.max(maxLen, dp(i, j, dir, 0, 1));
        }
      }
    }
  }
  return maxLen > -Infinity ? maxLen : 0;

  function dp(row, col, dir, hasPivoted, expectedValue) {
    if (row < 0 || row >= m || col < 0 || col >= n || grid[row][col] !== expectedValue) return -Infinity;
    if (memo[row][col][dir][hasPivoted] !== -1) return memo[row][col][dir][hasPivoted];

    const expectedNextValue = grid[row][col] === 1 ? 2 : 2 - grid[row][col];
    let maxLen = Math.max(1, 1 + dp(row + directions[dir][0], col + directions[dir][1], dir, hasPivoted, expectedNextValue));
    if (!hasPivoted) {
      const nextDir = nextClockwiseDir[dir];
      maxLen = Math.max(maxLen, 1 + dp(row + directions[nextDir][0], col + directions[nextDir][1], nextDir, 1, expectedNextValue));
    }
    return memo[row][col][dir][hasPivoted] = maxLen;
  }
};

// Three test cases
console.log(lenOfVDiagonal([[2,2,2,2,2],[2,0,2,2,0],[2,0,1,1,0],[1,0,2,2,2],[2,0,0,2,2]])) // 4
console.log(lenOfVDiagonal([[1]])) // 1
console.log(lenOfVDiagonal([[1,1,1,2,0,0],[0,0,0,0,1,2]])) // 2