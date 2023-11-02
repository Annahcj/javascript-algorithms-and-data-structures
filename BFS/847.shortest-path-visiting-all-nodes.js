// 847. Shortest Path Visiting All Nodes
// You have an undirected, connected graph of n nodes labeled from 0 to n - 1. You are given an array graph where graph[i] is a list of all the nodes connected with node i by an edge.
// Return the length of the shortest path that visits every node. You may start and stop at any node, you may revisit nodes multiple times, and you may reuse edges.


// Solution: BFS w/ Bitmask

// Use a bitmask as a set to keep track of nodes we have visited at each different path.
// Do level by level bfs, return the number of steps when the bitmask is full.
  // e.g: if n is 5, the full bitmask should be 31 (11111).
  // We can get this number by (1 << n) - 1. By subtracting 1, turns 100000 into 11111.
// For each node we visit, mark the bit (from the right) as 1. 
  // e.g: if the node is 2, we mark the bit 00010 as 1, and set the new mask to be: oldMask | (1 << node)

// n = number of nodes, m = max(graph[i].length) 
// Time Complexity: O(2^n * n * m) 74ms
// Space Complexity: O(2^n) 49.5MB 
var shortestPathLength = function(graph) {
  let n = graph.length, fullMask = (1 << n) - 1;
  let queue = [], seen = Array(n).fill(0).map(() => Array(1 << n).fill(false));
  for (let i = 0; i < n; i++) {
    queue.push([i, 1 << i]);
    seen[i][1 << i] = true;
  }
  let length = 0;
  while (queue.length) {
    for (let i = queue.length - 1; i >= 0; i--) {
      let [node, mask] = queue.shift();
      if (mask === fullMask) return length;
      for (let nei of graph[node]) {
        let newMask = mask | (1 << nei);
        if (seen[nei][newMask]) continue;
        seen[nei][newMask] = true;
        queue.push([nei, newMask]);
      }
    }
    length++;
  }
};

// Two test cases 
console.log(shortestPathLength([[1,2,3],[0],[0],[0]])) // 4
console.log(shortestPathLength([[1],[0,2,4],[1,3,4],[2],[1,2]])) // 4