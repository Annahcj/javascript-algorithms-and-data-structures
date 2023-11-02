// 2360. Longest Cycle in a Graph
// You are given a directed graph of n nodes numbered from 0 to n - 1, where each node has at most one outgoing edge.
// The graph is represented with a given 0-indexed array edges of size n, indicating that there is a directed edge from node i to node edges[i]. If there is no outgoing edge from node i, then edges[i] == -1.
// Return the length of the longest cycle in the graph. If no cycle exists, return -1.
// A cycle is a path that starts and ends at the same node.


// Solution: DFS

// Because each node has at most 1 outgoing edge, once we visit a node, we never need to visit it again.
// Maintain a visited/seen array, where seen[i] indicates whether we have visited node i yet.
// DFS from each unvisited node,
  // Maintain a map 'dist', where dist[i] = distance from the start node to i
  // If we come across a visited node, return the length of the cycle (total distance - distance from start node to current node)

// Time Complexity: O(n) 287ms
// Space Complexity: O(n) 85.7MB
var longestCycle = function(edges) {
  let n = edges.length, seen = Array(n).fill(0), res = -1;
  for (let i = 0; i < n; i++) {
    if (!seen[i]) {
      res = Math.max(res, dfs(i));
    }
  }
  return res;
  
  function dfs(node) {
    let dist = new Map(); // dist[i] = distance from node to i
    let steps = 0;
    while (node !== -1) {
      if (dist.has(node)) {
        return steps - dist.get(node);
      }
      if (seen[node]) return -1;
      seen[node] = 1;
      dist.set(node, steps);
      steps++;
      node = edges[node];
    }
    return -1;
  }
};

// Two test cases
console.log(longestCycle([3,3,4,2,3])) // 3
console.log(longestCycle([2,-1,3,1])) // -1