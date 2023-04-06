// 2608. Shortest Cycle in a Graph
// There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1. The edges in the graph are represented by a given 2D integer array edges, where edges[i] = [u[i], v[i]] denotes an edge between vertex u[i] and vertex v[i]. Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.
// Return the length of the shortest cycle in the graph. If no cycle exists, return -1.
// A cycle is a path that starts and ends at the same node, and each edge in the path is used only once.


// Solution: BFS

// BFS from each node to find the shortest length of reaching the starting node.
  // Record the shortest distance from node i to every other node.
  // When we reach a node j where we have visited previously and we are using a different path (previous node of the current node is not equal to node j), then we have a cycle.
  // The length of the cycle is the shortest possible: current distance * 2 + 2 (for odd-lengthed cycles, dist * 2 + 1)

// n = number of nodes, m = number of edges
// Time Complexity: O(n^2) 362ms
// Space Complexity: O(n + m) 55.3MB
var findShortestCycle = function(n, edges) {
  let graph = Array(n).fill(0).map(() => []);
  for (let [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }
  let minCycleLen = Infinity;
  for (let i = 0; i < n; i++) {
    minCycleLen = Math.min(minCycleLen, getMinCycleLen(graph, i));
  }  
  return minCycleLen === Infinity ? -1 : minCycleLen;
};

function getMinCycleLen(graph, startNode) {
  let queue = [startNode], currDist = 0;
  let n = graph.length, dist = Array(n).fill(Infinity), prev = Array(n).fill(-1);
  dist[startNode] = 0;
  while (queue.length) {
    let next = [], minDist = Infinity;
    while (queue.length) {
      let node = queue.pop();
      for (let nei of graph[node]) {
        if (dist[nei] !== Infinity && prev[node] !== nei) { // found a node we have reached using a different path
          let oddLengthedCycle = dist[nei] === currDist;
          if (oddLengthedCycle) return currDist * 2 + 1; // if we find an odd-lengthed cycle, there will not be any shorter cycles at this level of bfs
          minDist = Math.min(minDist, currDist * 2 + 2); // can potentially have an odd-lengthed cycle (which is shorter), so don't return immediately.
        } else if (dist[nei] === Infinity) {
          dist[nei] = currDist + 1;
          prev[nei] = node;
          next.push(nei);
        }
      }
    }
    if (minDist !== Infinity) return minDist;
    queue = next;
    currDist++;
  }
  return Infinity;
}

// Two teset cases
console.log(findShortestCycle(7, [[0,1],[1,2],[2,0],[3,4],[4,5],[5,6],[6,3]])) // 3
console.log(findShortestCycle(4, [[0,1],[0,2]])) // -1