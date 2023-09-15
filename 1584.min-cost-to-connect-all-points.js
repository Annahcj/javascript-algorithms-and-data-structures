// 1584. Min Cost to Connect All Points
// You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].
// The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance between them: |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val.
// Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.


// Solution 1: Kruskal's Algorithm

// Kruskal's algorithm to find the cost of the minimum spanning tree (n - 1 edges).

// 1. Get the edges from each pair of points and compute the cost.
// 2. Sort the edges by cost.
// 3. Process the edges in sorted order.
  // If the two nodes aren't connected yet, use the edge.
  // Use union find to check whether two nodes are connected.

// Time Complexity: O(n^2 log(n^2)) 2296ms
// Space Complexity: O(n^2) 189.6MB
var minCostConnectPoints = function(points) {
  let n = points.length, edges = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let cost = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
      edges.push([i, j, cost]);
      edges.push([j, i, cost]);
    }
  }
  edges.sort((a, b) => a[2] - b[2]);
  let uf = new UnionFind(n), minCost = 0;
  for (let [x, y, cost] of edges) {
    if (!uf.isConnected(x, y)) {
      uf.union(x, y);
      minCost += cost;
    }
  }
  return minCost;
};

class UnionFind {
  constructor(n) {
    this.root = Array(n);
    this.rank = Array(n);
    for (let i = 0; i < n; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
    }
  }
  find(x) {
    if (this.root[x] === x) return x;
    return this.root[x] = this.find(this.root[x]);
  }
  union(x, y) {
    let rootX = this.find(x), rootY = this.find(y);
    if (rootX === rootY) return false;
    if (this.rank[rootX] < this.rank[rootY]) {
      this.root[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.root[rootY] = rootX;
    } else {
      this.root[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }
}


// Solution 2: Prim's Algorithm

// 1. Pick any point as the starting point (we'll pick 0 here).
// 2. Compute the costs of all edges from node 0 and store them in a min heap.
// 3. While we haven't visited all the nodes, 
  // Use the edge at the top of the min heap (with the minimum cost) if we haven't visited the node y yet.
  // Compute the costs of all edges from node y and store them in the min heap for the next iteration.

// Time Complexity: O(n^2 log(n^2)) 460ms
// Space Complexity: O(n^2) 138.8MB
var minCostConnectPoints = function(points) {
  let n = points.length, minHeap = new Heap((a, b) => a[2] - b[2]);
  for (let i = 1; i < n; i++) {
    let cost = Math.abs(points[i][0] - points[0][0]) + Math.abs(points[i][1] - points[0][1]);
    minHeap.add([0, i, cost]);
  }
  let seen = Array(n).fill(false), nodesLeft = n - 1, minCost = 0;
  seen[0] = true;
  while (nodesLeft > 0) {
    let [_x, y, cost] = minHeap.remove();
    if (seen[y]) continue;
    seen[y] = true;
    nodesLeft--;
    minCost += cost;
    for (let i = 0; i < n; i++) {
      if (seen[i]) continue; // we only want edges to unvisited nodes
      let cost = Math.abs(points[y][0] - points[i][0]) + Math.abs(points[y][1] - points[i][1]);
      minHeap.add([y, i, cost]);
    }
  }
  return minCost;
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
console.log(minCostConnectPoints([[0,0],[2,2],[3,10],[5,2],[7,0]])) // 20
console.log(minCostConnectPoints([[3,12],[-2,5],[-4,1]])) // 18