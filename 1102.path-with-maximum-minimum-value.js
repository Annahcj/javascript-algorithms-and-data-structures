// 1102. Path With Maximum Minimum Value
// Given an m x n integer matrix grid, return the maximum score of a path starting at (0, 0) and ending at (m - 1, n - 1) moving in the 4 cardinal directions.
// The score of a path is the minimum value in that path.
  // For example, the score of the path 8 → 4 → 5 → 9 is 4.


// Solution: BFS w/ Max Heap

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
 
  let maxHeap = new PriorityQueue((a, b) => {
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
console.log(maximumMinimumPath([[5,4,5],[1,2,6],[7,4,6]])) // 4
console.log(maximumMinimumPath([[5,8,8,8],[3,8,9,1],[4,1,1,1],[9,3,4,5]])) // 3