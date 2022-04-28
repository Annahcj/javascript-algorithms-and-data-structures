// 1631. Path With Minimum Effort
// You are a hiker preparing for an upcoming hike. You are given heights, a 2D array of size rows x columns, where heights[row][col] represents the height of cell (row, col). You are situated in the top-left cell, (0, 0), and you hope to travel to the bottom-right cell, (rows-1, columns-1) (i.e., 0-indexed). You can move up, down, left, or right, and you wish to find a route that requires the minimum effort.
// A route's effort is the maximum absolute difference in heights between two consecutive cells of the route.
// Return the minimum effort required to travel from the top-left cell to the bottom-right cell.


// Solution 1: Dijkstra's Algorithm

// keep a diffs matrix which represents the minimum effort from the source (0, 0) to a cell,
// initially set all differences to Infinity, and diffs[0][0] to 0 (since we are already there)
// initiate a minheap 'heap' (put the source in to start [0, 0, 0] -> [x-coordinate, y-coordinate, min-effort])
// Loop while heap is not empty *
  // take the smallest item from heap, store in -> [x, y, diff]
  // if we have reached target ([height - 1, width - 1]), return diff.
  // Otherwise, loop through the four directions ([0, 1], [1, 0], [0, -1], [-1, 0]) -> [a, b]
    // let newX be the new x-coordinate -> x + a
    // let newY be the new y-coordinate -> y + b
    // if newX is valid and newY is valid (not out of bounds)
      // let edgeCost be Math.max(diff, Math.abs(heights[newX][newY] - heights[x][y])) (find biggest absolute value diff for two adjacent cells)
      // if edgeCost is less than what is recorded in diffs so far,
        // replace diffs[newX][newY] with edgeCost
        // push [newX, newY, edgeCost] in heap
// *
// return diffs[height - 1][width - 1]

// m = rows, n = columns
// Time Complexity: O(mn * log(mn)) 172ms
// Space Complexity: O(mn) 48.1MB
var minimumEffortPath = function(heights) {
  let width = heights[0].length, height = heights.length;
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let diffs = Array(height);
  for (var i = 0; i < height; i++) {
    diffs[i] = Array(width).fill(Infinity);
  }
  diffs[0][0] = 0;
  let heap = new MinHeap();
  heap.add([0, 0, 0]);
  while (heap.values.length) {
    let [x, y, diff] = heap.remove();
    if (x === height - 1 && y === width - 1) return diff;
    for (var [a, b] of directions) {
      let newX = x + a, newY = y + b;
      if (newX > -1 && newX < height && newY > -1 && newY < width) {
        let edgeCost = Math.max(diff, Math.abs(heights[newX][newY] - heights[x][y]));
        if (edgeCost < diffs[newX][newY]) {
          diffs[newX][newY] = edgeCost;
          heap.add([newX, newY, edgeCost]);
        }
      }
    }
  }
  return diffs[height - 1][width - 1];
};
class MinHeap {
  constructor() {
    this.values = [];
  }
  add(val) {
    this.values.push(val);
    let idx = this.values.length - 1;
    let parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.values[idx][2] < this.values[parentIdx][2]) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
    return val;
  }
  remove() {
    if (!this.values.length) return -1;
    if (this.values.length === 1) return this.values.pop();
    let value = this.values[0];
    let popped = this.values.pop();
    this.values[0] = popped;
    let idx = 0;
    let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
    let childIdx = getChild(this.values, leftIdx, rightIdx);
    function getChild(vals, leftIdx, rightIdx) {
      let end = vals.length - 1;
      if (leftIdx > end && rightIdx > end) return -1;
      if (rightIdx > end) return leftIdx;
      if (vals[leftIdx][2] < vals[rightIdx][2]) return leftIdx;
      return rightIdx;
    }
    while (childIdx > -1 && this.values[idx][2] > this.values[childIdx][2]) {
      [this.values[idx], this.values[childIdx]] = [this.values[childIdx], this.values[idx]];
      idx = childIdx;
      leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      childIdx = getChild(this.values, leftIdx, rightIdx);
    }
    return value;
  }
}


// Solution 2: Binary Search w/ BFS

// Binary search for the minimum maximum difference.
// isEnough:
  // Given a maximum difference, 
  // perform bfs from the top left cell, only travelling to cells where the difference is <= the maximum difference.
  // If we can reach the bottom right cell, return true.

// Time Complexity: O(mn log(10^6)) 599ms
// Space Complexity: O(mn) 59.7MB
var minimumEffortPath = function(heights) {
  let m = heights.length, n = heights[0].length;
  let min = heights[0][0], max = heights[0][0];
  // get minimum and maximum height
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      min = Math.min(min, heights[i][j]);
      max = Math.max(max, heights[i][j]);
    }
  }
  
  let low = 0, high = max - min;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (isEnough(mid)) high = mid;
    else low = mid + 1;
  }
  return low;
  
  function isEnough(maxDiff) {
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    let queue = [[0, 0]], seen = Array(m).fill(0).map(() => Array(n).fill(0));
    
    while (queue.length) {
      let [row, col] = queue.shift();
      if (row === m - 1 && col === n - 1) return true; // reached bottom right cell
      for (let [x, y] of directions) {
        let newX = row + x, newY = col + y;
        if (newX < 0 || newX >= m || newY < 0 || newY >= n) continue; 
        if (Math.abs(heights[row][col] - heights[newX][newY]) > maxDiff || seen[newX][newY]) continue;
        seen[newX][newY] = 1;
        queue.push([newX, newY]);
      }
    }
    return false;
  }
};

// Three test cases to run function on
console.log(minimumEffortPath([[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]))
console.log(minimumEffortPath([[1,2,2],[3,8,2],[5,3,5]])) // 2 -> [1,3,5,3,5]
console.log(minimumEffortPath([[1,2,3],[3,8,4],[5,3,5]])) // 1