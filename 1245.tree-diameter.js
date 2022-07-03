// 1245. Tree Diameter
// The diameter of a tree is the number of edges in the longest path in that tree.
// There is an undirected tree of n nodes labeled from 0 to n - 1. You are given a 2D array edges where edges.length == n - 1 and edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the tree.
// Return the diameter of the tree.


// Solution: DFS

// Get the sum of the two longest paths from each node and record the maximum.
// We can pick any node as the root, so we can pick 0.

// 1. Build an adjacency graph based on edges.
// 2. DFS starting from node 0.

// Time Complexity: O(n) 105ms
// Space Complexity: O(n) 51.3MB
var treeDiameter = function(edges) {
  let n = edges.length, graph = Array(n + 1).fill(0).map(() => []);
  for (let [x, y] of edges) {
    graph[x].push(y);
    graph[y].push(x);
  }
  
  let seen = Array(n).fill(0), res = 0;
  dfs(0);
  return res;

  function dfs(node) {
    seen[node] = 1;
    let max = 0, secondMax = 0;
    for (let nei of graph[node]) {
      if (!seen[nei]) {
        let length = dfs(nei);
        if (length > max) {
          secondMax = max;
          max = length;
        } else if (length > secondMax) {
          secondMax = length;
        }
      }
    }
    res = Math.max(res, max + secondMax);
    return max + 1;
  }
}; 

// Two test cases to run function on
console.log(treeDiameter([[0,1],[0,2]])) // 2
console.log(treeDiameter([[0,1],[1,2],[2,3],[1,4],[4,5]])) // 4