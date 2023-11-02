// 1557. Minimum Number of Vertices to Reach All Nodes
// Given a directed acyclic graph, with n vertices numbered from 0 to n-1, and an array edges where edges[i] = [fromi, toi] represents a directed edge from node fromi to node toi.
// Find the smallest set of vertices from which all nodes in the graph are reachable. It's guaranteed that a unique solution exists.


// Solution: Count Nodes with Indegree of 0

// Since it is a directed acyclic graph, there will always be nodes with no incoming edges.
// Those nodes are the 'essential' nodes needed to be able to reach all nodes, so we only have to count nodes with no incoming edges.

// Time Complexity: O(V + E) 192ms
// Space Complexity: O(V) 63.2MB
var findSmallestSetOfVertices = function(n, edges) {
  let indegrees = Array(n).fill(0);
  for (let [_x, y] of edges) {
    indegrees[y]++;
  }  
  let res = [];
  for (let i = 0; i < n; i++) {
    if (indegrees[i] === 0) res.push(i);
  }
  return res;
};

// Two test cases
console.log(findSmallestSetOfVertices(6, [[0,1],[0,2],[2,5],[3,4],[4,2]])) // [0,3]
console.log(findSmallestSetOfVertices(5, [[0,1],[2,1],[3,1],[1,4],[2,4]])) // [0,2,3]