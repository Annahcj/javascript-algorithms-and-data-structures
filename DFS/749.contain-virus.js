// 749. Contain Virus
// A virus is spreading rapidly, and your task is to quarantine the infected area by installing walls.
// The world is modeled as an m x n binary grid isInfected, where isInfected[i][j] == 0 represents uninfected cells, and isInfected[i][j] == 1 represents cells contaminated with the virus. A wall (and only one wall) can be installed between any two 4-directionally adjacent cells, on the shared boundary.
// Every night, the virus spreads to all neighboring cells in all four directions unless blocked by a wall. Resources are limited. Each day, you can install walls around only one region (i.e., the affected area (continuous block of infected cells) that threatens the most uninfected cells the following night). There will never be a tie.
// Return the number of walls used to quarantine all the infected regions. If the world will become fully infected, return the number of walls used.


// Solution: Simulation w/ DFS

// Key: Build a wall around the region which threatens the most uninfected cells.

// 1. Count all affected regions and keep track of the region with the most threatened cells.
  // Note: Walls and affected cells differ slightly. Walls count shared neighboring cells twice.
  // Affected area is the number of cells which are threatened, so cells can't be counted twice. However, different regions can count the same cells.
// 2. Contain the region with the most threatened cells. Turn the contained cells to 2.
// 3. Spread active viruses to their neighboring cells.
// Repeat these steps until there are no more virus cells.

// Runtime on LeetCode: 154ms
// Memory Usage on LeetCode: 50.2MB
var containVirus = function(isInfected) {
  let areaToContain = getAreaToContain(isInfected);
  let ans = 0;
  while (areaToContain[0] > 0) {
    let [affectedCells, walls, pos] = areaToContain;
    ans += walls;
    containRegion(isInfected, pos[0], pos[1]);
    spread(isInfected);
    areaToContain = getAreaToContain(isInfected);
  }
  return ans;
};

function getAreaToContain(grid) {
  let m = grid.length, n = grid[0].length;
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let seenUnaffected = new Set(), seenVirus = new Set(), affectedCells = 0, walls = 0;
  let res = [], maxAffected = 0, maxWalls = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      seenUnaffected = new Set();
      if (grid[i][j] === 1 && !seenVirus.has(`${i},${j}`)) {
        affectedCells = 0, walls = 0;
        // a new affected region, visit it and count the number of threatened cells.
        dfs(i, j);
        if (affectedCells > maxAffected) { // get the region with most threatened cells
          maxAffected = affectedCells;
          maxWalls = walls;
          res[0] = i, res[1] = j; // save the position of one cell in the region
        }
      }
    }
  }
  return [maxAffected, maxWalls, res];
  
  function dfs(row, col) {
    seenVirus.add(`${row},${col}`);
    for (let [x, y] of directions) {
      let newX = row + x, newY = col + y;
      if (newX < 0 || newX >= m || newY < 0 || newY >= n || seenVirus.has(`${newX},${newY}`) || grid[newX][newY] === 2) continue;
      if (grid[newX][newY] === 0) {
        if (!seenUnaffected.has(`${newX},${newY}`)) affectedCells++;
        walls++;
        seenUnaffected.add(`${newX},${newY}`);
        continue;
      }
      dfs(newX, newY);
    }
  }
}

function containRegion(grid, row, col) {
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let m = grid.length, n = grid[0].length;
  
  grid[row][col] = 2;
  for (let [x, y] of directions) {
    let newX = row + x, newY = col + y;
    if (newX < 0 || newX >= m || newY < 0 || newY >= n || grid[newX][newY] !== 1) continue;
    containRegion(grid, newX, newY);
  }
}

function spread(grid) {
  let m = grid.length, n = grid[0].length;
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let virusCells = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) virusCells.push([i, j]);
    }
  }
  for (let [x, y] of virusCells) spreadVirus(x, y);

  function spreadVirus(row, col) {
    for (let [x, y] of directions) {
      let newX = row + x, newY = col + y;
      if (newX < 0 || newX >= m || newY < 0 || newY >= n || grid[newX][newY] !== 0) continue;
      grid[newX][newY] = 1;
    }
  }
} 

// Three test cases to run function on
console.log(containVirus([[0,1,0,0,0,0,0,0],[0,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]))
console.log(containVirus([[0,1,0,0,0,0,0,1],[0,1,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0]]))
console.log(containVirus([[1,1,1,0,0,0,0,0,0],[1,0,1,0,1,1,1,1,1],[1,1,1,0,0,0,0,0,0]]))