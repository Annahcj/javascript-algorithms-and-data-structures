// 1102. Path With Maximum Minimum Value
// Given an m x n integer matrix grid, return the maximum score of a path starting at (0, 0) and ending at (m - 1, n - 1) moving in the 4 cardinal directions.
// The score of a path is the minimum value in that path.
  // For example, the score of the path 8 → 4 → 5 → 9 is 4.


// Solution 1: BFS w/ Max Heap

// It is always optimal to pick the neighbor with the maximum value.
// Use a max heap to store the [min value, row, column].
// Use a matrix 'seen' to keep track of cells we have been to, and avoid revisiting them. 
  // We never have to revisit a cell because the best path would visit each cell first.
  // This concept is similar to Dijkstra's Algorithm, where we never have to revisit a node since the best path would have reached it first due to the heap.

// Time Complexity: O(mn log(mn)) 388ms
// Space Complexity: O(mn) 63.3MB
var maximumMinimumPath = function(grid) {
  let m = grid.length, n = grid[0].length;
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let seen = Array(m).fill(0).map(() => Array(n).fill(0));
 
  let maxHeap = new Heap((a, b) => {
    return grid[b[1]][b[2]] - grid[a[1]][a[2]];
  })
  maxHeap.add([grid[0][0], 0, 0]);
  
  while (!maxHeap.isEmpty()) {
    let [val, row, col] = maxHeap.remove();
    if (row === m - 1 && col === n - 1) return val;
    for (let [x, y] of directions) {
      let newX = row + x, newY = col + y;
      if (newX < 0 || newX >= m || newY < 0 || newY >= n || seen[newX][newY]) continue;
      seen[newX][newY] = 1;
      maxHeap.add([Math.min(val, grid[newX][newY]), newX, newY]);
    }
  }
};

class Heap {
  constructor(comparator = ((a, b) => a - b)) {
    this.values = [];
    this.comparator = comparator;
    this.size = 0;
  }
  add(val) {
    this.size++;
    this.values.push(val);
    let idx = this.size - 1, parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.comparator(this.values[parentIdx], this.values[idx]) > 0) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
  }
  remove() {
    if (this.size === 0) return -1;
    this.size--;
    if (this.size === 0) return this.values.pop();
    let removedVal = this.values[0];
    this.values[0] = this.values.pop();
    let idx = 0;
    while (idx < this.size && idx < Math.floor(this.size / 2)) {
      let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      if (rightIdx === this.size) {
        if (this.comparator(this.values[leftIdx], this.values[idx]) > 0) break;
        [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
        idx = leftIdx;
      } else if (this.comparator(this.values[leftIdx], this.values[idx]) < 0 || this.comparator(this.values[rightIdx], this.values[idx]) < 0) {
        if (this.comparator(this.values[leftIdx], this.values[rightIdx]) <= 0) {
          [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
          idx = leftIdx;
        } else {
          [this.values[rightIdx], this.values[idx]] = [this.values[idx], this.values[rightIdx]];
          idx = rightIdx;
        }
      } else {
        break;
      }
    }
    return removedVal;
  }
  top() {
    return this.values[0];
  }
  isEmpty() {
    return this.size === 0;
  }
}

// Solution 2: Union Find w/ Sorting

// 1. Get all values and their rows and columns ([value, row, column]) into an array.
// 2. Sort the array by the values in desc order
// 3. Connect each cell with their visited neighbors.
// When the top left cell is connected to the bottom right cell, return the current value we are up to.

// Note: To get the position in the union find array -> row * n + column (n = number of columns in grid)

// Time Complexity: O(mn log(mn)) 568ms
// Space Complexity: O(mn) 64.3MB
var maximumMinimumPath = function(grid) {
  let m = grid.length, n = grid[0].length;
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let seen = Array(m).fill(0).map(() => Array(n).fill(0));
  let uf = new UnionFind(m * n);
  let values = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      values.push([grid[i][j], i, j]);
    }
  }
  values.sort((a, b) => b[0] - a[0]);
  
  for (let [val, row, col] of values) {
    let key = row * n + col;
    seen[row][col] = 1;
    for (let [x, y] of directions) {
      let newX = row + x, newY = col + y;
      if (newX < 0 || newX >= m || newY < 0 || newY >= n || !seen[newX][newY]) continue;
      let neighborKey = newX * n + newY;
      uf.union(key, neighborKey);
    }
    if (uf.find(0) === uf.find(m * n - 1)) return val; // top left cell is connected with bottom right cell
  }
};

class UnionFind {
  constructor(size) {
    this.size = size;
    this.root = Array(size);
    this.rank = Array(size);
    for (let i = 0; i < size; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
    }
  }
  find(x) {
    if (x === this.root[x]) return x;
    return this.root[x] = this.find(this.root[x]);
  }
  union(x, y) {
    let rootX = this.find(x), rootY = this.find(y);
    if (rootX === rootY) return false;
    this.size--;
    if (this.rank[rootX] > this.rank[rootY]) {
      this.root[rootY] = rootX;
    } else if (this.rank[rootX] < this.rank[rootY]) {
      this.root[rootX] = rootY;
    } else {
      this.root[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Two test cases 
console.log(maximumMinimumPath([[5,4,5],[1,2,6],[7,4,6]])) // 4
console.log(maximumMinimumPath([[5,8,8,8],[3,8,9,1],[4,1,1,1],[9,3,4,5]])) // 3