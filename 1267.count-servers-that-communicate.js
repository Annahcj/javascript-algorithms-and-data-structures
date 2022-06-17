// 1267. Count Servers that Communicate
// You are given a map of a server center, represented as a m * n integer matrix grid, where 1 means that on that cell there is a server and 0 means that it is no server. Two servers are said to communicate if they are on the same row or on the same column.
// Return the number of servers that communicate with any other server.

 
// Solution: Counting

// 1. Count the number of servers on each row and column.
// 2. Count the number of cells with servers where:
  // The number of servers in the row is bigger than 1 OR
  // The number of servers in the column is bigger than 1

// Time Complexity: O(mn) 129ms
// Space Complexity: O(m + n) 45.4MB
var countServers = function(grid) {
  let m = grid.length, n = grid[0].length;
  let rows = Array(m).fill(0), cols = Array(n).fill(0);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      rows[i] += grid[i][j];
      cols[j] += grid[i][j];
    }
  }
  
  let ans = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1 && (rows[i] > 1 || cols[j] > 1)) ans++;
    }
  }
  return ans;
};

// Three test cases to run function on
console.log(countServers([[1,0],[0,1]])) // 0
console.log(countServers([[1,0],[1,1]])) // 3
console.log(countServers([[1,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,0,1]])) // 4