// 1584. Min Cost to Connect All Points
// You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].
// The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance between them: |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val.
// Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.


// Solution 1: Kruskal's Algorithm 

// Idea:
// Use min heap to pick unconnected edges with the smallest weight
// Use union find to check whether edges are connected

// Algorithm:
// n = points.length
// From the points, loop through each unique pair
  // calculate the manhattan distance, or cost -> abs(x1 - x2) + abs(y1 - y2)
  // add [i, j, cost] to a min heap.
// Set uf to new UnionFind with a size of n
// ans = 0 (answer to return)
// Loop while the heap is not empty and the number of edges we take is less than n - 1 (the min number of edges for a minimum spanning tree)
  // remove [x, y, cost] from the heap
  // if x and y are not connected
    // connect x and y (union)
    // increment ans by cost
    // increment count by one
// Return ans

// Time Complexity: O(n * n log(n * n)) 780ms
// Space Complexity: O(n * n) 90.2MB
var minCostConnectPoints = function(points) {
  let n = points.length;
  let heap = new MinHeap();
  for (var i = 0; i < n; i++) {
    for (var j = i + 1; j < n; j++) {
      let cost = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
      heap.add([i, j, cost]);
    }
  }
  let uf = new UnionFind(n), count = 0;
  let ans = 0;
  while (!heap.isEmpty() && count < n - 1) {
    let [x, y, cost] = heap.remove();
    if (!uf.connected(x, y)) {
      uf.union(x, y);
      ans += cost;
      count++;
    }
  }
  return ans;
};

// Union Find with Union by Rank + Path Compression
class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size);
    for (var i = 0; i < size; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
    }
  }
  find(x) {
    if (this.root[x] === x) return x;
    return this.root[x] = this.find(this.root[x]);
  }
  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.root[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.root[rootX] = rootY;
      } else {
        this.root[rootY] = rootX;
        this.rank[rootX] += this.rank[rootY];
      }
    }
  }
  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Min Heap
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
  isEmpty() {
    return this.values.length === 0;
  }
}

// Solution 2: Prim's Algorithm

// Time Complexity: O(n * n log(n * n)) 712ms
// Space Complexity: O(n * n) 89.7MB
var minCostConnectPoints = function(points) {
  let n = points.length;
  let heap = new MinHeap();
  for (var i = 1; i < n; i++) {
    let cost = Math.abs(points[0][0] - points[i][0]) + Math.abs(points[0][1] - points[i][1]);
    heap.add([0, i, cost]);
  }
  let count = 0, ans = 0;
  let visited = {};
  visited[0] = true;
  while (!heap.isEmpty() && count < n - 1) {
    let [x, y, cost] = heap.remove();
    if (!visited[y]) {
      ans += cost;
      visited[y] = true;
      for (var j = 0; j < n; j++) {
        if (!visited[j]) {
          let cost = Math.abs(points[y][0] - points[j][0]) + Math.abs(points[y][1] - points[j][1]);
          heap.add([y, j, cost]);
        }
      }
      count++;
    }
  }
  return ans;
};

// Five test cases to run function on
console.log(minCostConnectPoints([[0,0],[2,2],[3,10],[5,2],[7,0]])) // 20
console.log(minCostConnectPoints([[3,12],[-2,5],[-4,1]])) // 18
console.log(minCostConnectPoints([[0,0],[1,1],[1,0],[-1,1]])) // 4
console.log(minCostConnectPoints([[-1000000,-1000000],[1000000,1000000]])) // 4000000
console.log(minCostConnectPoints([[0,0]])) // 0