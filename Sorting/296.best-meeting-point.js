// 296. Best Meeting Point
// Given an m x n binary grid grid where each 1 marks the home of one friend, return the minimal total travel distance.
// The total travel distance is the sum of the distances between the houses of the friends and the meeting point.
// The distance is calculated using Manhattan Distance, where distance(p1, p2) = |p2.x - p1.x| + |p2.y - p1.y|.


// Solution 1: Sorting Column Coordinates

// First, collect the row and column coordinates of all the houses (they will be stored in different arrays)
// Sort the column coordinates (we don't need to sort the row coordinates because we iterated in ascending order, so they are already sorted)
// Now, find the median of the row coordinates, and the median of the column coordinates.
// calculate the distance between all rows and the row median, and the distance between all columns and the column median.

// Note: The median of the row and the column is the best meeting point that minimizes the total distance to all houses.

// Time Complexity: O(mn * log(mn)) 147ms
// Space Complexity: O(mn) 44.4MB
var minTotalDistance = function(grid) {
  let rows = [], cols = [];
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        rows.push(i);
        cols.push(j);
      }
    }
  }   
  cols.sort((a, b) => a - b);
  let rowMedian = rows[Math.floor(rows.length / 2)];
  let colMedian = cols[Math.floor(cols.length / 2)];
  return minDistance(rows, rowMedian) + minDistance(cols, colMedian);

  function minDistance(points, median) {
    let dist = 0;
    for (var point of points) {
      dist += Math.abs(point - median);
    }
    return dist;
  }
};

// Solution 2: Collect in sorted order

// We can actually loop through the grid twice to collect both row and column coordinates in sorted order.
// For the columns, we can have the columns as the outer loop, and rows as the inner loop, and that way the columns will be in sorted order.

// After that, we do the same as in solution 1.

// Time Complexity: O(mn)
// Space Complexity: O(mn)
var minTotalDistance = function(grid) {
  let rows = [], cols = [];
  // iterate in sorted order of rows
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        rows.push(i);
      }
    }
  }

  // iterate in sorted order of columns
  for (j = 0; j < grid[0].length; j++) {
    for (i = 0; i < grid.length; i++) {
      if (grid[i][j] === 1) {
        cols.push(j);
      }
    }
  }
  let rowMedian = rows[Math.floor(rows.length / 2)];
  let colMedian = cols[Math.floor(cols.length / 2)];
  return minDistance(rows, rowMedian) + minDistance(cols, colMedian);

  function minDistance(points, median) {
    let dist = 0;
    for (var point of points) {
      dist += Math.abs(point - median);
    }
    return dist;
  }
};

// Two test cases to run function on
console.log(minTotalDistance([[1,0,0,0,1],[0,0,0,0,0],[0,0,1,0,0]])) // 6
console.log(minTotalDistance([[1,1]])) // 1