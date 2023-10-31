// 1970. Last Day Where You Can Still Cross
// There is a 1-based binary matrix where 0 represents land and 1 represents water. You are given integers row and col representing the number of rows and columns in the matrix, respectively.
// Initially on day 0, the entire matrix is land. However, each day a new cell becomes flooded with water. You are given a 1-based 2D array cells, where cells[i] = [ri, ci] represents that on the ith day, the cell on the rith row and cith column (1-based coordinates) will be covered with water (i.e., changed to 1).
// You want to find the last day that it is possible to walk from the top to the bottom by only walking on land cells. You can start from any cell in the top row and end at any cell in the bottom row. You can only travel in the four cardinal directions (left, right, up, and down).
// Return the last day where it is possible to walk from the top to the bottom by only walking on land cells.


// Solution 1: Binary Search 

// Binary search for the last day
// At an index i:
  // 1. Create an empty grid
  // 2. Populate the grid with 1's for the first i coordinates in cells.
  // 3. BFS from the first row to check whether the last row is reachable.

// n = number of rows, m = number of columns, k = cells.length
// Time Complexity: O(nm log(k)) 581ms
// Space Complexity: O(nm) 66MB
var latestDayToCross = function(row, col, cells) {
  let low = 0, high = cells.length;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (isConnected(createGrid(mid - 1))) low = mid;
    else high = mid - 1;
  }
  return low;
  
  function createGrid(index) {
    let grid = Array(row).fill(0).map(() => Array(col).fill(0));
    for (let i = 0; i <= index; i++) {
      let [r, c] = cells[i];
      grid[r - 1][c - 1] = 1;
    }
    return grid;
  }
  
  function isConnected(grid) {
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    let queue = [], seen = Array(row).fill(0).map(() => Array(col).fill(0));
    for (let j = 0; j < col; j++) {
      if (grid[0][j] === 0) {
        queue.push([0, j]);
        seen[0][j] = 1;
      } 
    }
    
    while (queue.length) {
      let [r, c] = queue.shift();
      if (r === row - 1) return true;
      
      for (let [x, y] of directions) {
        let newX = r + x, newY = c + y;
        if (newX < 0 || newX >= row || newY < 0 || newY >= col) continue;
        if (seen[newX][newY] || grid[newX][newY] === 1) continue;
        queue.push([newX, newY]);
        seen[newX][newY] = 1;
      }
    }
    return false;
  }  
};


// Solution 2: Union Find 

// Union find on the land cells.
// Keep two extra dummy cells (head and tail) which are connect to each cell in the first and last row respectively.
// This way, we can efficiently check whether the first and last row are connected.

// 1. Create an empty grid.

// 2. Go through each cell in cells to populate the water cells in the grid.

// 3. Union the following:
  // All existing land cells with other 4-directionally connected neighbouring land cells.
  // The cells in the first row with the dummy head
  // The cells in the last row with the dummy tail

// 4. Go through cells backwards and turn each water cell back to a land cell.
  // Check whether the dummy head is connected with the dummy tail.
  // Connect the new land cell with other 4-directionally connected neighbouring land cells.

// Time Complexity: O(nm) 571ms
// Space Complexity: O(nm) 72.8MB
var latestDayToCross = function(row, col, cells) {
  let n = row * col + 2; // two extra dummy cells connected to first and last row
  let head = row * col, tail = row * col + 1; // dummy cell indexes
  let grid = Array(row).fill(0).map(() => Array(col).fill(0));
  for (let [r, c] of cells) {
    grid[r - 1][c - 1] = 1;
  }
  
  let uf = new UnionFind(n);
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (i === 0 || i === row - 1) uf.union(getIndex(i, j), i === 0 ? head : tail);
      if (grid[i][j] === 1) continue;
      if (j < col - 1 && grid[i][j + 1] === 0) {
        uf.union(getIndex(i, j), getIndex(i, j + 1));
      }
      if (i < row - 1 && grid[i + 1][j] === 0) {
        uf.union(getIndex(i, j), getIndex(i + 1, j));
      }
    }
  }

  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  for (let i = cells.length - 1; i >= 0; i--) {
    if (uf.isConnected(head, tail)) return i + 1;
    let r = cells[i][0] - 1, c = cells[i][1] - 1;
    grid[r][c] = 0;
    for (let [x, y] of directions) {
      let newX = r + x, newY = c + y;
      if (newX < 0 || newX >= row || newY < 0 || newY >= col || grid[newX][newY] === 1) continue;
      uf.union(getIndex(r, c), getIndex(newX, newY));
    }
  }
  return 0;
    
  function getIndex(r, c) {
    return r * col + c;
  }
};

class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size);
    for (let i = 0; i < size; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
    }
  }
  find(x) {
    if (this.root[x] === x) {
      return x;
    }
    return this.root[x] = this.find(this.root[x]);
  }
  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.root[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.root[rootX] = rootY;
      } else {
        this.root[rootY] = rootX;
        this.rank[rootX]++;
      }
    }
  }
  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Two test cases
console.log(latestDayToCross(2, 2, [[1,1],[2,1],[1,2],[2,2]])) // 2
console.log(latestDayToCross(3, 3, [[1,2],[2,1],[3,3],[2,2],[1,1],[1,3],[2,3],[3,2],[3,1]])) // 3