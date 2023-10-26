// 317. Shortest Distance from All Buildings
// You are given an m x n grid grid of values 0, 1, or 2, where:
// each 0 marks an empty land that you can pass by freely,
// each 1 marks a building that you cannot pass through, and
// each 2 marks an obstacle that you cannot pass through.
// You want to build a house on an empty land that reaches all buildings in the shortest total travel distance. You can only move up, down, left, and right.
// Return the shortest travel distance for such a house. If it is not possible to build such a house according to the above rules, return -1.
// The total travel distance is the sum of the distances between the houses of the friends and the meeting point.
// The distance is calculated using Manhattan Distance, where distance(p1, p2) = |p2.x - p1.x| + |p2.y - p1.y|.


// Solution 1: [TLE] BFS from Empty Land to House

var shortestDistance = function(grid) {
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let width = grid[0].length, length = grid.length;
  let totalHouses = 0;
  // count total number of buildings/houses
  for (var i = 0; i < length; i++) {
    for (var j = 0; j < width; j++) {
      if (grid[i][j] === 1) totalHouses++;
    }
  }
  let minDist = Infinity;
  // bfs to get total distance from each empty land to each house
  for (var i = 0; i < length; i++) {
    for (var j = 0; j < width; j++) {
      if (grid[i][j] === 0) {
        minDist = Math.min(minDist, bfs(i, j));
      }
    }
  }
  return minDist === Infinity ? -1 : minDist;

  function bfs(row, col) {
    let visited = {};
    visited[[row, col]] = true;
    let queue = [[row, col]];
    let totalDist = 0, numHouses = 0, steps = 0;
    // use two queues for better time complexity and easy tracking of number of steps taken
    while (queue.length && numHouses !== totalHouses) {
      let next = [];
      for (var [x, y] of queue) {
        // if building is found, increment number of houses and total distance by the number of steps we have taken, then skip to the next cell.
        if (grid[x][y] === 1) {
          numHouses++;
          totalDist += steps;
          continue;
        }
        // loop through each direction, get new cell coordinates.
        // if the new coordinates are in bounds and it isn't an obstacle AND it's not visited yet,
          // mark it as visited (since its bfs, we have to mark it as visited immediately to avoid duplicates)
          // push [newX, newY] into next
        for (var [a, b] of directions) {
          let newX = x + a, newY = y + b;
          if (newX > -1 && newX < length && newY > -1 && newY < width && grid[newX][newY] !== 2 && !visited[[newX, newY]]) {
            visited[[newX, newY]] = true;
            next.push([newX, newY]);
          }
        }
      }
      steps++;
      queue = next;
    }
    // if we can't reach every house, that means all the visited cells we have just been to also can't reach all the houses, so mark them as obstacles and return Infinity.
    if (numHouses !== totalHouses) {
      for (var i = 0; i < length; i++) {
        for (var j = 0; j < width; j++) {
          if (grid[i][j] === 0 && visited[[i, j]]) grid[i][j] = 2;
        }
      }
      return Infinity;
    }
    // otherwise return totalDist
    return totalDist;
  }
};


// Solution 2: Optimized BFS House to Empty Land

// Set emptyLandVal to 0
// For every house, 
  // (Every house must be reached, so if empty land can't be reached from say house1, then it won't be valid since it can't reach all houses)
  // (we mark this by decreasing the empty land value by 1 each time a different house reaches it)
  // (we also keep a 'dists' matrix, so whenever a house reaches it, increment the total distance counter by current steps)
  // call bfs(i, j, emptyLandVal)
  // decrement emptyLandVal by one

// When we have finished going through all the houses, loop through the grid
  // if grid[i][j] is equal to the final emptyLandVal (it is basically -total number of houses), then we can get the smallest minimum distance from the value in 'dists' of one of those valid empty lands.

// Time Complexity: O(n^2 * m^2) 240ms
// Space Complexity: O(nm) 46.4MB
var shortestDistance = function(grid) {
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let width = grid[0].length, length = grid.length;
  let emptyLandVal = 0, dists = Array(length);
  for (var i = 0; i < length; i++) {
    dists[i] = Array(width).fill(0);
  }
  for (i = 0; i < length; i++) {
    for (var j = 0; j < width; j++) {
      if (grid[i][j] === 1) {
        bfs(i, j, emptyLandVal);
        emptyLandVal--;
      }
    }
  }

  let minDist = Infinity;
  for (i = 0; i < length; i++) {
    for (j = 0; j < width; j++) {
      if (grid[i][j] === emptyLandVal) {
        minDist = Math.min(minDist, dists[i][j]);
      }
    }
  }
  return minDist === Infinity ? -1 : minDist;
  
  function bfs(row, col, emptyLandVal) {
    let queue = [[row, col]], steps = 1;
    while (queue.length) {
      let next = [];
      for (var [x, y] of queue) {
        for (var [a, b] of directions) {
          let newX = x + a, newY = y + b;
          if (newX > -1 && newX < length && newY > -1 && newY < width && grid[newX][newY] === emptyLandVal) {
            grid[newX][newY]--;
            dists[newX][newY] += steps;
            next.push([newX, newY]);
          }
        }
      }
      queue = next;
      steps++;
    }
  }
};

// Three test cases to run function on
console.log(shortestDistance([[1,0,2,0,1],[0,0,0,0,0],[0,0,1,0,0]])) // 7
console.log(shortestDistance([[1,0]])) // 1
console.log(shortestDistance([[1]])) // -1