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

// Time Complexity: O(2^n) 160ms
// Space Complexity: O(2^n) 51MB
var shortestPathLength = function(graph) {
  let n = graph.length, fullBitmask = (1 << n) - 1;
  let queue = [], visited = new Set();
  for (var i = 0; i < n; i++) {
    queue.push([i, 1 << i]);
    visited.add(`${i},${1 << i}`);
  }

  let steps = 0;
  while (queue.length) {
    let next = [];
    while (queue.length) {
      let [node, bitmask] = queue.pop();
      if (bitmask === fullBitmask) return steps;
      for (var neighbor of graph[node]) {
        let newBitmask = bitmask | (1 << neighbor);
        if (!visited.has(`${neighbor},${newBitmask}`)) {
          next.push([neighbor, newBitmask]);
          visited.add(`${neighbor},${newBitmask}`);
        }
      }
    }
    queue = next;
    steps++;
  }
};

// Two test cases to run function on
console.log(shortestPathLength([[1,2,3],[0],[0],[0]])) // 4
console.log(shortestPathLength([[1],[0,2,4],[1,3,4],[2],[1,2]])) // 4