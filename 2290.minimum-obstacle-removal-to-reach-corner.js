// 2290. Minimum Obstacle Removal to Reach Corner
// You are given a 0-indexed 2D integer array grid of size m x n. Each cell has one of two values:
  // 0 represents an empty cell,
  // 1 represents an obstacle that may be removed.
  // You can move up, down, left, or right from and to an empty cell.
// Return the minimum number of obstacles to remove so you can move from the upper left corner (0, 0) to the lower right corner (m - 1, n - 1).


// Solution: Dijkstra's Algorithm

// Consider each cell in the grid as nodes in a graph.
// The edges for each node are the four cells around it (up, down, left, right).
// The weight of each edge is 1 if the neighbouring cell is an obstacle, otherwise it is 0.

// Record the shortest path to each cell from cell (0, 0).

// V = m * n, E = 4 * (mn)
// Time Complexity: O(V + E log(V)) 798ms
// Space Complexity: O(V) 107.5MB
var minimumObstacles = function(grid) {
  let m = grid.length, n = grid[0].length;
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let dist = Array(m).fill(0).map(() => Array(n).fill(Infinity));
  let heap = new PriorityQueue((a, b) => a[2] - b[2]);
  heap.add([0, 0, 0]);
  dist[0][0] = 0;

  while (!heap.isEmpty()) {
    let [row, col, steps] = heap.remove();
    if (dist[row][col] < steps) continue;
    if (row === m - 1 && col === n - 1) return steps;
    for (let [x, y] of directions) {
      let newX = row + x, newY = col + y;
      if (newX < 0 || newX >= m || newY < 0 || newY >= n) continue;
      let newSteps = steps + grid[newX][newY];
      if (dist[newX][newY] > newSteps) {
        dist[newX][newY] = newSteps;
        heap.add([newX, newY, newSteps]);
      }
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

// Two test cases to run function on
console.log(minimumObstacles([[0,1,1],[1,1,0],[1,1,0]])) // 2
console.log(minimumObstacles([[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]])) // 0