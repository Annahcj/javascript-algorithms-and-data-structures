// 3123. Find Edges in Shortest Paths
// You are given an undirected weighted graph of n nodes numbered from 0 to n - 1. The graph consists of m edges represented by a 2D array edges, where edges[i] = [a[i], b[i], w[i]] indicates that there is an edge between nodes a[i] and b[i] with weight w[i].
// Consider all the shortest paths from node 0 to node n - 1 in the graph. You need to find a boolean array answer where answer[i] is true if the edge edges[i] is part of at least one shortest path. Otherwise, answer[i] is false.
// Return the array answer.
// Note that the graph may not be connected.


// Solution: Dijkstra's Algorithm

// Note: If there is a path with greater weight than the minimum weight to reach a node, that path will never be the shortest path.

// 1. Use Dijkstra's algorithm to find the shortest path from node 0 to every other node.
// 2. Use Dijkstra's algorithm to find the shortest path from node n - 1 to every other node.
// 3. Go through each edge (a, b, w) and if either of the following are true, this edge can be included in a shortest path:
  // a. dist from source to a + edge weight + distance from target to b is equal to the shortest distance from source to target
  // b. dist from source to b + edge weight + distance from target to a is equal to the shortest distance from source to target

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m log(n + m)) 774ms
// Space Complexity: O(n + m) 96.8MB
var findAnswer = function(n, edges) {
  let graph = Array(n).fill(0).map(() => []);
  for (let [a, b, w] of edges) {
    graph[a].push([b, w]);
    graph[b].push([a, w]);
  }
  let distFromSource = getDist(graph, 0);
  let distFromTarget = getDist(graph, n - 1);
  let m = edges.length, ans = Array(m).fill(false);
  let shortestDist = distFromSource[n - 1];
  if (shortestDist === Infinity) return ans; // can't reach n - 1 from 0
  for (let i = 0; i < m; i++) {
    let [a, b, w] = edges[i];
    let dist = distFromSource[a] + distFromTarget[b] + w;
    let distReverse = distFromSource[b] + distFromTarget[a] + w;
    if (dist === shortestDist || distReverse === shortestDist) {
      ans[i] = true;
    }
  }
  return ans;
};

function getDist(graph, src) {
  let dist = Array(graph.length).fill(Infinity);
  let heap = new Heap((a, b) => a[1] - b[1]);
  heap.add([src, 0]);
  dist[src] = 0;

  while (!heap.isEmpty()) {
    let [node, cost] = heap.remove();
    if (dist[node] < cost) continue;
    for (let [nei, weight] of graph[node]) {
      if (dist[nei] > cost + weight) {
        dist[nei] = Math.min(dist[nei], cost + weight);
        heap.add([nei, cost + weight]);
      }
    }
  }
  return dist;
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

// Two test cases
console.log(findAnswer(6, [[0,1,4],[0,2,1],[1,3,2],[1,4,3],[1,5,1],[2,3,1],[3,5,3],[4,5,2]])) // [true,true,true,false,true,true,true,false]
console.log(findAnswer(4, [[2,0,1],[0,1,1],[0,3,4],[3,2,2]])) // [true,false,false,true]