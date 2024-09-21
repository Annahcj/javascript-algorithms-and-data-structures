// 3286. Find a Safe Walk Through a Grid
// You are given an m x n binary matrix grid and an integer health.
// You start on the upper-left corner (0, 0) and would like to get to the lower-right corner (m - 1, n - 1).
// You can move up, down, left, or right from one cell to another adjacent cell as long as your health remains positive.
// Cells (i, j) with grid[i][j] = 1 are considered unsafe and reduce your health by 1.
// Return true if you can reach the final cell with a health value of 1 or more, and false otherwise.


// Solution: Dijkstra's Algorithm

// Use dijkstra's algorithm to find the maximum possible health reaching each cell in the grid.

// Time Complexity: O(mn log(mn)) 147ms
// Space Complexity: O(mn) 60.7MB
var findSafeWalk = function(grid, health) {
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let m = grid.length, n = grid[0].length;
  let maxHealth = Array(m).fill(0).map(() => Array(n).fill(-Infinity));
  let heap = new Heap((a, b) => b[2] - a[2]); // [row, column, health]
  heap.add([0, 0, health - grid[0][0]]);
  while (!heap.isEmpty()) {
    let [row, col, currHealth] = heap.remove();
    if (maxHealth[row][col] > currHealth) continue;
    if (row === m - 1 && col === n - 1) return currHealth >= 1;
    for (let [x, y] of directions) {
      let newRow = row + x, newCol = col + y;
      if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n) continue;
      let newHealth = currHealth - grid[newRow][newCol];
      if (maxHealth[newRow][newCol] < newHealth) {
        maxHealth[newRow][newCol] = newHealth;
        heap.add([newRow, newCol, newHealth]);
      }
    }
  }
  console.log(maxHealth);
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

// Two test cases
console.log(findSafeWalk([[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]], 1)) // true
console.log(findSafeWalk([[0,1,1,0,0,0],[1,0,1,0,0,0],[0,1,1,1,0,1],[0,0,1,0,1,0]], 3)) // false