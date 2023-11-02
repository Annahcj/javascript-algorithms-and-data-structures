// 802. Find Eventual Safe States
// There is a directed graph of n nodes with each node labeled from 0 to n - 1. The graph is represented by a 0-indexed 2D integer array graph where graph[i] is an integer array of nodes adjacent to node i, meaning there is an edge from node i to each node in graph[i].
// A node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from that node leads to a terminal node (or another safe node).
// Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.

 
// Solution 1: Topological Sort on Reversed Graph

// 1. Reverse the graph - we want to traverse the nodes backwards (starting from terminal nodes)
// 2. Topological sort on the reversed graph,
  // Any nodes that end up with an indegree of 0 is a safe node.
  // This is true because that means we use up edges leading to a node that first started from the terminal nodes.

// n = number of nodes, m = number of edges
// Time Complexity: O(n log(n) + m) (including sorting) 253ms
// Space Complexity: O(n) 61MB
var eventualSafeNodes = function(graph) {
  let n = graph.length, reversed = Array(n).fill(0).map(() => []);
  let queue = [], indegrees = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    indegrees[i] = graph[i].length;
    if (indegrees[i] === 0) queue.push(i);
    for (let node of graph[i]) {
      reversed[node].push(i);
    }
  }
  
  let res = [];
  while (queue.length) {
    let node = queue.shift();
    res.push(node);
    for (let i = reversed[node].length; i >= 0; i--) {
      let nei = reversed[node].pop();
      indegrees[nei]--;
      if (indegrees[nei] === 0) queue.push(nei);
    }
  }
  return res.sort((a, b) => a - b);
};


// Solution 2: DFS w/ Node Coloring

// Essentially, this problems boils down to finding nodes that are not in a cycle.
// This is because nodes that are not in a cycle will always eventually stop at a node with no outgoing edges.

// DFS with node coloring.
// Node colors
  // 0: not visited
  // 1: visited, not in a cycle
  // 2: visited, in a cycle

// While a node and its neighbors are still in traversal, the node's color is 2.
// When traversal for a node and its neighbors are finished, the node's color is 1.

// If we traverse a node with a color of 2, we know we have found a cycle.

// Time Complexity: O(n + m) 115ms
// Space Complexity: O(n) 51MB
var eventualSafeNodes = function(graph) {
  let n = graph.length, color = Array(n).fill(0);
  let res = [];
  for (let i = 0; i < n; i++) {
    if (dfs(i) === 1) res.push(i);
  }
  return res;
  
  function dfs(node) {
    if (color[node] !== 0) return color[node];
    color[node] = 2;
    for (let nei of graph[node]) {
      if (dfs(nei) === 2) return color[node];
    }
    return color[node] = 1;
  }
};

// Two test cases to run function on
console.log(eventualSafeNodes([[1,2],[2,3],[5],[0],[5],[],[]])) // [2,4,5,6]
console.log(eventualSafeNodes([[1,2,3,4],[1,2],[3,4],[0,4],[]])) // [4]