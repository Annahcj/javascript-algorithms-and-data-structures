// 3531. Count Covered Buildings
// You are given a positive integer n, representing an n x n city. You are also given a 2D grid buildings, where buildings[i] = [x, y] denotes a unique building located at coordinates [x, y].
// A building is covered if there is at least one building in all four directions: left, right, above, and below.
// Return the number of covered buildings.


// Solution: Precompute Min/Max Columns & Rows

// For every row, store the minimum and maximum column for points on that row.
// For every column, store the minimum and maximum row for points on that column.

// Then for each building, we can check if both these conditions are met:
  // The column is in between the min and max columns for that row.
  // The row is in between the min and max rows for that column.

// number of buildings
// Time Complexity: O(m + n) 345ms
// Space Complexity: O(n) 119MB
function countCoveredBuildings(n, buildings) {
  const minMaxColumns = Array(n + 1).fill(0).map(() => [Infinity, -Infinity]);
  const minMaxRows = Array(n + 1).fill(0).map(() => [Infinity, -Infinity]);
  for (let [x, y] of buildings) {
    minMaxColumns[y][0] = Math.min(minMaxColumns[y][0], x);
    minMaxColumns[y][1] = Math.max(minMaxColumns[y][1], x);
    minMaxRows[x][0] = Math.min(minMaxRows[x][0], y);
    minMaxRows[x][1] = Math.max(minMaxRows[x][1], y);
  }
  let covered = 0;
  for (let [x, y] of buildings) {
    if (x > minMaxColumns[y][0] && x < minMaxColumns[y][1] && y > minMaxRows[x][0] && y < minMaxRows[x][1]) {
      covered++;
    }
  }
  return covered;
};

// Three test cases
console.log(countCoveredBuildings(3, [[1,2],[2,2],[3,2],[2,1],[2,3]])) // 1
console.log(countCoveredBuildings(3, [[1,1],[1,2],[2,1],[2,2]])) // 0
console.log(countCoveredBuildings(5, [[1,3],[3,2],[3,3],[3,5],[5,3]])) // 1