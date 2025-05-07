// 3341. Find Minimum Time to Reach Last Room I
// There is a dungeon with n x m rooms arranged as a grid.
// You are given a 2D array moveTime of size n x m, where moveTime[i][j] represents the minimum time in seconds when you can start moving to that room. You start from the room (0, 0) at time t = 0 and can move to an adjacent room. Moving between adjacent rooms takes exactly one second.
// Return the minimum time to reach the room (n - 1, m - 1).
// Two rooms are adjacent if they share a common wall, either horizontally or vertically.


// Solution: Dijkstra's Algorithm

// Use dijkstra's algorithm to find the minimum time to reach each cell in the grid.
// minTime[i][j] = the minimum time to reach the cell (i, j).
// The first time we reach a cell, is the minimum time.

// Time Complexity: O(nm log(nm)) 97ms
// Space Complexity: O(nm) 65.8MB
function minTimeToReach(moveTime) {
  const n = moveTime.length, m = moveTime[0].length;
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  const minTime = Array(n).fill(0).map(() => Array(m).fill(Infinity));
  const heap = new Heap((a, b) => a[2] - b[2]);
  heap.add([0, 0, 0]);
  minTime[0][0] = 0;
  while (!heap.isEmpty()) {
    const [row, col, time] = heap.remove();
    if (minTime[row][col] < time) continue;
    if (row === n - 1 && col === m - 1) {
      return time;
    }
    for (let [x, y] of directions) {
      const newRow = row + x, newCol = col + y;
      if (newRow < 0 || newRow >= n || newCol < 0 || newCol >= m) continue;
      const newTime = Math.max(time, moveTime[newRow][newCol]) + 1;
      if (minTime[newRow][newCol] > newTime) {
        minTime[newRow][newCol] = newTime;
        heap.add([newRow, newCol, newTime]);
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
console.log(minTimeToReach([[0,4],[4,4]])) // 6
console.log(minTimeToReach([[0,0,0],[0,0,0]])) // 3
console.log(minTimeToReach([[0,1],[1,2]])) // 3