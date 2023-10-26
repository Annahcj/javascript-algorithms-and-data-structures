// 785. Is Graph Bipartite?
// There is an undirected graph with n nodes, where each node is numbered between 0 and n - 1. You are given a 2D array graph, where graph[u] is an array of nodes that node u is adjacent to. More formally, for each v in graph[u], there is an undirected edge between node u and node v. The graph has the following properties:
  // There are no self-edges (graph[u] does not contain u).
  // There are no parallel edges (graph[u] does not contain duplicate values).
  // If v is in graph[u], then u is in graph[v] (the graph is undirected).
  // The graph may not be connected, meaning there may be two nodes u and v such that there is no path between them.
// A graph is bipartite if the nodes can be partitioned into two independent sets A and B such that every edge in the graph connects a node in set A and a node in set B.
// Return true if and only if it is bipartite.


// Solution 1: BFS

// The key here is that EVERY edge in the graph connects to a node in the opposite set.
// Meaning: All connections of a node in set A must be to set B. Likewise, all connections of a node in set B must be to set A.
// We can color the nodes as we traverse them.
// Any node connected to a node in set A will have a color of 1, any node connected to a node in setB will have a color of 0. The opposite.
// 0 = set A, 1 = set B.

// Since the graph may not be fully connected, we must traverse each node. If a node is already visited, don't visit it again.
// If any node connected to a node is the same color, it is not a bipartite.

// Time Complexity: O(V + E) 98ms
// Space Complexity: O(V) 47.2MB
var isBipartite = function(graph) {
  let n = graph.length, map = Array(n).fill(-1);
  
  for (let i = 0; i < n; i++) {
    if (map[i] > -1) continue;
    let queue = [i];
    while (queue.length) {
      let node = queue.shift(), set = map[node];
      for (let nei of graph[node]) {
        if (map[nei] === -1) {
          queue.push(nei);
          map[nei] = set ^ 1; // adjacent nodes must be the opposite color
        } else if (map[nei] === set) { // adjacent nodes are the same color, not a bipartite.
          return false;
        }
      }
    }
  }
  return true;
};


// Solution 2: Recursive DFS

// The same idea as BFS, but can be done with DFS also.

// Time Complexity: O(V + E) 117ms
// Space Complexity: O(V) 44.5MB
var isBipartite = function(graph) {
  let n = graph.length, map = Array(n).fill(-1);
  for (let i = 0; i < n; i++) {
    if (map[i] > -1) continue;
    if (!dfs(i)) return false;
  }
  return true;
  
  function dfs(node) {
    let set = map[node];
    for (let nei of graph[node]) {
      if (map[nei] === -1) {
        map[nei] = set ^ 1;
        dfs(nei);
      } else if (map[nei] === set) {
        return false; 
      }
    }
    return true;
  }
};

// Three test cases to run function on
console.log(isBipartite([[1,2,3],[0,2],[0,1,3],[0,2]])) // false
console.log(isBipartite([[1,3],[0,2],[1,3],[0,2]])) // true
console.log(isBipartite([[1],[0],[4],[4],[2,3]])) // true