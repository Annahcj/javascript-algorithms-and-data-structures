// 505. The Maze II
// There is a ball in a maze with empty spaces (represented as 0) and walls (represented as 1). The ball can go through the empty spaces by rolling up, down, left or right, but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction.
// Given the m x n maze, the ball's start position and the destination, where start = [startrow, startcol] and destination = [destinationrow, destinationcol], return the shortest distance for the ball to stop at the destination. If the ball cannot stop at destination, return -1.
// The distance is the number of empty spaces traveled by the ball from the start position (excluded) to the destination (included).
// You may assume that the borders of the maze are all walls.


// Solution: Dijkstra's Algorithm

// For each cell, there are 4 paths with weights (the weight is the distance from the cell to a wall)
// Use dijkstra's algorithm to find the path with the smallest weight.

// Time Complexity: O(mn log(mn)) 148ms
// Space Complexity: O(mn) 50.7MB
var shortestDistance = function(maze, start, destination) {
  let m = maze.length, n = maze[0].length;
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let dist = Array(m).fill(0).map(() => Array(n).fill(Infinity));
  let heap = new Heap((a, b) => a[2] - b[2]);
  heap.add([start[0], start[1], 0]);
  dist[start[0]][start[1]] = 0;

  while (!heap.isEmpty()) {
    let [row, col, currDist] = heap.remove();
    if (dist[row][col] < currDist) continue; // if we have already found a shorter path, there is no point repeating.
    for (var [x, y] of directions) {
      let steps = 0, newX = row, newY = col;
      // traverse until wall is reached
      while (newX + x >= 0 && newX + x < m && newY + y >= 0 && newY + y < n && maze[newX + x][newY + y] !== 1) {
        newX += x, newY += y;
        steps++;
      }
      if (dist[row][col] + steps < dist[newX][newY]) { // if we found a shorter path, update it and add it to the heap.
        dist[newX][newY] = dist[row][col] + steps;
        heap.add([newX, newY, dist[row][col] + steps]);
      }
    }
  }
  return dist[destination[0]][destination[1]] === Infinity ? -1 : dist[destination[0]][destination[1]];
};

class Heap {
  constructor(comparator = (a, b) => a - b) {
    this.values = [];
    this.comparator = comparator;
  }
  add(val) {
    this.values.push(val);
    let idx = this.values.length - 1;
    let parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.comparator(this.values[idx], this.values[parentIdx]) < 0) {
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
    let childIdx = getChild(this.values, leftIdx, rightIdx, this.comparator);
    function getChild(vals, leftIdx, rightIdx, comparator) {
      let end = vals.length - 1;
      if (leftIdx > end && rightIdx > end) return -1;
      if (rightIdx > end) return leftIdx;
      if (comparator(vals[leftIdx], vals[rightIdx]) < 0) return leftIdx;
      return rightIdx;
    }
    while (childIdx > -1 && this.comparator(this.values[idx], this.values[childIdx]) > 0) {
      [this.values[idx], this.values[childIdx]] = [this.values[childIdx], this.values[idx]];
      idx = childIdx;
      leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      childIdx = getChild(this.values, leftIdx, rightIdx, this.comparator);
    }
    return value;
  }
  isEmpty() {
    return this.values.length === 0;
  }
}

// Three test cases
console.log(shortestDistance([[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], [0,4], [4,4])) // 12
console.log(shortestDistance([[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], [0,4], [3,2])) // -1
console.log(shortestDistance([[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], [4,3], [0,1])) // -1