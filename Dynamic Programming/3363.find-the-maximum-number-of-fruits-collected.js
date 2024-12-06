// 3363. Find the Maximum Number of Fruits Collected
// There is a game dungeon comprised of n x n rooms arranged in a grid.
// You are given a 2D array fruits of size n x n, where fruits[i][j] represents the number of fruits in the room (i, j). Three children will play in the game dungeon, with initial positions at the corner rooms (0, 0), (0, n - 1), and (n - 1, 0).
// The children will make exactly n - 1 moves according to the following rules to reach the room (n - 1, n - 1):
  // The child starting from (0, 0) must move from their current room (i, j) to one of the rooms (i + 1, j + 1), (i + 1, j), and (i, j + 1) if the target room exists.
  // The child starting from (0, n - 1) must move from their current room (i, j) to one of the rooms (i + 1, j - 1), (i + 1, j), and (i + 1, j + 1) if the target room exists.
  // The child starting from (n - 1, 0) must move from their current room (i, j) to one of the rooms (i - 1, j + 1), (i, j + 1), and (i + 1, j + 1) if the target room exists.
// When a child enters a room, they will collect all the fruits there. If two or more children enter the same room, only one child will collect the fruits, and the room will be emptied after they leave.
// Return the maximum number of fruits the children can collect from the dungeon.


// Solution: DP

// Observe that the child starting at (0, 0) has only one valid path - going diagonally straight to (n - 1, n - 1).
// The child starting at (0, n - 1) can never down and left more than floor((n - 1) / 2) steps, because otherwise it cannot reach (n - 1, n - 1).
// The child starting at (n - 1, 0) can never go up and right more than floor((n - 1) / 2) steps, because otherwise it cannot reach (n - 1, n - 1).

// The conclusion is that the paths of the other two children (0, n - 1) and (n - 1, 0) will never overlap, with the exception of the first child's path.
// 1. Count the total score for the first child (0, 0) diagonally down and right to (n - 1, n - 1).
// 2. DP from (0, n - 1) to find the maximum score to reach (n - 1, n - 1), skipping any scores from the first child's path.
// 3. DP from (n - 1, 0) to find the maximum score to reach (n - 1, n - 1), skipping any scores from the first child's path.

// Time Complexity: O(n^2) 58ms
// Space Complexity: O(n) 82.2MB
function maxCollectedFruits(fruits) {
  let diagonalScore = 0;
  for (let i = 0; i < fruits.length; i++) {
    diagonalScore += fruits[i][i];
  }
  return diagonalScore + maxScoreFromBottomLeft(fruits) + maxScoreFromTopRight(fruits);
};

function maxScoreFromBottomLeft(fruits) {
  const n = fruits.length;
  let prevCol = Array(n).fill(0); // previous column's scores
  for (let j = 0; j < n; j++) {
    const currCol = Array(n).fill(0);
    // minimum row for this column is n - 1 - j as it's not possible to reach positions further up and left due to the moves of the bottom left child
    for (let i = n - 1 - j; i < n; i++) {
      const leftUp = i > 0 ? prevCol[i - 1] : 0;
      const left = prevCol[i];
      const leftDown = i < n - 1 ? prevCol[i + 1] : 0;
      const currScore = i === j ? 0 : fruits[i][j];
      currCol[i] = currScore + Math.max(leftUp, left, leftDown);
    }
    prevCol = currCol;
  }
  return prevCol[n - 1];
}

function maxScoreFromTopRight(fruits) {
  const n = fruits.length;
  let prevRow = Array(n).fill(0); // previous row's scores
  for (let i = 0; i < n; i++) {
    const currRow = Array(n).fill(0);
    // minimum col for this row is n - 1 - i as it's not possible to reach positions further left and up due to the moves of the top right child
    for (let j = n - 1 - i; j < n; j++) {
      const topLeft = j > 0 ? prevRow[j - 1] : 0;
      const top = prevRow[j];
      const topRight = j < n - 1 ? prevRow[j + 1] : 0;
      const currScore = i === j ? 0 : fruits[i][j];
      currRow[j] = currScore + Math.max(topLeft, top, topRight); 
    }
    prevRow = currRow;
  }
  return prevRow[n - 1];
}

// Two test cases
console.log(maxCollectedFruits([[1,2,3,4],[5,6,8,7],[9,10,11,12],[13,14,15,16]])) // 100
console.log(maxCollectedFruits([[1,1],[1,1]])) // 4