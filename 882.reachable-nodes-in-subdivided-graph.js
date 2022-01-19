// 882. Reachable Nodes In Subdivided Graph
// You are given an undirected graph (the "original graph") with n nodes labeled from 0 to n - 1. You decide to subdivide each edge in the graph into a chain of nodes, with the number of new nodes varying between each edge.
// The graph is given as a 2D array of edges where edges[i] = [ui, vi, cnti] indicates that there is an edge between nodes ui and vi in the original graph, and cnti is the total number of new nodes that you will subdivide the edge into. Note that cnti == 0 means you will not subdivide the edge.
// To subdivide the edge [ui, vi], replace it with (cnti + 1) new edges and cnti new nodes. The new nodes are x1, x2, ..., xcnti, and the new edges are [ui, x1], [x1, x2], [x2, x3], ..., [xcnti-1, xcnti], [xcnti, vi].
// In this new graph, you want to know how many nodes are reachable from the node 0, where a node is reachable if the distance is maxMoves or less.
// Given the original graph and maxMoves, return the number of nodes that are reachable from node 0 in the new graph.


// Solution: Dijkstra's Algorithm

// seen[i] = maximum number of nodes reachable from this point onwards (doesn't matter where we go)
// It is optimal to be able to reach as many nodes as possible from each reachable node, hence we will sort our priority queue by maximum number of moves left. 

// How to calculate the final answer:
// Try each edge: [x, y, nodes]
  // xNodes = max number of nodes we can reach from x.
  // yNodes = max number of nodes we can reach from x.
  // nodes = the number of nodes in between x and y.
  // Take the minimum of: (xNodes + yNodes, nodes)

// E = number of edges, V = number of vertices
// Time Complexity: O(E log(V)) 256ms
// Space Complexity: O(E) 81.3MB
var reachableNodes = function(edges, maxMoves, n) {
  let graph = {};
  for (var i = 0; i < n; i++) graph[i] = [];
  for (var [x, y, nodes] of edges) {
    graph[x].push([y, nodes]);
    graph[y].push([x, nodes]);
  }
  let pq = new PriorityQueue((a, b) => b[1] - a[1]), seen = new Map();
  pq.add([0, maxMoves]);
  
  while (!pq.isEmpty()) {
    let [node, moves] = pq.remove();
    if (seen.has(node)) continue;
    seen.set(node, moves);
    for (var [nei, nodes] of graph[node]) {
      let movesLeft = moves - nodes - 1;
      if (!seen.has(nei) && movesLeft >= 0) {
        pq.add([nei, movesLeft]);
      }
    }
  }
  let res = seen.size;
  for (var [x, y, nodes] of edges) {
    let xNodes = seen.get(x) || 0;
    let yNodes = seen.get(y) || 0;
    res += Math.min(xNodes + yNodes, nodes);
  }
  return res;
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

// Three test cases to run function on
console.log(reachableNodes([[0,1,10],[0,2,1],[1,2,2]], 6, 3)) // 13
console.log(reachableNodes([[0,1,4],[1,2,6],[0,2,8],[1,3,1]], 10, 4)) // 23
console.log(reachableNodes([[1,2,4],[1,4,5],[1,3,1],[2,3,4],[3,4,5]], 17, 5)) // 1