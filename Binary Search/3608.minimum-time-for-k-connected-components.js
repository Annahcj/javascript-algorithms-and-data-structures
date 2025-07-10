// 3608. Minimum Time for K Connected Components
// You are given an integer n and an undirected graph with n nodes labeled from 0 to n - 1. This is represented by a 2D array edges, where edges[i] = [ui, vi, timei] indicates an undirected edge between nodes ui and vi that can be removed at timei.
// You are also given an integer k.
// Initially, the graph may be connected or disconnected. Your task is to find the minimum time t such that after removing all edges with time <= t, the graph contains at least k connected components.
// Return the minimum time t.
// A connected component is a subgraph of a graph in which there exists a path between any two vertices, and no vertex of the subgraph shares an edge with a vertex outside of the subgraph.


// Solution: Binary Search

// Binary search for the minimum time t.
// For a time t, find the number of connected components without using edges with time <= t.

// Finding the number of connected components:
  // For each node, use DFS to visit all nodes connected to that node.
  // If we've already visited a node, skip it.
  // The count of non-visited nodes is the number of connected components.

// n = number of nodes
// Time Complexity: O((n + edges) * log(max(time))) 931ms
// Space Complexity: O(n) 144MB
function minTime(n, edges, k) {
  const graph = Array(n).fill(0).map(() => []);
  let maxTime = 0;
  for (let [u, v, time] of edges) {
    graph[u].push([v, time]);
    graph[v].push([u, time]);
    maxTime = Math.max(maxTime, time);
  }
  let low = 0, high = maxTime;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (connectedComponents(n, graph, mid) >= k) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return low;
};

// Find connected components excluding edges with time <= t
function connectedComponents(n, graph, t) {
  const seen = Array(n).fill(false);
  let components = 0;
  for (let i = 0; i < n; i++) {
    if (!seen[i]) {
      components++;
      dfs(i);
    }
  }
  return components;

  function dfs(node) {
    seen[node] = true;
    for (let [nei, time] of graph[node]) {
      if (!seen[nei] && time > t) {
        dfs(nei);
      }
    }
  }
}

// Two test cases
console.log(minTime(2, [[0,1,3]], 2)) // 3
console.log(minTime(3, [[0,1,2],[1,2,4]], 3)) // 4