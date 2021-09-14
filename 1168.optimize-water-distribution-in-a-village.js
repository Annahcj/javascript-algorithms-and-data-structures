// 1168. Optimize Water Distribution in a Village
// There are n houses in a village. We want to supply water for all the houses by building wells and laying pipes.
// For each house i, we can either build a well inside it directly with cost wells[i - 1] (note the -1 due to 0-indexing), or pipe in water from another well to it. The costs to lay pipes between houses are given by the array pipes, where each pipes[j] = [house1j, house2j, costj] represents the cost to connect house1j and house2j together using a pipe. Connections are bidirectional.
// Return the minimum total cost to supply water to all houses.


// Idea:
// All houses can be connected by pipes, so all we need to do is find the smallest well-building cost from wells.
// We can treat the well as a virtual house -> house 0

// Steps:

// 1. Add edges for house 0 to heap -> [0, i + 1, wells[i]] (cost of building house 0 is well[i])
// 2. Add pipes[i] to heap (already in correct format) 
// 3. Get MST (minimum spanning tree)


// Solution: Kruskal's Algorithm

// Loop while heap is not empty AND num of edges (count) are less than n
  // [house1, house2, cost] = heap.remove
  // If house1 and house2 are not connected,
    // increment totalCost by cost
    // increment count by one
    // union house1 and house2
// Return totalCost

// v = num of houses, e = pipes.length
// Time Complexity: O(v + e * log(v + e)) 212ms
// Space Complexity: O(v + e) 58.9MB
var minCostToSupplyWater = function(n, wells, pipes) {
  let heap = new MinHeap();
  for (var i = 0; i < n; i++) {
    heap.add([0, i + 1, wells[i]]);
  }
  for (i = 0; i < pipes.length; i++) {
    heap.add(pipes[i]);
  }
  let uf = new UnionFind(n + 1);
  let count = 0, totalCost = 0;
  while (!heap.isEmpty() && count < n) {
    let [house1, house2, cost] = heap.remove();
    if (!uf.isConnected(house1, house2)) {
      totalCost += cost;
      count++;
      uf.union(house1, house2);
    }
  }
  return totalCost;
};

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
    if (this.rank[rootX] > this.rank[rootY]) {
      this.root[rootY] = rootX;
    } else if (this.rank[rootX] < this.rank[rootY]) {
      this.root[rootX] = rootY;
    } else {
      this.root[rootY] = rootX;
      this.rank[rootX]++;
    }
  }
  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }
}

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

// Two test cases to run function on
console.log(minCostToSupplyWater(3, [1,2,2], [[1,2,1], [2,3,1]])) // 3
console.log(minCostToSupplyWater(2, [1,1], [[1,2,1]])) // 2