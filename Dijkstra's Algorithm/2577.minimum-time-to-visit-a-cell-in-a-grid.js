// 2577. Minimum Time to Visit a Cell In a Grid
// You are given a m x n matrix grid consisting of non-negative integers where grid[row][col] represents the minimum time required to be able to visit the cell (row, col), which means you can visit the cell (row, col) only when the time you visit it is greater than or equal to grid[row][col].
// You are standing in the top-left cell of the matrix in the 0th second, and you must move to any adjacent cell in the four directions: up, down, left, and right. Each move you make takes 1 second.
// Return the minimum time required in which you can visit the bottom-right cell of the matrix. If you cannot visit the bottom-right cell, then return -1.

 
// Solution: Dijkstra's Algorithm 

// Impossible case: If we can't move anywhere from the first cell, it is impossible. Any other cell is fine since we can always go back and forth in the cell we came from to increase the time.
// Use dijkstra's algorithm to find the minimum time to reach the last cell. 
// To reach a neighbor cell,
  // If grid[row][col] >= time, then we only need 1 move.
  // Otherwise, we need to go back and forth in the previous cell we came from to increase the time.
    // If the difference in time is odd, the difference will be exactly the amount of moves needed to go to the neighbor cell.
    // If the difference in time is even, the difference will be: difference + 1 (this is because we need an even amount of moves going back and forth plus one more move to go to the neighbor cell).

// m = number of rows, n = number of columns
// Time Complexity: O(mn * log(mn)) 557ms
// Space Complexity: O(mn) 71.7MB
var minimumTime = function(grid) {
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let m = grid.length, n = grid[0].length;
  if (grid[0][1] > 1 && grid[1][0] > 1) return -1;
  let dist = Array(m).fill(0).map(() => Array(n).fill(Infinity));
  let heap = new Heap((a, b) => a[2] - b[2]);
  heap.add([0, 0, 0]);
  dist[0][0] = 0;

  while (!heap.isEmpty()) {
    let [row, col, time] = heap.remove();
    if (dist[row][col] < time) continue;
    if (row === m - 1 && col === n - 1) return time;
    for (let [x, y] of directions) {
      let newRow = row + x, newCol = col + y;
      if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n) continue;
      let diff = grid[newRow][newCol] - time;
      let moves = diff % 2 === 1 ? diff : diff + 1;
      let weight = grid[newRow][newCol] <= time + 1 ? 1 : moves;
      if (dist[newRow][newCol] > time + weight) {
        dist[newRow][newCol] = Math.min(dist[newRow][newCol], time + weight);
        heap.add([newRow, newCol, time + weight]);
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

// Two test cases
console.log(minimumTime([[0,1,3,2],[5,1,2,5],[4,3,8,6]])) // 7
console.log(minimumTime([[0,2,4],[3,2,1],[1,0,4]])) // -1