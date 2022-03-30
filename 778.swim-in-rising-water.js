// 778. Swim in Rising Water
// You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation at that point (i, j).
// The rain starts to fall. At time t, the depth of the water everywhere is t. You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most t. You can swim infinite distances in zero time. Of course, you must stay within the boundaries of the grid during your swim.
// Return the least time until you can reach the bottom right square (n - 1, n - 1) if you start at the top left square (0, 0).


// Solution 1: BFS w/ Min Heap

// The problem boils down to finding the minimum maximum path. (the maximum value in the path, as small as possible)
// It is always optimal to pick the neighbor with the minimum value.
// Use a max heap to store the [max value, row, column].
// Use a matrix 'seen' to keep track of cells we have been to, and avoid revisiting them. 
  // We never have to revisit a cell because the best path would visit each cell first.
  // This concept is similar to Dijkstra's Algorithm, where we never have to revisit a node since the best path would have reached it first due to the heap.

// Time Complexity: O(n^2 log(n^2)) 228ms
// Space Complexity: O(n^2) 52.3MB
var swimInWater = function(grid) {
  let n = grid.length, seen = Array(n).fill(0).map(() => Array(n).fill(0));
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let minHeap = new PriorityQueue((a, b) => grid[a[1]][a[2]] - grid[b[1]][b[2]]);
  minHeap.add([grid[0][0], 0, 0]);
  
  while (!minHeap.isEmpty()) {
    let [t, row, col] = minHeap.remove();
    if (row === n - 1 && col === n - 1) return t;
    for (let [x, y] of directions) {
      let newX = row + x, newY = col + y;
      if (newX < 0 || newX >= n || newY < 0 || newY >= n || seen[newX][newY]) continue;
      seen[newX][newY] = 1;
      minHeap.add([Math.max(t, grid[newX][newY]), newX, newY]);
    }
  }
};

class PriorityQueue {
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
// 2. Sort the array by the values in asc order
// 3. Connect each cell with their visited neighbors.
// When the top left cell is connected to the bottom right cell, return the current value we are up to.

// Note: To get the position in the union find array -> row * n + column

// This approach works because we are able to swim anywhere that we've been to before, and anywhere where the value <= t.

// Time Complexity: O(n^2 log(n^2)) 227ms
// Space Complexity: O(n^2) 52.6MB
var swimInWater = function(grid) {
  let n = grid.length, seen = Array(n).fill(0).map(() => Array(n).fill(0));
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let uf = new UnionFind(n * n), values = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      values.push([grid[i][j], i, j]);
    }
  }
  values.sort((a, b) => a[0] - b[0]);

  for (let [val, row, col] of values) {
    let key = row * n + col;
    seen[row][col] = 1;
    for (let [x, y] of directions) {
      let newX = row + x, newY = col + y;
      let newKey = newX * n + newY;
      if (newX < 0 || newX >= n || newY < 0 || newY >= n || !seen[newX][newY]) continue;
      uf.union(key, newKey);
    }
    if (uf.isConnected(0, n * n - 1)) return val;
  }
};

class UnionFind {
  constructor(size) {
    this.rank = Array(size);
    this.root = Array(size);
    for (let i = 0; i < size; i++) {
      this.rank[i] = 1;
      this.root[i] = i;
    }
  }
  find(x) {
    if (x === this.root[x]) return x;
    return this.root[x] = this.find(this.root[x]);
  }
  union(x, y) {
    let rootX = this.find(x), rootY = this.find(y);
    if (rootX === rootY) return false;
    if (this.rank[rootX] > this.rank[rootY]) this.root[rootY] = rootX;
    else if (this.rank[rootX] < this.rank[rootY]) this.root[rootX] = rootY;
    else {
      this.root[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Two test cases to run function on
console.log(swimInWater([[0,2],[1,3]])) // 3
console.log(swimInWater([[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]])) // 16