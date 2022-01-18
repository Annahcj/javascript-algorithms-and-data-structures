// 694. Number of Distinct Islands
// You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.
// An island is considered to be the same as another if and only if one island can be translated (and not rotated or reflected) to equal the other.
// Return the number of distinct islands.


// Solution: DFS w/ Hashing Function

// For each island, get all the coordinates in a set.
  // Note: If two islands are the same shape, they will be found in the exact same order.
  // With that being said, we reduce coordinates as small as possible: [[1,2],[2,2],[3,2]] = [[0,0],[1,0],[2,0]]
  // Formula: Subtract the minimum row from all row coordinates, and subtract the minimum column from all column coordinates. 

// Keep these island hash keys in a set, and return the size of the set when we have found all islands.

// Time Complexity: O(mn) 148ms
// Space Complexity: O(mn) 48MB
var numDistinctIslands = function(grid) {
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let m = grid.length, n = grid[0].length;
  
  let seen = new Set(), points = new Set(), islands = new Set();
  for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      if (grid[i][j] === 1 && !seen.has(`${i},${j}`)) {
        points = new Set();
        dfs(i, j);
        let key = getKey([...points]);
        islands.add(key);
      }
    }
  }
  return islands.size;
  
  function dfs(row, col) {
    seen.add(`${row},${col}`);
    points.add(`${row},${col}`);
    for (var [x, y] of directions) {
      let newX = row + x, newY = col + y;
      if (newX < 0 || newX >= m || newY < 0 || newY >= n || grid[newX][newY] === 0) continue;
      if (!seen.has(`${newX},${newY}`)) {
        dfs(newX, newY);
      }
    }
  } 
  
  function getKey(points) {
    let minRow = Infinity, minCol = Infinity;
    for (var i = 0; i < points.length; i++) {
      points[i] = points[i].split(",");
      points[i][0] = +points[i][0], points[i][1] = +points[i][1];
      minRow = Math.min(minRow, points[i][0]);
      minCol = Math.min(minCol, points[i][1]);
    }  
    for (i = 0; i < points.length; i++) {
      points[i][0] -= minRow, points[i][1] -= minCol;
      points[i] = `${points[i][0]},${points[i][1]}`;
    }
    return points.join('|');
  }
};

// Two test cases to run function on
console.log(numDistinctIslands([[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]])) // 1
console.log(numDistinctIslands([[1,1,0,1,1],[1,0,0,0,0],[0,0,0,0,1],[1,1,0,1,1]])) // 3