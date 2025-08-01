// 3620. Network Recovery Pathways
// You are given a directed acyclic graph of n nodes numbered from 0 to n − 1. This is represented by a 2D array edges of length m, where edges[i] = [ui, vi, costi] indicates a one‑way communication from node ui to node vi with a recovery cost of costi.
// Some nodes may be offline. You are given a boolean array online where online[i] = true means node i is online. Nodes 0 and n − 1 are always online.
// A path from 0 to n − 1 is valid if:
  // All intermediate nodes on the path are online.
  // The total recovery cost of all edges on the path does not exceed k.
// For each valid path, define its score as the minimum edge‑cost along that path.
// Return the maximum path score (i.e., the largest minimum-edge cost) among all valid paths. If no valid path exists, return -1.


// Solution: Binary Search & Topological Sort

// Binary search for the maximum minimum edge cost.
// For a minimum edge cost x, use topological sort to check if we can reach n-1 in less than k total score.

// Start off with nodes with no inbound edges.
// Traverse neighbor nodes and only queue the neighbor if we have used all inbound edges.
// Record the minimum cost to reach each node.

// Note: This solution is TLE, passes 626/636 test cases.
// n = number of nodes, m = max(edge cost), e = number of edges
// Time Complexity: O((n + e) log(m))
// Space Complexity: O(n + e)
function findMaxPathScore(edges, online, k) {
  const n = online.length, graph = Array(n).fill(0).map(() => []);
  const initialIndegrees = Array(n).fill(0);
  let maxCost = 0;
  for (let [u, v, cost] of edges) {
    if (online[u] && online[v]) {
      graph[u].push([v, cost]);
      initialIndegrees[v]++;
      maxCost = Math.max(maxCost, cost);
    }
  }
  const initialQueue = [];
  for (let i = 0; i < n; i++) {
    if (initialIndegrees[i] === 0) {
      initialQueue.push(i);
    }
  }
  let low = 0, high = maxCost, res = -1;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    if (canReachTarget(mid)) {
      low = mid;
      res = mid;
    } else {
      high = mid - 1;
    }
  }
  return res;

  function canReachTarget(x) {
    const queue = [...initialQueue], indegrees = [...initialIndegrees];
    const minCost = Array(n).fill(Infinity);
    minCost[0] = 0;
    while (queue.length) {
      let node = queue.shift();
      for (let [nei, cost] of graph[node]) {
        if (cost >= x) {
          minCost[nei] = Math.min(minCost[nei], minCost[node] + cost);
        }
        if (--indegrees[nei] === 0) {
          queue.push(nei);
        }
      }
    }
    return minCost[n - 1] <= k;
  }
};

// Two test cases
console.log(findMaxPathScore([[0,1,5],[1,3,10],[0,2,3],[2,3,4]], [true,true,true,true], 10)) // 3
console.log(findMaxPathScore([[0,1,7],[1,4,5],[0,2,6],[2,3,6],[3,4,2],[2,4,6]], [true,true,true,false,true], 12)) // 6