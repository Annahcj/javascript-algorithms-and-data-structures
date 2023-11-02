// 2699. Modify Graph Edge Weights
// You are given an undirected weighted connected graph containing n nodes labeled from 0 to n - 1, and an integer array edges where edges[i] = [a[i], b[i], w[i]] indicates that there is an edge between nodes a[i] and b[i] with weight w[i].
// Some edges have a weight of -1 (w[i] = -1), while others have a positive weight (w[i] > 0).
// Your task is to modify all edges with a weight of -1 by assigning them positive integer values in the range [1, 2 * 10^9] so that the shortest distance between the nodes source and destination becomes equal to an integer target. If there are multiple modifications that make the shortest distance between source and destination equal to target, any of them will be considered correct.
// Return an array containing all edges (even unmodified ones) in any order if it is possible to make the shortest distance from source to destination equal to target, or an empty array if it's impossible.
// Note: You are not allowed to modify the weights of edges with initial positive weights.


// Solution: Dijkstra's Algorithm 

// 1. Use dijkstra's algorithm to find the shortest path to every node from the destination, not using any negative weights (we skip over them).

// 2. Use dijkstra's algorithm again to find the shortest path to every node from the source, using both positive and negative weights (we take negative weights as 1).

// 3. Build the path from source to target based on the `prev` array (we keep track of the previous node when running dijkstra's algorithm).

// 4. Modify the negative weighted edges.
  // Keep track of the current distance from source to the current node.
  // Important: The maximum weight we can assign is target - distance from neighbor to destination using positive weights only - current distance
  // Explanation: We try to assign the maximum weight possible such that the current path is still the shortest distance after modifying the weight.

// n = number of nodes, m = number of edges
// Time Complexity: O((n + m) log(n)) 712ms
// Space Complexity: O(n + m) 91.6MB
var modifiedGraphEdges = function(n, edges, source, destination, target) {
  let graph = Array(n).fill(0).map(() => []);
  for (let [a, b, weight] of edges) {
    graph[a].push([b, weight]);
    graph[b].push([a, weight]);
  }
  let [distPositive] = getDist(graph, destination, true);
  if (distPositive[source] < target) return []; // impossible since a shorter distance path with no modifiable edges exists
  let [dist, prev] = getDist(graph, source, false);
  if (dist[destination] > target) return []; // impossible since shortest path exceeds target and we can modify weights to be greater not smaller

  let edgesMap = {}; // map of edges -> index in edges
  for (let i = 0; i < edges.length; i++) {
    let [a, b] = edges[i];
    edgesMap[`${a},${b}`] = i;
    edgesMap[`${b},${a}`] = i;
  }

  let path = [destination], currNode = destination;
  while (currNode !== source) {
    let nei = prev[currNode];
    path.push(nei);
    currNode = nei;
  }
  path.reverse();

  let res = [], used = Array(edges.length).fill(false), currDist = 0;
  for (let i = 0; i < path.length - 1; i++) {
    let node = path[i], nei = path[i + 1];
    let edgeIndex = edgesMap[`${node},${nei}`];
    let edge = edges[edgeIndex], weight = edge[2];
    if (weight === -1) {
      let modifiedWeight = Math.max(1, target - distPositive[nei] - currDist);
      res.push([edge[0], edge[1], modifiedWeight]);
      currDist += modifiedWeight;
    } else {
      res.push(edge);
      currDist += weight;
    }
    used[edgeIndex] = true;
  }

  for (let i = 0; i < edges.length; i++) {
    if (used[i]) continue;
    if (edges[i][2] === -1) res.push([edges[i][0], edges[i][1], 2 * (10 ** 9)]); // modify remaining unused negative weights to be maximum possible to ensure we don't create any shorter distances
    else res.push(edges[i]);
  }
  return res;
};

function getDist(graph, src, skipNegative) {
  let dist = Array(graph.length).fill(Infinity);
  let heap = new Heap((a, b) => a[1] - b[1]);
  let prev = Array(graph.length).fill(-1);
  heap.add([src, 0]);
  dist[src] = 0;

  while (!heap.isEmpty()) {
    let [node, cost] = heap.remove();
    if (dist[node] < cost) continue;
    for (let [nei, weight] of graph[node]) {
      if (skipNegative && weight === -1) continue;
      let weightTaken = Math.max(1, weight);
      if (dist[nei] > cost + weightTaken) {
        dist[nei] = cost + weightTaken;
        prev[nei] = node;
        heap.add([nei, cost + weightTaken]);
      }
    }
  }
  return [dist, prev];
}

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

// Three test cases
console.log(modifiedGraphEdges(5, [[4,1,-1],[2,0,-1],[0,3,-1],[4,3,-1]], 0, 1, 5)) // [[4,1,1],[2,0,1],[0,3,3],[4,3,1]] (may be more than one answer)
console.log(modifiedGraphEdges(3, [[0,1,-1],[0,2,5]], 0, 2, 6)) // []
console.log(modifiedGraphEdges(4, [[0,1,-1],[2,0,2],[3,2,6],[2,1,10],[3,0,-1]], 1, 3, 12)) // [[0,1,11],[2,0,2],[3,2,6],[2,1,10],[3,0,1]] (may be more than one answer)