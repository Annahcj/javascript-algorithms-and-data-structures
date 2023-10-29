// 1514. Path with Maximum Probability
// You are given an undirected weighted graph of n nodes (0-indexed), represented by an edge list where edges[i] = [a, b] is an undirected edge connecting the nodes a and b with a probability of success of traversing that edge succProb[i].
// Given two nodes start and end, find the path with the maximum probability of success to go from start to end and return its success probability.
// If there is no path from start to end, return 0. Your answer will be accepted if it differs from the correct answer by at most 1e-5.


// Solution: Dijkstra's Algorithm

// Use dijkstra's algorithm for the max path.
// Order the heap by cost in descending order.

// V = number of vertices, E = number of edges
// Time Complexity: O(V + E log(V)) 279ms
// Space Complexity: O(V + E) 69.4MB
var maxProbability = function(n, edges, succProb, start, end) {
  let cost = Array(n).fill(-Infinity), graph = Array(n).fill(0).map(() => []);
  let heap = new Heap((a, b) => b[1] - a[1]);  // [node, cost]   
  for (let i = 0; i < edges.length; i++) {
    let [x, y] = edges[i];
    graph[x].push([y, succProb[i]]);
    graph[y].push([x, succProb[i]]);
  }
  heap.add([start, 1]);
  cost[start] = 1;
  
  while (!heap.isEmpty()) {
    let [node, currCost] = heap.remove();
    if (currCost < cost[node]) continue;
    if (node === end) return currCost;
    
    for (let [nei, neiCost] of graph[node]) {
      let newCost = currCost * neiCost;
      if (newCost <= cost[nei]) continue;
      cost[nei] = newCost;
      heap.add([nei, newCost]);
    }
  }
  return 0;
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
console.log(maxProbability(3, [[0,1],[1,2],[0,2]], [0.5,0.5,0.2], 0, 2)) // 0.25
console.log(maxProbability(3, [[0,1],[1,2],[0,2]], [0.5,0.5,0.3], 0, 2)) // 0.3