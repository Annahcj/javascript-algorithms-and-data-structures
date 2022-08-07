// 2368. Reachable Nodes With Restrictions
// There is an undirected tree with n nodes labeled from 0 to n - 1 and n - 1 edges.
// You are given a 2D integer array edges of length n - 1 where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree. You are also given an integer array restricted which represents restricted nodes.
// Return the maximum number of nodes you can reach from node 0 without visiting a restricted node.
// Note that node 0 will not be a restricted node.


// Solution: DFS

// 1. Create an adjacency list based on the edges.
// 2. DFS starting from node 0 and avoid visiting visited and restricted nodes.

// Count the total number of nodes we have visited.

// Time Complexity: O(n) 681ms
// Space Complexity: O(n) 151.6MB
var reachableNodes = function(n, edges, restricted) {
  let seen = Array(n).fill(0), restrictedSet = new Set(restricted);
  let graph = Array(n).fill(0).map(() => []);
  for (let [x, y] of edges) {
    graph[x].push(y);
    graph[y].push(x);
  }  
  dfs(0);
  return seen.reduce((acc, curr) => acc + curr);

  function dfs(node) {
    seen[node] = 1;
    for (let nei of graph[node]) {
      if (!restrictedSet.has(nei) && !seen[nei]) {
        dfs(nei);
      }
    }
  }
};

// Two test cases to run function
console.log(reachableNodes(7, [[0,1],[1,2],[3,1],[4,0],[0,5],[5,6]], [4,5])) // 4
console.log(reachableNodes(7, [[0,1],[0,2],[0,5],[0,4],[3,2],[6,5]], [4,2,1])) // 3