// 499. The Maze III


// Solution: Dijkstra's Algorithm

// Keep a priority queue which sorts by distance, then path by lexographical order. 
// Keep track of the path for each item in the priority queue.

// Time Complexity: O(mn log(mn)) 136ms
// Space Complexity: O(mn) 51.7MB
var findShortestWay = function(maze, ball, hole) {
  const directions = [[-1, 0, 'u'], [1, 0, 'd'], [0, -1, 'l'], [0, 1, 'r']];
  let m = maze.length, n = maze[0].length;
  let dp = Array(m);
  for (var i = 0; i < m; i++) {
    dp[i] = Array(n);
    for (var j = 0; j < n; j++) {
      dp[i][j] = {dist: Infinity, path: ''};
    }
  }
  dp[ball[0]][ball[1]].dist = 0;
  let heap = new Heap((a, b) => {
    if (a[2] === b[2]) return a[3].localeCompare(b[3]);
    return a[2] - b[2];
  });
  heap.add([ball[0], ball[1], 0, '']);
  while (!heap.isEmpty()) {
    let [row, col, currDist] = heap.remove();
    if (currDist > dp[row][col].dist) continue;
    for (var [x, y, dir] of directions) {
      let newX = row, newY = col, steps = 0;
      while (newX + x >= 0 && newX + x < m && newY + y >= 0 && newY + y < n && maze[newX + x][newY + y] !== 1) {
        newX += x, newY += y;
        steps++;
        if (newX === hole[0] && newY === hole[1]) break;
      }
      if (newX === row && newY === col) continue;
      let newPath = dp[row][col].path + dir;
      if (dp[row][col].dist + steps < dp[newX][newY].dist) {
        dp[newX][newY].dist = dp[row][col].dist + steps;
        dp[newX][newY].path = newPath;
        heap.add([newX, newY, dp[row][col].dist + steps, newPath]);
      } else if (dp[row][col].dist + steps === dp[newX][newY].dist) {
        if (newPath < dp[newX][newY].path) {
          dp[newX][newY].path = newPath;
        }
      }
    }
  }
  return dp[hole[0]][hole[1]].dist === Infinity ? "impossible" : dp[hole[0]][hole[1]].path;
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

// Four test cases
console.log(findShortestWay([[0,1,0,0,1,0,0,1,0,0],[0,0,1,0,0,1,0,0,1,0],[0,0,0,0,0,0,1,0,0,1],[0,0,0,0,0,0,1,0,0,1],[0,1,0,0,1,0,0,1,0,0],[0,0,1,0,0,1,0,0,0,0],[0,0,0,0,0,0,1,0,0,0],[1,0,0,1,0,0,0,0,0,1],[0,1,0,0,1,0,0,1,0,0],[0,0,0,0,0,1,0,0,1,0]], [2,4], [7,6])) // "drdrdrdldl"
console.log(findShortestWay([[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], [4,3], [0,1])) // "lul"
console.log(findShortestWay([[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], [4,3], [3,0])) // "impossible"
console.log(findShortestWay([[0,0,0,0,0,0,0],[0,0,1,0,0,1,0],[0,0,0,0,1,0,0],[0,0,0,0,0,0,1]], [0,4], [3,5])) // "dldr"