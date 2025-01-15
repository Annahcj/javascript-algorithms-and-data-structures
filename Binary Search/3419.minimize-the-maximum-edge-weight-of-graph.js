// 3419. Minimize the Maximum Edge Weight of Graph
// You are given two integers, n and threshold, as well as a directed weighted graph of n nodes numbered from 0 to n - 1. The graph is represented by a 2D integer array edges, where edges[i] = [A[i], B[i], W[i]] indicates that there is an edge going from node A[i] to node B[i] with weight W[i].
// You have to remove some edges from this graph (possibly none), so that it satisfies the following conditions:
  // Node 0 must be reachable from all other nodes.
  // The maximum edge weight in the resulting graph is minimized.
  // Each node has at most threshold outgoing edges.
// Return the minimum possible value of the maximum edge weight after removing the necessary edges. If it is impossible for all conditions to be satisfied, return -1.


// Solution: Binary Search & DFS

// The third rule is irrelevant because each node only needs one edge directly or indirectly connected to node 0.

// Binary search for the minimum maximum edge weight x.
// Remove all edges with weight > x and check whether all nodes are reachable from node 0 (reverse the graph).
// In terms of the third rule, anyway all edges with weight > x will be removed, and any smaller weighted edges can also be removed, it doesn't matter.

// n = number of nodes, m = number of edges, k = max(edges[2])
// Time Complexity: O((n + m) log(k)) 789ms
// Space Complexity: O(n + m) 121.23MB
function minMaxWeight(n, edges, threshold) {
  const reversedGraph = Array(n).fill(0).map(() => []);
  let maxWeight = 0;
  for (let [a, b, w] of edges) {
    reversedGraph[b].push([a, w]);
    maxWeight = Math.max(maxWeight, w);
  }
  let low = 1, high = maxWeight;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (reachable(n, reversedGraph, mid)) high = mid;
    else low = mid + 1;
  }
  return reachable(n, reversedGraph, low) ? low : -1;
};

function reachable(n, reversedGraph, maxWeight) {
  const seen = Array(n).fill(false);
  dfs(0);
  return seen.every((s) => s);
  
  function dfs(node) {
    if (seen[node]) return;
    seen[node] = true;

    for (let [nei, weight] of reversedGraph[node]) {
      if (weight > maxWeight) continue;
      dfs(nei);
    }
  }
}

// Four test cases
console.log(minMaxWeight(5, [[1,0,1],[2,0,2],[3,0,1],[4,3,1],[2,1,1]], 2)) // 1
console.log(minMaxWeight(5, [[0,1,1],[0,2,2],[0,3,1],[0,4,1],[1,2,1],[1,4,1]], 1)) // -1
console.log(minMaxWeight(5, [[1,2,1],[1,3,3],[1,4,5],[2,3,2],[3,4,2],[4,0,1]], 1)) // 2
console.log(minMaxWeight(5, [[1,2,1],[1,3,3],[1,4,5],[2,3,2],[4,0,1]], 1)) // -1