// 1059. All Paths from Source Lead to Destination
// Given the edges of a directed graph where edges[i] = [ai, bi] indicates there is an edge between nodes ai and bi, and two nodes source and destination of this graph, determine whether or not all paths starting from source eventually, end at destination, that is:
  // At least one path exists from the source node to the destination node
  // If a path exists from the source node to a node with no outgoing edges, then that node is equal to destination.
  // The number of possible paths from source to destination is a finite number.
// Return true if and only if all roads from source lead to destination.


// Solution: DFS with Node Coloring

// Each node can have one of three states:
  // 1: Not visited.
  // 2: Visited, being processed.
  // 3: Visited, finished processing. 

// These three states are necessary because we need to detect cycles.
// If we reach a node which has a state of 2 (being processed), it means we are in a cycle, and therefore should return false.

// We return false when:
  // 1. We reach a leaf node that is not the destination.
  // 2. We reach a node with a state of 2.

// Time Complexity: O(V + E) 108ms
// Space Complexity: O(V) 47.3MB
var leadsToDestination = function(n, edges, source, destination) {
  let graph = {};
  for (var i = 0; i < n; i++) graph[i] = [];
  for (var [x, y] of edges) {
    graph[x].push(y);
  }
  let visited = Array(n).fill(0);
  return dfs(source);

  function dfs(node) {
    if (visited[node]) return visited[node] === 2;
    if (!graph[node].length) return node === destination;
    visited[node] = 1; // mark as being processed
    for (var neighbor of graph[node]) {
      if (!dfs(neighbor)) return false;
    } 
    visited[node] = 2; // mark as finished processing
    return true;
  }
};

// Three test cases to run function on
console.log(leadsToDestination(3, [[0,1],[0,2]], 0, 2)) // false
console.log(leadsToDestination(4, [[0,1],[0,3],[1,2],[2,1]], 0, 3)) // false
console.log(leadsToDestination(4, [[0,1],[0,2],[1,3],[2,3]], 0, 3)) // true