// 407. Trapping Rain Water II
// Given an m x n integer matrix heightMap representing the height of each unit cell in a 2D elevation map, return the volume of water it can trap after raining.


// Solution: Keep Boundary Heights

// Keep all boundary cells in a heap.
// Start from the outer border, and use BFS to work our way inwards.
// We know that the outer border can't hold any water since water will flow outwards.
// The heap will be ordered by minimum height, so that when we pull out a cell, it always has minimum height in the current boundary.
  // Mark cells we have visited with heightMap[i][j] = -1 
  // Remove the minimum height cell from the heap.
  // Travel to unvisited neighbor cells,
    // If the height is greater than the minimum height: We can't trap any water. Add the cell to the heap as a new boundary cell.
    // If the height is less than the minimum height: We can trap (minimum border cell height - current cell height) amount of water. Add the cell to the heap with the maximum height max(0, height - heightMap[newX][newY]).

// Reasoning: We are always processing the minimum heights first, because the minimum border cell height is the border height for cells within it.

// Time Complexity: O(mn log(mn)) 123ms
// Space Complexity: O(mn) 53.5MB
var trapRainWater = function(heightMap) {
  let heap = new Heap((a, b) => a[2] - b[2]); // [row, col, height]
  let m = heightMap.length, n = heightMap[0].length;
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  for (let i = 0; i < m; i++) {
    heap.add([i, 0, heightMap[i][0]]);
    heightMap[i][0] = -1;
    heap.add([i, n - 1, heightMap[i][n - 1]]);
    heightMap[i][n - 1] = -1;
  }
  for (let j = 1; j < n - 1; j++) {
    heap.add([0, j, heightMap[0][j]]);
    heightMap[0][j] = -1;
    heap.add([m - 1, j, heightMap[m - 1][j]]);
    heightMap[m - 1][j] = -1;
  }
  
  let ans = 0;
  while (!heap.isEmpty()) {
    let [row, col, height] = heap.remove();
    for (let [x, y] of directions) {
      let newX = row + x, newY = col + y;
      if (newX < 0 || newX >= m || newY < 0 || newY >= n || heightMap[newX][newY] === -1) continue; // out of bounds or already visited
      heap.add([newX, newY, Math.max(height, heightMap[newX][newY])]);
      ans += Math.max(0, height - heightMap[newX][newY]);
      heightMap[newX][newY] = -1;
    }
  }
  return ans;
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
console.log(trapRainWater([[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]])) // 4
console.log(trapRainWater([[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]])) // 10