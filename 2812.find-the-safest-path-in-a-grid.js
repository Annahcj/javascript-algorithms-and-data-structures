// 2812. Find the Safest Path in a Grid
// You are given a 0-indexed 2D matrix grid of size n x n, where (r, c) represents:
  // A cell containing a thief if grid[r][c] = 1
  // An empty cell if grid[r][c] = 0
// You are initially positioned at cell (0, 0). In one move, you can move to any adjacent cell in the grid, including cells containing thieves.
// The safeness factor of a path on the grid is defined as the minimum manhattan distance from any cell in the path to any thief in the grid.
// Return the maximum safeness factor of all paths leading to cell (n - 1, n - 1).
// An adjacent cell of cell (r, c), is one of the cells (r, c + 1), (r, c - 1), (r + 1, c) and (r - 1, c) if it exists.
// The Manhattan distance between two cells (a, b) and (x, y) is equal to |a - x| + |b - y|, where |val| denotes the absolute value of val.


// Solution 1: BFS & Binary Search

// 1. Use multi-source BFS to find each cell's minimum distance to a thief. We start the BFS at the thief cells and expand outwards.
// 2. Binary search for the maximum possible minSafeness factor. 
  // To check whether a minSafeness is possible, use BFS to check whether there exists a valid path from (0,0) to (n-1,n-1) using only cells with safeness >= minSafeness.

// Time Complexity: O(n^2 log(n^2)) 512ms
// Space Complexity: O(n^2) 91.4MB
var maximumSafenessFactor = function(grid) {
  let safeness = getSafeness(grid), n = grid.length;
  let low = 0, high = n * n;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (isEnough(safeness, mid)) low = mid;
    else high = mid - 1;
  }
  return low;
};

function isEnough(safeness, minSafeness) { // use bfs to check whether a valid path exists using only cells with safeness >= minSafeness
  let n = safeness.length, directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  if (safeness[0][0] < minSafeness || safeness[n - 1][n - 1] < minSafeness) return false;
  let seen = Array(n).fill(0).map(() => Array(n).fill(false));
  let queue = [[0, 0]];
  seen[0][0] = true;
  while (queue.length) {
    let [row, col] = queue.shift();
    if (row === n - 1 && col === n - 1) return true;
    for (let [x, y] of directions) {
      let newRow = row + x, newCol = col + y;
      if (newRow < 0 || newRow >= n || newCol < 0 || newCol >= n) continue; // out of bounds
      if (seen[newRow][newCol] || safeness[newRow][newCol] < minSafeness) continue; // already visited or safeness is lower than the minimum safeness
      seen[newRow][newCol] = true;
      queue.push([newRow, newCol]);
    }
  }
  return false;
}

function getSafeness(grid) { // use multi-source level-by-level BFS to compute each cell's minimum distance to a thief
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let n = grid.length, queue = [];
  let safeness = Array(n).fill(0).map(() => Array(n).fill(Infinity));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) { 
        safeness[i][j] = 0;
        queue.push([i, j]);
      }
    }
  }
  let steps = 1;
  while (queue.length) {
    let next = [];
    while (queue.length) {
      let [row, col] = queue.pop();
      for (let [x, y] of directions) {
        let newRow = row + x, newCol = col + y;
        if (newRow < 0 || newRow >= n || newCol < 0 || newCol >= n) continue;
        if (safeness[newRow][newCol] !== Infinity) continue; // visited already
        safeness[newRow][newCol] = steps;
        next.push([newRow, newCol]);
      }
    }
    queue = next;
    steps++;
  }
  return safeness;
}


// Solution 2: BFS & Dijkstra's Algorithm

// 1. Use multi-source BFS to find each cell's minimum distance to a thief. We start the BFS at the thief cells and expand outwards.
// 2. Use dijkstra's algorithm to find the maximum minimum safeness factor.
  // Use a max heap to keep track of the cell's and their current safeness.
  // maxSafeness[row][col] = maximum minimum safeness from (0, 0) to (row, col).

// Time Complexity: O(n^2 log(n^2)) 408ms
// Space Complexity: O(n^2) 90.2MB
var maximumSafenessFactor = function(grid) {
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let safeness = getSafeness(grid), n = grid.length;
  let heap = new Heap((a, b) => b[2] - a[2]); // sort by safeness in desc order
  let maxSafeness = Array(n).fill(0).map(() => Array(n).fill(-1)); 
  heap.add([0, 0, safeness[0][0]]);
  maxSafeness[0][0] = safeness[0][0];
  while (!heap.isEmpty()) {
    let [row, col, minSafeness] = heap.remove();
    if (maxSafeness[row][col] > minSafeness) continue;
    if (row === n - 1 && col === n - 1) return minSafeness;
    
    for (let [x, y] of directions) {
      let newRow = row + x, newCol = col + y;
      if (newRow < 0 || newRow >= n || newCol < 0 || newCol >= n) continue; // out of bounds
      let newMinSafeness = Math.min(minSafeness, safeness[newRow][newCol]);
      if (maxSafeness[newRow][newCol] < newMinSafeness) {
        maxSafeness[newRow][newCol] = newMinSafeness;
        heap.add([newRow, newCol, newMinSafeness]);
      }
    }
  }
};

function getSafeness(grid) { // use multi-source level-by-level BFS to compute each cell's minimum distance to a thief
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let n = grid.length, queue = [];
  let safeness = Array(n).fill(0).map(() => Array(n).fill(Infinity));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) { 
        safeness[i][j] = 0;
        queue.push([i, j]);
      }
    }
  }
  let steps = 1;
  while (queue.length) {
    let next = [];
    while (queue.length) {
      let [row, col] = queue.pop();
      for (let [x, y] of directions) {
        let newRow = row + x, newCol = col + y;
        if (newRow < 0 || newRow >= n || newCol < 0 || newCol >= n) continue;
        if (safeness[newRow][newCol] !== Infinity) continue; // visited already
        safeness[newRow][newCol] = steps;
        next.push([newRow, newCol]);
      }
    }
    queue = next;
    steps++;
  }
  return safeness;
}

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

// Three test cases
console.log(maximumSafenessFactor([[1,0,0],[0,0,0],[0,0,1]])) // 0
console.log(maximumSafenessFactor([[0,0,1],[0,0,0],[0,0,0]])) // 2
console.log(maximumSafenessFactor([[0,0,0,1],[0,0,0,0],[0,0,0,0],[1,0,0,0]])) // 2