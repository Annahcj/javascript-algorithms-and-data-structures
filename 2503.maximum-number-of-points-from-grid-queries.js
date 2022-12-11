// 2503. Maximum Number of Points From Grid Queries
// You are given an m x n integer matrix grid and an array queries of size k.
// Find an array answer of size k such that for each integer queres[i] you start in the top left cell of the matrix and repeat the following process:
  // If queries[i] is strictly greater than the value of the current cell that you are in, then you get one point if it is your first time visiting this cell, and you can move to any adjacent cell in all 4 directions: up, down, left, and right.
  // Otherwise, you do not get any points, and you end this process.
// After the process, answer[i] is the maximum number of points you can get. Note that for each query you are allowed to visit the same cell multiple times.
// Return the resulting array answer.


// Solution: Union Find & Sorting

// 1. Sort queries in ascending order.
// 2. Collect each coordinate of the grid into an array "coords" and sort them in order of value.
// 3. For each query,
  // Use union find to connect cells in the grid (with value <= query value) with neighboring cells where value <= query value.
  // Count the number of cells connected to grid[0][0].
    // Note: We keep track of the size of each group of connected nodes in the union find.

// m = number of rows in grid, n = number of columns in grid, q = number of queries
// Time Complexity: O(mn log(mn) + q) 484ms 
// Space Complexity: O(mn + q) 76.8MB
var maxPoints = function(grid, queries) {
  let m = grid.length, n = grid[0].length;
  let coords = []; 
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      coords.push([i, j, grid[i][j]]); // [row, col, value]
    }
  }
  coords.sort((a, b) => a[2] - b[2]); // sort coordinates by value in asc order
  queries = queries.map((val, index) => [val, index]).sort((a, b) => a[0] - b[0]); // sort queries by value in asc order
  
  let k = coords.length, j = 0;
  let uf = new UnionFind(k), ans = Array(queries.length);
  for (let i = 0; i < queries.length; i++) {
    let [queryVal, index] = queries[i];
    while (j < k && coords[j][2] < queryVal) {
      let [row, col] = coords[j];
      connectWithNeighbors(row, col, queryVal);
      j++;
    }
    if (grid[0][0] >= queryVal) {
      ans[index] = 0;
    } else {
      let count = uf.size[uf.find(0)]; // count cells connected to grid[0][0]
      ans[index] = count;
    }
  }
  return ans;
  
  function connectWithNeighbors(row, col, queryVal) {
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    for (let [x, y] of directions) {
      let newRow = row + x, newCol = col + y;
      if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n) continue; // out of bounds
      if (grid[newRow][newCol] >= queryVal) continue; // cell value larger than or equal to query value
      uf.union(getIndex(row, col), getIndex(newRow, newCol));
    }
  }
  
  function getIndex(row, col) {
    return row * n + col;
  }
};

class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size);
    this.size = Array(size); // size[i] = size of group i
    for (let i = 0; i < size; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
      this.size[i] = 1;
    }
  }
  find(x) {
    if (this.root[x] === x) return x;
    return this.root[x] = this.find(this.root[x]);
  }
  union(x, y) {
    let rootX = this.find(x), rootY = this.find(y);
    if (rootX === rootY) return false;
    if (this.rank[rootX] < this.rank[rootY]) {
      this.root[rootX] = rootY;
      this.size[rootY] += this.size[rootX];
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.root[rootY] = rootX;
      this.size[rootX] += this.size[rootY];
    } else {
      this.root[rootY] = rootX;
      this.rank[rootX]++;
      this.size[rootX] += this.size[rootY];
    }
    return true;
  }
}

// Two test cases
console.log(maxPoints([[1,2,3],[2,5,7],[3,5,1]], [5,6,2])) // [5,8,1]
console.log(maxPoints([[5,2,1],[1,1,2]], [3])) // [0]