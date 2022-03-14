// 2203. Minimum Weighted Subgraph With the Required Paths
// You are given an integer n denoting the number of nodes of a weighted directed graph. The nodes are numbered from 0 to n - 1.
// You are also given a 2D integer array edges where edges[i] = [fromi, toi, weighti] denotes that there exists a directed edge from fromi to toi with weight weighti.
// Lastly, you are given three distinct integers src1, src2, and dest denoting three distinct nodes of the graph.
// Return the minimum weight of a subgraph of the graph such that it is possible to reach dest from both src1 and src2 via a set of edges of this subgraph. In case such a subgraph does not exist, return -1.
// A subgraph is a graph whose vertices and edges are subsets of the original graph. The weight of a subgraph is the sum of weights of its constituent edges.


// Solution: 3 Dijkstra's

// Find a common node x where src1 and src2 meet, and share the remaining path from node x to dest.
// The minimum weight could come from not sharing any path, where the common node is dest.

// Populate graph and reversed graph
// 1. get distances from src1 to each node
// 2. get distances from src2 to each node
// 3. get distances from dest to each node using the reversed graph
  // reversed because dijkstra's is single source, so we need to start from dest.

// Then, get the minimum sum of dist1[i] + dist2[i] + dist3[i].

// Time Complexity: O(v + e log(e)) 996ms
// Space Complexity: O(v + e) 131.3MB
var minimumWeight = function(n, edges, src1, src2, dest) {
  let graph = {}, reversed = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
    reversed[i] = [];
  }
  // populate graph & reversed graph
  for (let [x, y, weight] of edges) {
    graph[x].push([y, weight]);
    reversed[y].push([x, weight]);
  }
  // graph[i][j] = [node, weight]
  function getDist(graph, src) {
    let dist = Array(n).fill(Infinity);
    let heap = new PriorityQueue((a, b) => a[1] - b[1]);
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

  let dist1 = getDist(graph, src1);
  let dist2 = getDist(graph, src2);
  let dist3 = getDist(reversed, dest);
  
  let ans = Infinity;
  for (let i = 0; i < n; i++) {
    ans = Math.min(ans, dist1[i] + dist2[i] + dist3[i]);
  }
  return ans;
};

class PriorityQueue {
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

// A test case to run function on
console.log(minimumWeight(6, [[0,2,2],[0,5,6],[1,0,3],[1,4,5],[2,1,1],[2,3,3],[2,3,4],[3,4,2],[4,5,1]], 0, 1, 5)) // 9