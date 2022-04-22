// 1129. Shortest Path with Alternating Colors
// You are given an integer n, the number of nodes in a directed graph where the nodes are labeled from 0 to n - 1. Each edge is red or blue in this graph, and there could be self-edges and parallel edges.
// You are given two arrays redEdges and blueEdges where:
  // redEdges[i] = [ai, bi] indicates that there is a directed red edge from node ai to node bi in the graph, and
  // blueEdges[j] = [uj, vj] indicates that there is a directed blue edge from node uj to node vj in the graph.
// Return an array answer of length n, where each answer[x] is the length of the shortest path from node 0 to node x such that the edge colors alternate along the path, or -1 if such a path does not exist.


// Solution: BFS

// 1. Generate a graph for redEdges and blueEdges -> {index: [neighbor, neighbor], index: [neighbor], ...}
// 2. Do a level-by-level BFS starting from 0 with both situations: starting from a red edge and a blue edge
  // Keep track of sitatuations we have visited: seen[node][edge type]
    // edge type: 0 = red edge, 1 = blue edge
  // Only go to a node if we haven't been in that situation before
  // Keep track of the shortest length getting to each node in an array of length n (initialize res[i] to Infinity)
// 3. Lastly, convert all Infinity in res to -1

// V = number of nodes, E = number of edges
// Time Complexity: O(V + E) 107ms
// Space Complexity: O(V + E) 47.8MB
var shortestAlternatingPaths = function(n, redEdges, blueEdges) {
  let red = Array(n), blue = Array(n);
  for (let i = 0; i < n; i++) {
    red[i] = [];
    blue[i] = [];
  }
  
  for (let [x, y] of redEdges) red[x].push(y);
  for (let [x, y] of blueEdges) blue[x].push(y);
  
  // bfs starting from 0
  let queue = [[0, 0], [0, 1]]; // queue[i] = [node, edge type (0 = red, 1 = blue)]
  let seen = Array(n).fill(0).map(() => Array(2).fill(0));
  seen[0][0] = 1, seen[0][1] = 1; // mark first node from a red and blue edge as seen 
  let res = Array(n).fill(Infinity), steps = 0;
  while (queue.length) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let [node, edgeType] = queue.shift();
      res[node] = Math.min(res[node], steps);
      
      let edges = edgeType ? blue[node] : red[node];
      for (let nei of edges) {
        if (seen[nei][edgeType ^ 1]) continue;
        queue.push([nei, edgeType ^ 1]);
        seen[nei][edgeType ^ 1] = 1;
      }
    }
    steps++;
  }
  
  for (let i = 0; i < n; i++) {
    if (res[i] === Infinity) res[i] = -1;
  }
  return res;
};

// Two test cases to run function on
console.log(shortestAlternatingPaths(3, [[0,1],[1,2]], [])) // [0,1,-1]
console.log(shortestAlternatingPaths(3, [[0,1]], [[2,1]])) // [0,1,-1]