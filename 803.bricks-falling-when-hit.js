// 803. Bricks Falling When Hit
// You are given an m x n binary grid, where each 1 represents a brick and 0 represents an empty space. A brick is stable if:
  // It is directly connected to the top of the grid, or
  // At least one other brick in its four adjacent cells is stable.
// You are also given an array hits, which is a sequence of erasures we want to apply. Each time we want to erase the brick at the location hits[i] = (rowi, coli). The brick on that location (if it exists) will disappear. Some other bricks may no longer be stable because of that erasure and will fall. Once a brick falls, it is immediately erased from the grid (i.e., it does not land on other stable bricks).
// Return an array result, where each result[i] is the number of bricks that will fall after the ith erasure is applied.
// Note that an erasure may refer to a location with no brick, and if it does, no bricks drop.


// Solution: Union Find

// 1. Create copy of grid and reset erase bricks in the grid that are in hits (set to 0).
// 2. Union all existing bricks with other bricks. Union cells in the top row with a dummy top cell.
// 3. Go through each hit in reverse order and add each brick back on.
  // If the cell was a brick in the original grid, connect it with other bricks connected to it 4-directionally.
  // At each step, check how many new bricks are connected to the top after adding the brick back.

// Keep a dummy head connected to all top row cells.
// Keep track of the number of cells connected to each cell in the union find.
// This way, we can check the number of cells connected to the top in O(1) time.

// Why we go through hits in reverse:
  // Union find doesn't work for removing connected cells, but it is perfect for connecting cells.
  // By going in reverse order, we can check how many new connections we get after adding a brick back on.

// n = number of rows, m = number of columns, k = hits.length
// Time Complexity: O(nm + k) 529ms
// Space Complexity: O(nm) 71.6MB
var hitBricks = function(grid, hits) {
  let original = grid.map((row) => [...row]);
  for (let [x, y] of hits) {
    grid[x][y] = 0;
  }
  
  let m = grid.length, n = grid[0].length;
  let size = m * n + 1, top = m * n;
  let uf = new UnionFind(size);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) continue;
      if (i === 0) uf.union(getIndex(i, j), top); // connect top-row cells to top
      if (i < m - 1 && grid[i + 1][j] === 1) {
        uf.union(getIndex(i, j), getIndex(i + 1, j));
      }
      if (j < n - 1 && grid[i][j + 1] === 1) {
        uf.union(getIndex(i, j), getIndex(i, j + 1));
      }
    }
  }

  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let count = uf.size[uf.find(top)], res = Array(hits.length);
  for (let i = hits.length - 1; i >= 0; i--) {
    let [r, c] = hits[i];
    if (original[r][c] === 0) { // orignally empty
      res[i] = 0;
      continue; 
    }
    grid[r][c] = 1;
    if (r === 0) uf.union(getIndex(r, c), top); // connect top-row cells to top
    
    for (let [x, y] of directions) {
      let newX = r + x, newY = c + y;
      if (newX < 0 || newX >= m || newY < 0 || newY >= n || grid[newX][newY] === 0) continue;
      uf.union(getIndex(r, c), getIndex(newX, newY));
    }
    let newCount = uf.size[uf.find(top)]; 
    res[i] = Math.max(0, newCount - count - 1); // exclude brick we added
    count = newCount;
  }
  return res;
  
  function getIndex(row, col) {
    return row * n + col;
  }
};

class UnionFind {
  constructor(size) {
    this.size = Array(size);
    this.root = Array(size);
    this.rank = Array(size);
    for (let i = 0; i < size; i++) {
      this.size[i] = 1;
      this.root[i] = i;
      this.rank[i] = 1;
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
  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Two test cases to run function on
console.log(hitBricks([[1,0,0,0],[1,1,1,0]], [[1,0]])) // [2]
console.log(hitBricks([[1,0,0,0],[1,1,0,0]], [[1,1],[1,0]])) // [0,0]