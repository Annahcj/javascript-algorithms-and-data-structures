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
  for (let i = 0; i < n; i++) {
    heap.add([0, i + 1, wells[i]]);
  }
  for (let i = 0; i < pipes.length; i++) {
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

// Uncomment for solution 1

// class MinHeap {
//   constructor() {
//     this.values = [];
//   }
//   add(val) {
//     this.values.push(val);
//     let idx = this.values.length - 1;
//     let parentIdx = Math.floor((idx - 1) / 2);
//     while (parentIdx >= 0 && this.values[idx][2] < this.values[parentIdx][2]) {
//       [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
//       idx = parentIdx;
//       parentIdx = Math.floor((idx - 1) / 2);
//     }
//     return val;
//   }
//   remove() {
//     if (!this.values.length) return -1;
//     if (this.values.length === 1) return this.values.pop();
//     let value = this.values[0];
//     let popped = this.values.pop();
//     this.values[0] = popped;
//     let idx = 0;
//     let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
//     let childIdx = getChild(this.values, leftIdx, rightIdx);
//     function getChild(vals, leftIdx, rightIdx) {
//       let end = vals.length - 1;
//       if (leftIdx > end && rightIdx > end) return -1;
//       if (rightIdx > end) return leftIdx;
//       if (vals[leftIdx][2] < vals[rightIdx][2]) return leftIdx;
//       return rightIdx;
//     }
//     while (childIdx > -1 && this.values[idx][2] > this.values[childIdx][2]) {
//       [this.values[idx], this.values[childIdx]] = [this.values[childIdx], this.values[idx]];
//       idx = childIdx;
//       leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
//       childIdx = getChild(this.values, leftIdx, rightIdx);
//     }
//     return value;
//   }
//   isEmpty() {
//     return this.values.length === 0;
//   }
// }

// <---------------------------------------------------------------------------------------------------------------------------------------------------------->


// Solution 2: Prim's Algorithm

// Create an adjacency list to store all edges,
  // the virtual edges (0 to i+1th well in wells)
  // bidirectional edges for pipes ([house1, house2, cost] => house1 -> [house2, cost], house2 -> [house1, cost])
// for each virtual edge, add [i + 1 (house), wells[i] (cost)] to a heap.
// keep a 'visited' hashmap to keep track of houses we have been to.
// mark 0 as visited.
// Keep totalCost and count (number of edges should be n - 1 for a MST)
// Loop while heap is not empty AND count is smaller than n
  // let [house, cost] be heap.remove()
  // if house has not been visited yet,
    // increment totalCost by cost
    // increment count by one
    // mark house as visited
    // loop through each [neighbor, nextCost] in graph[house]
      // if neighbor has not been visited before,
        // add [neighbor, nextCost] to the heap
// Return totalCost

// v = num of houses, e = pipes.length
// Time Complexity: O(v + e * log(v + e)) 356ms
// Space Complexity: O(v + e) 76.6MB
var minCostToSupplyWater = function(n, wells, pipes) {
  let heap = new MinHeap(), graph = {};
  for (let i = 0; i < n + 1; i++) {
    graph[i] = [];
  }
  for (let i = 0; i < wells.length; i++) {
    graph[0].push([i + 1, wells[i]]);
    heap.add([i + 1, wells[i]]);
  }
  for (let [house1, house2, cost] of pipes) {
    graph[house1].push([house2, cost]);
    graph[house2].push([house1, cost]);
  }
  let visited = {};
  visited[0] = true;
  let totalCost = 0, count = 0;
  while (!heap.isEmpty() && count < n) {
    let [house, cost] = heap.remove();
    if (!visited[house]) {
      totalCost += cost;
      count++;
      visited[house] = true;
      for (let [neighbor, nextCost] of graph[house]) {
        if (!visited[neighbor]) {
          heap.add([neighbor, nextCost]);
        }
      }
    }
  }
  return totalCost;
};

// Min heap for solution 2
class MinHeap {
  constructor() {
    this.values = [];
  }
  add(val) {
    this.values.push(val);
    let idx = this.values.length - 1;
    let parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.values[idx][1] < this.values[parentIdx][1]) {
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
      if (vals[leftIdx][1] < vals[rightIdx][1]) return leftIdx;
      return rightIdx;
    }
    while (childIdx > -1 && this.values[idx][1] > this.values[childIdx][1]) {
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

// Two test cases 
console.log(minCostToSupplyWater(3, [1,2,2], [[1,2,1], [2,3,1]])) // 3
console.log(minCostToSupplyWater(2, [1,1], [[1,2,1]])) // 2