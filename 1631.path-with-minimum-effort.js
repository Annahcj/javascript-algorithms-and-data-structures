// 1631. Path With Minimum Effort
// You are a hiker preparing for an upcoming hike. You are given heights, a 2D array of size rows x columns, where heights[row][col] represents the height of cell (row, col). You are situated in the top-left cell, (0, 0), and you hope to travel to the bottom-right cell, (rows-1, columns-1) (i.e., 0-indexed). You can move up, down, left, or right, and you wish to find a route that requires the minimum effort.
// A route's effort is the maximum absolute difference in heights between two consecutive cells of the route.
// Return the minimum effort required to travel from the top-left cell to the bottom-right cell.


// Solution 1: Binary Search & BFS

// Binary search for the minimum effort.
// For an effort x, go through the grid and only visit adjacent cells that have a cost less than or equal to x.
// Use BFS to determine whether it's possible to reach the bottom right cell from the top left cell with an effort x.

// m = number of rows, n = number of columns, k = maximum height
// Time Complexity: O(mn log(k)) 381ms
// Space Complexity: O(mn) 59.1MB
var minimumEffortPath = function(heights) {
  let maxHeight = heights.reduce((max, row) => Math.max(max, row.reduce((rowMax, height) => Math.max(rowMax, height)), 0), 0);
  let low = 0, high = maxHeight;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (routeExists(heights, mid)) high = mid;
    else low = mid + 1;
  }
  return low;
};

function routeExists(heights, maxCost) {
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let m = heights.length, n = heights[0].length;
  let seen = Array(m).fill(0).map(() => Array(n).fill(false));
  seen[0][0] = true;
  let queue = [[0, 0]];
  
  while (queue.length) {
    let [row, col] = queue.shift();
    if (row === m - 1 && col === n - 1) return true;
    
    for (let [x, y] of directions) {
      let newRow = row + x, newCol = col + y;
      if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n) continue;
      let cost = Math.abs(heights[row][col] - heights[newRow][newCol]);
      if (seen[newRow][newCol] || cost > maxCost) continue;
      seen[newRow][newCol] = true;
      queue.push([newRow, newCol]);
    }
  }
  return false;
}


// Solution 2: Dijkstra's Algorithm

// Use dijkstra's algorithm to find the minimum effort to each cell.

// Time Complexity: O(mn log(mn)) 177ms
// Space Complexity: O(mn) 60.7MB
var minimumEffortPath = function(heights) {
  let m = heights.length, n = heights[0].length;
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let minEffort = Array(m).fill(0).map(() => Array(n).fill(Infinity));
  let heap = new Heap((a, b) => a[2] - b[2]); // [row, col, cost]
  heap.add([0, 0, 0]), minEffort[0][0] = 0;
  
  while (!heap.isEmpty()) {
    let [row, col, currMinEffort] = heap.remove();
    if (minEffort[row][col] < currMinEffort) continue;
    if (row === m - 1 && col === n - 1) return currMinEffort;
    
    for (let [x, y] of directions) {
      let newRow = row + x, newCol = col + y;
      if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n) continue;
      let cost = Math.abs(heights[row][col] - heights[newRow][newCol]);
      let newMinEffort = Math.max(currMinEffort, cost);
      if (minEffort[newRow][newCol] > newMinEffort) {
        minEffort[newRow][newCol] = newMinEffort;
        heap.add([newRow, newCol, newMinEffort]);
      }
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

// Three test cases
console.log(minimumEffortPath([[1,2,2],[3,8,2],[5,3,5]])) // 2
console.log(minimumEffortPath([[1,2,3],[3,8,4],[5,3,5]])) // 1
console.log(minimumEffortPath([[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]])) // 0