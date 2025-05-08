// 3342. Find Minimum Time to Reach Last Room II
// There is a dungeon with n x m rooms arranged as a grid.
// You are given a 2D array moveTime of size n x m, where moveTime[i][j] represents the minimum time in seconds when you can start moving to that room. You start from the room (0, 0) at time t = 0 and can move to an adjacent room. Moving between adjacent rooms takes one second for one move and two seconds for the next, alternating between the two.
// Return the minimum time to reach the room (n - 1, m - 1).
// Two rooms are adjacent if they share a common wall, either horizontally or vertically.


// Solution: Dijkstra's Algorithm

// Key point:
  // The number of moves between any two cells always has the same parity.
  // i.e. Every path will have an even number of moves. Or every path will have an odd number of moves.
  // Proof:
    // Every detour (going away from the target path), costs exactly 2 moves (1 move going in the wrong direction, 1 move coming back at some point).
    // e.g. In this grid, going from S to T, the optimal path is (down, right, right).
    // If we instead go (down, down), the next moves are (right, right, up).
    // Meaning, we go down 1 extra move, means we need to come up 1 extra move eventually.
      // [S,_,_]
      // [_,_,T]
      // [_,_,_]
    // Since every detour takes two moves, the overall path will always have the same parity.

// With the above property in mind, we know that no two paths can reach the same cell in the same minimum time with different alternating costs.
// That is, for every cell, the alternating cost is fixed.

// Use dijkstra's algorithm to find the minimum time to reach each cell.
// minTime[i][j] = minimum time to reach cell (i, j).
// In the heap, keep track of a boolean flag which indicates whether the next move is odd/even.
// If next move is odd, it takes 1 second. Otherwise it takes 2 seconds.

// Time Complexity: O(nm log(nm)) 894ms
// Space Complexity: O(nm) 105MB
function minTimeToReach(moveTime) {
  const n = moveTime.length, m = moveTime[0].length;
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  const minTime = Array(n).fill(0).map(() => Array(m).fill(Infinity));
  const heap = new Heap((a, b) => a[2] - b[2]);
  heap.add([0, 0, 0, 1]);
  minTime[0][0] = 0;
  while (!heap.isEmpty()) {
    const [row, col, time, nextMove] = heap.remove();
    if (minTime[row][col] < time) continue;
    if (row === n - 1 && col === m - 1) {
      return time;
    }
    for (let [x, y] of directions) {
      const newRow = row + x, newCol = col + y;
      if (newRow < 0 || newRow >= n || newCol < 0 || newCol >= m) continue;
      const newTime = Math.max(time, moveTime[newRow][newCol]) + (nextMove % 2 === 1 ? 1 : 2);
      if (minTime[newRow][newCol] > newTime) {
        minTime[newRow][newCol] = newTime;
        heap.add([newRow, newCol, newTime, 1 ^ nextMove]);
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
console.log(minTimeToReach([[0,4],[4,4]])) // 7
console.log(minTimeToReach([[0,0,0],[0,0,0]])) // 4
console.log(minTimeToReach([[0,1],[1,2]])) // 4