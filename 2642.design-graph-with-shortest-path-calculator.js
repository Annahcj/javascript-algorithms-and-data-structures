// 2642. Design Graph With Shortest Path Calculator
// There is a directed weighted graph that consists of n nodes numbered from 0 to n - 1. The edges of the graph are initially represented by the given array edges where edges[i] = [from[i], to[i], edgeCost[i]] meaning that there is an edge from from[i] to to[i] with the cost edgeCost[i].
// Implement the Graph class:
  // Graph(int n, int[][] edges) initializes the object with n nodes and the given edges.
  // addEdge(int[] edge) adds an edge to the list of edges where edge = [from, to, edgeCost]. It is guaranteed that there is no edge between the two nodes before adding this one.
  // int shortestPath(int node1, int node2) returns the minimum cost of a path from node1 to node2. If no path exists, return -1. The cost of a path is the sum of the costs of the edges in the path.


// Solution: Dijkstra's Algorithm

// For each call to shortestPath, use Dijkstra's Algorithm to find the shortest path from node1 to node2.

// n = number of nodes, m = number of edges
// Time Complexity: 286ms
  // init: O(n + m)
  // addEdge: O(1)
  // shortestPath: O((n + m) log(n))
// Space Complexity: O(n + m) 59MB
var Graph = function(n, edges) {
  this.graph = Array(n).fill(0).map(() => []);   
  for (let [from, to, edgeCost] of edges) {
    this.graph[from].push([to, edgeCost]);
  }
};

Graph.prototype.addEdge = function(edge) {
  let [from, to, edgeCost] = edge;
  this.graph[from].push([to, edgeCost]);
};

Graph.prototype.shortestPath = function(node1, node2) {
  let n = this.graph.length;
  let heap = new Heap((a, b) => a[1] - b[1]); // [node, current cost]
  let dist = Array(n).fill(Infinity);
  heap.add([node1, 0]);
  dist[node1] = 0;
  
  while (!heap.isEmpty()) {
    let [node, currCost] = heap.remove();
    if (node === node2) return currCost;
    if (dist[node] < currCost) continue;
    for (let [nei, edgeCost] of this.graph[node]) {
      let newCost = dist[node] + edgeCost;
      if (dist[nei] <= newCost) continue;
      dist[nei] = newCost;
      heap.add([nei, newCost]);
    }
  }
  return -1;
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